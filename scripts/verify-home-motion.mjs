import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

// Exercise the actual composable without needing an animation-enabled desktop.
const source = (
  await readFile(
    new URL("../src/composables/useHomeMotion.js", import.meta.url),
    "utf8",
  )
)
  .replace(/^import .*?;\s*/s, "")
  .replace("export function", "function");
let mount,
  unmount,
  scroll,
  observe,
  top = 900;
const events = new Map();
const document = {
  hidden: false,
  addEventListener(k, fn) {
    events.set(k, fn);
  },
  removeEventListener(k) {
    events.delete(k);
  },
};
const context = vm.createContext({
  ref: (value) => ({ value }),
  onMounted: (fn) => {
    mount = fn;
  },
  onBeforeUnmount: (fn) => {
    unmount = fn;
  },
  document,
  window: {
    innerHeight: 1000,
    matchMedia: () => { throw new Error("Requested motion must not be gated by system preferences"); },
    addEventListener(k, fn) {
      if (k === "scroll") scroll = fn;
    },
    removeEventListener() {},
  },
  IntersectionObserver: class {
    constructor(fn) {
      observe = fn;
    }
    observe() {}
    disconnect() {}
  },
  requestAnimationFrame(fn) {
    queueMicrotask(fn);
    return 1;
  },
  cancelAnimationFrame() {},
});
vm.runInContext(`${source}; globalThis.motion = useHomeMotion();`, context);
const motion = context.motion;
motion.workSection.value = {};
motion.mission.value = { getBoundingClientRect: () => ({ top }) };
mount();
await Promise.resolve();
assert.equal(motion.progress.value, 0);
assert.equal(motion.rotation.value, 0);
observe([{ isIntersecting: true }]);
assert.equal(motion.carouselRunning.value, true, "visible carousel runs");
observe([{ isIntersecting: false }]);
assert.equal(motion.carouselRunning.value, false, "offscreen carousel pauses");
observe([{ isIntersecting: true }]);
await Promise.resolve();
top = 625;
scroll();
await Promise.resolve();
assert.equal(motion.progress.value, 0.5, "scroll maps to half a turn");
assert.equal(motion.rotation.value, 180);

top = 350;
scroll();
await Promise.resolve();
assert.equal(motion.progress.value, 1, "all grid cells are revealed");
assert.equal(motion.rotation.value, 360, "GLOBAL completes one full turn");
top = 900;
scroll();
await Promise.resolve();
assert.equal(motion.rotation.value, 0, "scrolling back reverses the turn");
document.hidden = true;
events.get("visibilitychange")();
assert.equal(motion.carouselRunning.value, false, "background tab stops its carousel");
await Promise.resolve();
document.hidden = false;
events.get("visibilitychange")();
await Promise.resolve();
assert.equal(motion.carouselRunning.value, true, "foreground resumes fixed-frame replacements");
top = 625;
scroll();
await Promise.resolve();
assert.equal(motion.rotation.value, 180, "requested 3D turn remains active");
unmount();
assert.equal(events.size, 0, "route exit removes visibility listener");
console.log(
  "Home motion checks passed: carousel, scroll progress, background pause, always-enabled requested motion, cleanup.",
);
