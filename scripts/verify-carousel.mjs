import assert from 'node:assert/strict';
import { parseCarouselManifest, preloadCarouselImages } from '../src/data/carousel.js';

const src = `images/${'a'.repeat(64)}.webp`;
const manifest = { version: 1, images: [{ src }] };
const slides = parseCarouselManifest(manifest);
assert.equal(slides[0].src, `/carousel/${src}`);
assert.equal(slides[0].w, 100);
assert.equal(parseCarouselManifest({ version: 1, images: Array(48).fill({ src }) }).length, 48);
for (const invalid of [null, {}, { version: 1, images: [] },
  { version: 1, images: Array(49).fill({ src }) },
  ...['https://example.com/a.webp', '../a.webp', 'images/../../a.webp', `images/${'a'.repeat(64)}.svg`]
    .map((src) => ({ version: 1, images: [{ src }] }))]) {
  assert.throws(() => parseCarouselManifest(invalid));
}

let mode = 'success';
let created = 0;
globalThis.Image = class {
  constructor() { created++; }
  set src(value) {
    if (!value || mode === 'pending') return;
    queueMicrotask(() => mode === 'success' ? this.onload?.() : this.onerror?.());
  }
};
await preloadCarouselImages(Array(48).fill(slides[0]), new AbortController().signal);
assert.equal(created, 12, 'only the first twelve images are eagerly loaded');
mode = 'failure';
await assert.rejects(preloadCarouselImages(slides, new AbortController().signal));
mode = 'pending';
const controller = new AbortController();
const loading = preloadCarouselImages(slides, controller.signal);
controller.abort();
await assert.rejects(loading);
await assert.rejects(preloadCarouselImages(slides, controller.signal));
delete globalThis.Image;
console.log('Carousel checks passed: manifest validation, bounded preload, failed image and abort handling.');
