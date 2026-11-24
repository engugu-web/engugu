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
  tick,
  scroll,
  observe,
  top = 900,
  intervals = 0;
const events = new Map();
const media = {
  matches: false,
  addEventListener(_, fn) {
    this.change = fn;
  },
  removeEventListener() {},
};
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
    matchMedia: () => media,
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
  setInterval(fn) {
    tick = fn;
    intervals++;
    return 1;
  },
  clearInterval() {
    tick = undefined;
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
observe([{ isIntersecting: true }]);
assert.equal(intervals, 1);
tick();
assert.equal(motion.frame.value, 1, "visible carousel advances");
await Promise.resolve();
top = 625;
scroll();
await Promise.resolve();
assert.equal(motion.progress.value, 0.5, "scroll maps to half a turn");
document.hidden = true;
events.get("visibilitychange")();
assert.equal(tick, undefined, "background tab stops its carousel");
await Promise.resolve();
document.hidden = false;
media.matches = true;
media.change();
await Promise.resolve();
assert.equal(
  tick,
  undefined,
  "reduced motion disables automatic image changes",
);
assert.equal(
  motion.progress.value,
  1,
  "reduced motion shows the final readable text",
);
unmount();
assert.equal(events.size, 0, "route exit removes visibility listener");
console.log(
  "Home motion checks passed: carousel, scroll progress, background pause, reduced motion, cleanup.",
);
