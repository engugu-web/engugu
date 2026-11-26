import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = (await readFile(new URL('../src/composables/useHomeMotion.js', import.meta.url), 'utf8'))
  .replace(/^import .*?;\s*/s, '').replace('export function', 'function');
let mount, unmount, observe, disconnected = false;
const events = new Map();
const document = {
  hidden: false,
  addEventListener: (name, fn) => events.set(name, fn),
  removeEventListener: (name) => events.delete(name),
};
const context = vm.createContext({
  ref: (value) => ({ value }),
  onMounted: (fn) => { mount = fn; },
  onBeforeUnmount: (fn) => { unmount = fn; },
  document,
  IntersectionObserver: class {
    constructor(fn) { observe = fn; }
    observe() {}
    disconnect() { disconnected = true; }
  },
});
vm.runInContext(`${source}; globalThis.motion = useHomeMotion();`, context);
const motion = context.motion;
motion.workSection.value = {};
mount();
assert.equal(motion.carouselRunning.value, false);
observe([{ isIntersecting: true }]);
assert.equal(motion.carouselRunning.value, true, 'visible carousel runs');
observe([{ isIntersecting: false }]);
assert.equal(motion.carouselRunning.value, false, 'offscreen carousel pauses');
observe([{ isIntersecting: true }]);
document.hidden = true;
events.get('visibilitychange')();
assert.equal(motion.carouselRunning.value, false, 'background tab pauses');
document.hidden = false;
events.get('visibilitychange')();
assert.equal(motion.carouselRunning.value, true, 'foreground tab resumes');

// Exercise the standalone GAMES entrance after removal of the GLOBAL flip.
const pixelFile = await readFile(new URL('../src/components/PixelGames.vue', import.meta.url), 'utf8');
const pixelSource = pixelFile.match(/<script setup>([\s\S]*?)<\/script>/)[1]
  .replace(/^\s*import .*?;\s*/s, '');
const pixelContext = vm.createContext({
  ref: (value) => ({ value }),
  computed: (fn) => ({ get value() { return fn(); } }),
  onMounted() {}, onBeforeUnmount() {}, document,
  requestAnimationFrame: () => 1, cancelAnimationFrame() {},
});
vm.runInContext(`${pixelSource};
  raster = {}; visible = true;
  canvas.value = { width: 1, height: 1, getContext: () => ({ clearRect() {}, setTransform() {} }) };
  globalThis.pixelClock = { paint, visibilityChanged, progress: () => animationProgress.value };
`, pixelContext);
pixelContext.pixelClock.paint(1000);
pixelContext.pixelClock.paint(1800);
assert.equal(pixelContext.pixelClock.progress(), .5, 'GAMES retains its 1600ms duration');
pixelContext.pixelClock.paint(2600);
assert.equal(pixelContext.pixelClock.progress(), 1, 'GAMES completes without further scroll');
pixelContext.pixelClock.visibilityChanged();
assert.equal(pixelContext.pixelClock.progress(), 0, 're-entry resets GAMES');
pixelContext.pixelClock.paint(4000);
pixelContext.pixelClock.paint(5600);
assert.equal(pixelContext.pixelClock.progress(), 1, 're-entry completes the same duration');
unmount();
assert.equal(motion.carouselRunning.value, false);
assert.equal(disconnected, true);
assert.equal(events.size, 0, 'route exit removes visibility listener');
console.log('Home motion checks passed: standalone GAMES entrance, replay, carousel visibility, background pause, cleanup.');
