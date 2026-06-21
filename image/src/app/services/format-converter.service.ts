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

  static async imageToSvg(image: HTMLImageElement): Promise<string> {
    const ImageTracer = (await import('imagetracerjs')).default;
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return ImageTracer.imagedataToSVG(imageData, {
      ltres: 2,
      qtres: 2,
      pathomit: 8,
      colorsampling: 2,
      numberofcolors: 24,
      mincolorratio: 0.02,
      colorquantcycles: 3,
      blurradius: 0,
      blurdelta: 0,
      scale: 1,
      simplifytolerance: 0,
      roundcoords: 2,
      viewbox: true,
      desc: false,
      noorb: false,
      noprogress: true,
      whitespace: true,
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
