<template>
  <span ref="root" class="global-scene" role="img" aria-label="GLOBAL">
    <img class="global-fallback" :class="{ ready }" :src="a.imgGlobal1" alt="" />
    <canvas ref="canvas" aria-hidden="true"></canvas>
  </span>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { figmaAssets as a } from '../data/figmaAssets';
const props = defineProps({ rotation: { type: Number, default: 0 }, playing: Boolean });
const root = ref(null), canvas = ref(null), ready = ref(false);
let source, surface, edge, observer, frame, disposed = false, width = 0, height = 0, ratio = 1;
function measure() {
  if (disposed || !source?.complete || !source.naturalWidth || !root.value) return;
  const rect = root.value.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  width = rect.width; height = rect.height;
  ratio = Math.min(window.devicePixelRatio || 1, 2);
  surface = document.createElement('canvas'); edge = document.createElement('canvas');
  surface.width = edge.width = Math.ceil(width * ratio);
  surface.height = edge.height = Math.ceil(height * ratio);
  const context = edge.getContext('2d');
  context.drawImage(source, 0, 0, edge.width, edge.height);
  context.globalCompositeOperation = 'source-atop'; context.fillStyle = '#872300';
  context.fillRect(0, 0, edge.width, edge.height);
  canvas.value.width = Math.ceil(width * 1.24 * ratio);
  canvas.value.height = Math.ceil(height * 1.8 * ratio);
  ready.value = true; schedule();
}
function paint(now) {
  frame = undefined;
  if (!surface || disposed) return;
  const texture = surface.getContext('2d');
  texture.clearRect(0, 0, surface.width, surface.height);
  texture.drawImage(source, 0, 0, surface.width, surface.height);
  texture.globalCompositeOperation = 'source-atop';
  const time = now / 1800;
  const cx = surface.width * (.5 + Math.sin(time) * .55);
  const cy = surface.height * (.5 + Math.cos(time * .7) * .7);
  const light = texture.createRadialGradient(cx, cy, 0, cx, cy, surface.width * .45);
  light.addColorStop(0, '#ffffe8b0'); light.addColorStop(.22, '#ffe7a940');
  light.addColorStop(.45, '#fffdeec0'); light.addColorStop(.52, '#fff5ca18'); light.addColorStop(1, '#ffffff00');
  texture.fillStyle = light; texture.fillRect(0, 0, surface.width, surface.height);
  texture.globalCompositeOperation = 'source-over';
  const context = canvas.value.getContext('2d');
  context.setTransform(1, 0, 0, 1, 0, 0); context.clearRect(0, 0, canvas.value.width, canvas.value.height);
  context.scale(ratio, ratio);
  const angle = props.rotation * Math.PI / 180, c = Math.cos(angle), s = Math.sin(angle);
  const thickness = height * .13, planes = [-1, -.6, -.2, .2, .6, 1];
  if (c < 0) planes.reverse();
  // Alpha-masked strips project the original artwork and its side depth.
  // One small canvas avoids a stack of GPU masks/filters while rotating.
  planes.forEach((plane, index) => {
    const image = index === planes.length - 1 ? surface : edge, z = plane * thickness / 2;
    for (let row = 0; row < 32; row++) {
      const y = (row / 32 - .5) * height, nextY = ((row + 1) / 32 - .5) * height;
      const zoom = 600 / (600 - y * s - z * c);
      const screenY = (y * c - z * s) * zoom, screenNext = (nextY * c - z * s) * zoom;
      context.drawImage(image, 0, row * image.height / 32, image.width, image.height / 32,
        width * .62 - width * zoom / 2, height * .9 + Math.min(screenY, screenNext),
        width * zoom, Math.max(.25, Math.abs(screenNext - screenY) + .25));
    }
  });
  if (props.playing && !document.hidden) schedule();
}
function schedule() { if (!disposed && !frame) frame = requestAnimationFrame(paint); }
watch(() => [props.rotation, props.playing], schedule);
onMounted(() => {
  source = new Image(); source.onload = measure; source.src = a.imgGlobal1;
  observer = new ResizeObserver(measure); observer.observe(root.value);
});
onBeforeUnmount(() => { disposed = true; source.onload = null; observer?.disconnect(); cancelAnimationFrame(frame); });
</script>
<style scoped>
.global-scene { display: block; position: relative; width: 100%; aspect-ratio: 221 / 57; }
.global-fallback { width: 100%; height: auto; }
.global-fallback.ready { visibility: hidden; }
canvas { position: absolute; left: -12%; top: -40%; width: 124%; height: 180%; pointer-events: none; }
</style>
