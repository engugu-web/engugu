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
assert.equal(motion.progress.value, 0, "scroll does not scrub the mission timeline");
assert.equal(motion.rotation.value, 0);

top = 350;
scroll();
await Promise.resolve();
assert.equal(motion.rotation.value, 0, "fast scroll cannot skip the full entrance");

// Drive the real GAMES paint clock with deterministic timestamps, forwarding
// its public progress event exactly as Home.vue does. No scroll is needed to
// complete GLOBAL, and there is no independent timer that can drift.
const pixelFile = await readFile(new URL("../src/components/PixelGames.vue", import.meta.url), "utf8");
const pixelSource = pixelFile.match(/<script setup>([\s\S]*?)<\/script>/)[1]
  .replace(/^\s*import .*?;\s*/s, "");
const pixelContext = vm.createContext({
  ref: (value) => ({ value }),
  computed: (fn) => ({ get value() { return fn(); } }),
  defineEmits: () => (event, value) => {
    assert.equal(event, "progress");
    motion.setMissionProgress(value);
  },
  onMounted() {}, onBeforeUnmount() {},
  document,
  requestAnimationFrame: () => 1,
  cancelAnimationFrame() {},
});
vm.runInContext(`${pixelSource};
  raster = {}; visible = true;
  canvas.value = { width: 1, height: 1, getContext: () => ({ clearRect() {}, setTransform() {} }) };
  globalThis.pixelClock = { paint, visibilityChanged };
`, pixelContext);
pixelContext.pixelClock.paint(1000);
pixelContext.pixelClock.paint(1800);
assert.equal(motion.progress.value, .5, "GAMES is halfway through its 1600ms entrance");
assert.equal(motion.rotation.value, 180, "GLOBAL uses the same halfway point");
top = 900;
scroll();
await Promise.resolve();
assert.equal(motion.rotation.value, 180, "scroll cannot change the running clock");
pixelContext.pixelClock.paint(2600);
assert.equal(motion.progress.value, 1);
assert.equal(motion.rotation.value, 360, "GLOBAL completes after 1600ms without another scroll");
scroll();
await Promise.resolve();
assert.equal(motion.rotation.value, 360, "completed turn stays front-facing");
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
assert.equal(motion.rotation.value, 360, "visibility/carousel changes do not scrub the turn");
pixelContext.pixelClock.visibilityChanged();
assert.equal(motion.rotation.value, 0, "GAMES re-entry resets both animations together");
pixelContext.pixelClock.paint(4000);
pixelContext.pixelClock.paint(5600);
assert.equal(motion.rotation.value, 360, "re-entry completes the same full 1600ms turn");
unmount();
assert.equal(events.size, 0, "route exit removes visibility listener");
console.log(
  "Home motion checks passed: shared 1600ms GAMES/GLOBAL clock, scroll independence, replay, carousel background pause, cleanup.",
);
