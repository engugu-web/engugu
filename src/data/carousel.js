// Only hashed image paths published by the independent image repository are accepted.
export function parseCarouselManifest(manifest) {
  if (manifest?.version !== 1 || !Array.isArray(manifest.images) ||
      !manifest.images.length || manifest.images.length > 48) {
    throw new Error('Invalid carousel manifest');
  }
  return manifest.images.map(({ src } = {}) => {
    if (typeof src !== 'string' || !/^images\/[a-f0-9]{64}\.(webp|png|jpe?g|avif)$/.test(src)) {
      throw new Error('Invalid carousel image path');
    }
    return { src: `/carousel/${src}`, w: 100, h: 100, x: 0, y: 0 };
  });
}

export function preloadCarouselImages(slides, signal) {
  return Promise.all(slides.slice(0, 12).map(({ src }) => new Promise((resolve, reject) => {
    const image = new Image();
    const finish = (error) => {
      image.onload = image.onerror = null;
      signal.removeEventListener('abort', abort);
      if (error) { image.src = ''; reject(error); } else resolve();
    };
    const abort = () => finish(new Error('Carousel loading cancelled'));
    image.onload = () => finish();
    image.onerror = () => finish(new Error('Carousel image unavailable'));
    if (signal.aborted) return abort();
    signal.addEventListener('abort', abort, { once: true });
    image.src = src;
  })));
}
