<template>
  <span ref="root" class="pixel-games" aria-label="GAMES">
    <span class="pixel-label" aria-hidden="true" :style="{ opacity: labelOpacity }">GAMES<span ref="baseline" class="baseline-probe"></span></span>
    <canvas ref="canvas" class="pixel-canvas" aria-hidden="true"></canvas>
  </span>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
const root = ref(null);
const baseline = ref(null);
const canvas = ref(null);
const animationProgress = ref(0);
const labelOpacity = computed(() => Math.max(0, 1 - Math.max(0, animationProgress.value - 0.05) / 0.25));
let raster, tiles = [], width = 0, height = 0, ratio = 1, observer, visibilityObserver, frame, disposed = false;
let visible = false, startedAt, fontReady = false;
const clamp = (value) => Math.max(0, Math.min(1, value));
const seed = (index) => ((index * 16807 + 71) % 997) / 997;

function measure() {
  if (disposed || !root.value || !fontReady) return;
  const rect = root.value.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  width = rect.width;
  height = rect.height;
  ratio = Math.min(window.devicePixelRatio || 1, 2);
  raster = document.createElement("canvas");
  raster.width = Math.ceil(width * ratio);
  raster.height = Math.ceil(height * ratio);
  const context = raster.getContext("2d", { willReadFrequently: true });
  const style = getComputedStyle(root.value);
  context.scale(ratio, ratio);
  context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  context.textBaseline = "alphabetic";
  const gradient = context.createLinearGradient(0, 0, width, height * 0.2);
  [[0, "#ee63b4"], [0.223, "#e8e89f"], [0.339, "#4cc0df"], [0.455, "#a2b1b1"], [0.674, "#fc7212"], [1, "#e7d975"]]
    .forEach(([stop, color]) => gradient.addColorStop(stop, color));
  context.fillStyle = gradient;
  context.fillText("GAMES", 0, baseline.value.getBoundingClientRect().top - rect.top);
  const pixels = context.getImageData(0, 0, raster.width, raster.height).data;
  // Sample the actual local font, keeping the original glyph shape and colors.
  // A cell is roughly 1/42 of the word width, rather than a full letter slice.
  const cell = Math.max(2, Math.round(width * ratio / 42));
  tiles = [];
  for (let y = 0; y < raster.height; y += cell) {
    for (let x = 0; x < raster.width; x += cell) {
      const w = Math.min(cell, raster.width - x), h = Math.min(cell, raster.height - y);
      let occupied = false;
      for (let py = y; py < y + h && !occupied; py++) {
        for (let px = x; px < x + w; px++) {
          if (pixels[(py * raster.width + px) * 4 + 3] > 8) { occupied = true; break; }
        }
      }
      if (occupied) tiles.push({ x, y, w, h, noise: seed(y * raster.width + x), start: x / raster.width * 0.62 + seed(x + y) * 0.08 });
    }
  }
  canvas.value.width = Math.ceil(width * 3.2 * ratio);
  canvas.value.height = Math.ceil(height * 2.2 * ratio);
  schedule();
}

function paint(now) {
  frame = undefined;
  if (!raster || !canvas.value) return;
  const context = canvas.value.getContext("2d");
  context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  if (!visible || document.hidden) return;
  // Play the full entrance on visibility, even after an anchor jump or fast
  // scroll. The requested pixel flight does not use system motion preferences.
  startedAt ??= now;
  const progress = clamp((now - startedAt) / 1600);
  animationProgress.value = progress;
  const originX = width * 2.2, originY = height * 0.6;
  for (const tile of tiles) {
    const local = clamp((progress - tile.start) / 0.3);
    if (!local) continue;
    const remaining = (1 - local) ** 3;
    const w = tile.w / ratio, h = tile.h / ratio;
    const x = originX + tile.x / ratio - width * (1.4 + tile.noise * 0.7) * remaining;
    const y = originY + tile.y / ratio + (tile.noise - 0.5) * height * 1.2 * remaining;
    context.save();
    context.globalAlpha = Math.min(1, local * 5);
    context.translate(x + w / 2, y + h / 2);
    context.rotate((tile.noise - 0.5) * Math.PI * remaining);
    context.drawImage(raster, tile.x, tile.y, tile.w, tile.h, -w / 2, -h / 2, w, h);
    context.restore();
  }
  if (progress < 1) schedule();
}
function schedule() {
  if (!disposed && !frame) frame = requestAnimationFrame(paint);
}
function visibilityChanged() {
  startedAt = undefined;
  animationProgress.value = 0;
  schedule();
}
onMounted(() => {
  observer = new ResizeObserver(measure);
  observer.observe(root.value);
  visibilityObserver = new IntersectionObserver(([entry]) => {
    if (visible === entry.isIntersecting) return;
    visible = entry.isIntersecting;
    visibilityChanged();
  }, { threshold: 0.2 });
  visibilityObserver.observe(root.value);
  document.addEventListener("visibilitychange", visibilityChanged);
  document.fonts.ready.then(() => { fontReady = true; measure(); });
});
onBeforeUnmount(() => {
  disposed = true;
  observer?.disconnect();
  visibilityObserver?.disconnect();
  document.removeEventListener("visibilitychange", visibilityChanged);
  cancelAnimationFrame(frame);
});
</script>

<style scoped>
.pixel-games { display: inline-block; position: relative; width: 100%; white-space: nowrap; vertical-align: top; }
.baseline-probe { display: inline-block; width: 0; height: 0; padding: 0; }
.pixel-canvas { position: absolute; left: -220%; top: -60%; width: 320%; height: 220%; pointer-events: none; }
</style>
