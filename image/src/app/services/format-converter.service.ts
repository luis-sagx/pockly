export class FormatConverterService {
  static fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string) ?? '');
      reader.onerror = () => reject(new Error('file-read-error'));
      reader.readAsDataURL(file);
    });
  }

  static dataUrlToImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('invalid-image'));
      image.src = dataUrl;
    });
  }

  static blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string) ?? '');
      reader.onerror = () => reject(new Error('blob-read-error'));
      reader.readAsDataURL(blob);
    });
  }

  static async convertFileToFormat(file: File, outputFormat: string): Promise<Blob> {
    const sourceDataUrl = await this.fileToDataUrl(file);
    const sourceImage = await this.dataUrlToImage(sourceDataUrl);

    if (outputFormat === 'svg') {
      const svgString = await this.imageToSvg(sourceImage);
      return new Blob([svgString], { type: 'image/svg+xml' });
    }

    if (outputFormat === 'pdf') {
      return await this.imageToPdf(sourceImage);
    }

    const canvas = document.createElement('canvas');
    canvas.width = sourceImage.naturalWidth;
    canvas.height = sourceImage.naturalHeight;
    const context = canvas.getContext('2d')!;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    if (outputFormat === 'jpeg') {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    context.drawImage(sourceImage, 0, 0);
    const mime = this.mimeFromFormat(outputFormat);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('format-not-supported'));
            return;
          }
          resolve(blob);
        },
        mime,
        mime === 'image/jpeg' ? 0.97 : undefined,
      );
    });
  }

  static async imageToPdf(image: HTMLImageElement): Promise<Blob> {
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height],
    });
    pdf.addImage(image, 'PNG', 0, 0, width, height);
    return pdf.output('blob') as unknown as Blob;
  }

  // Longest side (px) the raster is downscaled to before tracing. Output SVG
  // weight scales with the number of traced pixels, so capping resolution is
  // the single biggest lever for file size. `viewbox` + `scale` keep the SVG
  // rendering at the original dimensions, so visual size is unchanged.
  private static readonly SVG_TRACE_MAX_DIMENSION = 700;

  static async imageToSvg(image: HTMLImageElement): Promise<string> {
    const ImageTracer = (await import('imagetracerjs')).default;

    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;
    const longestSide = Math.max(sourceWidth, sourceHeight);
    const downscale =
      longestSide > this.SVG_TRACE_MAX_DIMENSION
        ? this.SVG_TRACE_MAX_DIMENSION / longestSide
        : 1;

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(sourceWidth * downscale));
    canvas.height = Math.max(1, Math.round(sourceHeight * downscale));
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return ImageTracer.imagedataToSVG(imageData, {
      // Higher error thresholds → fewer line/curve nodes per path.
      ltres: 4,
      qtres: 4,
      // Drop more tiny "speckle" paths.
      pathomit: 16,
      colorsampling: 2,
      // Fewer colors → fewer color layers → far fewer paths.
      numberofcolors: 16,
      mincolorratio: 0.02,
      colorquantcycles: 3,
      // A light blur removes JPEG noise that would otherwise become paths.
      blurradius: 1,
      blurdelta: 20,
      // Render back at original resolution despite tracing the downscaled raster.
      scale: downscale === 1 ? 1 : 1 / downscale,
      simplifytolerance: 0,
      // 1 decimal instead of 2 shortens every coordinate string.
      roundcoords: 1,
      viewbox: true,
      desc: false,
      noorb: false,
      noprogress: true,
      // Strip whitespace between SVG tags.
      whitespace: false,
    });
  }

  static mimeFromFormat(format: string): string {
    switch (format) {
      case 'jpeg':
        return 'image/jpeg';
      case 'webp':
        return 'image/webp';
      case 'bmp':
        return 'image/bmp';
      case 'svg':
        return 'image/svg+xml';
      case 'pdf':
        return 'application/pdf';
      default:
        return 'image/png';
    }
  }

  static extensionFromFormat(format: string): string {
    return format === 'jpeg' ? 'jpg' : format;
  }
}
