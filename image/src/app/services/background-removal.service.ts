import type { InferenceSession, Tensor } from 'onnxruntime-web';

/**
 * Client-side background removal using the U²-Net (u2netp) model via
 * onnxruntime-web. Replaces @imgly/background-removal, which is AGPL-3.0 and
 * would force the whole SaaS source to be published.
 *
 * Licensing of this stack (all permissive, safe for a commercial / ad-supported
 * SaaS):
 *   - onnxruntime-web ............ MIT
 *   - u2netp.onnx model weights .. Apache-2.0 (xuebinqin/U-2-Net, redistributed
 *                                  unmodified by danielgatis/rembg)
 *
 * The model is self-hosted under /models so there is no per-request external
 * dependency. The onnxruntime WASM runtime is loaded from a CDN to avoid extra
 * Angular asset-copy configuration; both are cached by the browser after the
 * first run.
 */
export class BackgroundRemovalService {
  /** Self-hosted model. Swap for the full u2net.onnx for higher quality. */
  private static readonly MODEL_URL = 'models/u2netp.onnx';

  /** U²-Net is trained on a fixed 320×320 input. */
  private static readonly INPUT_SIZE = 320;

  /** ImageNet normalization used by U²-Net / rembg. */
  private static readonly MEAN = [0.485, 0.456, 0.406];
  private static readonly STD = [0.229, 0.224, 0.225];

  private static sessionPromise: Promise<InferenceSession> | null = null;

  /** Loads (and caches) the ONNX session. The first call downloads the model. */
  private static async getSession(): Promise<InferenceSession> {
    if (!this.sessionPromise) {
      this.sessionPromise = (async () => {
        const ort = await import('onnxruntime-web');
        // Self-hosted WASM runtime (copied to /ort by angular.json). Same-origin
        // so the service worker can precache it → works offline, no third-party
        // dependency. Resolved against the <base href> (not the current route)
        // so it stays correct on deep routes like /remove-background.
        ort.env.wasm.wasmPaths = new URL('ort/', document.baseURI).href;
        return ort.InferenceSession.create(this.MODEL_URL, {
          executionProviders: ['wasm'],
        });
      })().catch((err) => {
        // Reset so a later retry can re-attempt the download.
        this.sessionPromise = null;
        throw err;
      });
    }
    return this.sessionPromise;
  }

  /**
   * Removes the background from a File and returns a transparent PNG Blob.
   */
  static async removeBackground(file: File): Promise<Blob> {
    const image = await this.fileToImage(file);
    const { naturalWidth: width, naturalHeight: height } = image;

    const inputTensor = await this.preprocess(image);
    const session = await this.getSession();
    const feeds: Record<string, Tensor> = { [session.inputNames[0]]: inputTensor };
    const output = await session.run(feeds);
    const maskData = output[session.outputNames[0]].data as Float32Array;

    const alpha = this.maskToAlpha(maskData, width, height);
    return this.compose(image, alpha, width, height);
  }

  private static fileToImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(url);
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('invalid-image'));
      };
      image.src = url;
    });
  }

  /** Resize to 320×320 and produce a normalized CHW Float32 tensor [1,3,320,320]. */
  private static async preprocess(image: HTMLImageElement): Promise<Tensor> {
    const size = this.INPUT_SIZE;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);

    const plane = size * size;
    const chw = new Float32Array(plane * 3);
    for (let i = 0; i < plane; i++) {
      const r = data[i * 4] / 255;
      const g = data[i * 4 + 1] / 255;
      const b = data[i * 4 + 2] / 255;
      chw[i] = (r - this.MEAN[0]) / this.STD[0];
      chw[plane + i] = (g - this.MEAN[1]) / this.STD[1];
      chw[plane * 2 + i] = (b - this.MEAN[2]) / this.STD[2];
    }

    const ort = await import('onnxruntime-web');
    return new ort.Tensor('float32', chw, [1, 3, size, size]);
  }

  /**
   * Min-max normalize the 320×320 mask, then bilinearly resize it to the
   * original dimensions and return a Uint8 alpha channel (length width*height).
   */
  private static maskToAlpha(mask: Float32Array, width: number, height: number): Uint8ClampedArray {
    const size = this.INPUT_SIZE;
    let min = Infinity;
    let max = -Infinity;
    for (const v of mask) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
    const range = max - min || 1;

    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = size;
    maskCanvas.height = size;
    const maskCtx = maskCanvas.getContext('2d')!;
    const maskImage = maskCtx.createImageData(size, size);
    for (let i = 0; i < mask.length; i++) {
      const v = ((mask[i] - min) / range) * 255;
      maskImage.data[i * 4] = v;
      maskImage.data[i * 4 + 1] = v;
      maskImage.data[i * 4 + 2] = v;
      maskImage.data[i * 4 + 3] = 255;
    }
    maskCtx.putImageData(maskImage, 0, 0);

    // Resize the mask up to full resolution using the canvas bilinear scaler.
    const resized = document.createElement('canvas');
    resized.width = width;
    resized.height = height;
    const resizedCtx = resized.getContext('2d')!;
    resizedCtx.imageSmoothingEnabled = true;
    resizedCtx.imageSmoothingQuality = 'high';
    resizedCtx.drawImage(maskCanvas, 0, 0, width, height);
    const resizedData = resizedCtx.getImageData(0, 0, width, height).data;

    const alpha = new Uint8ClampedArray(width * height);
    for (let i = 0; i < alpha.length; i++) {
      alpha[i] = resizedData[i * 4];
    }
    return alpha;
  }

  /** Apply the alpha channel to the original image and export a PNG Blob. */
  private static compose(
    image: HTMLImageElement,
    alpha: Uint8ClampedArray,
    width: number,
    height: number,
  ): Promise<Blob> {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0, width, height);
    const composed = ctx.getImageData(0, 0, width, height);
    for (let i = 0; i < alpha.length; i++) {
      composed.data[i * 4 + 3] = alpha[i];
    }
    ctx.putImageData(composed, 0, 0);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('compose-failed'))),
        'image/png',
      );
    });
  }
}
