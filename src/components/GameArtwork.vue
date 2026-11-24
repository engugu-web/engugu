<template>
  <div class="orbit-scene">
    <div class="original-orbit" aria-hidden="true">
      <div class="orbit-glow"><img :src="a.imgEllipse1" alt="" /></div>
      <img class="orbit-ring" :src="a.img13X2" alt="" />
    </div>
    <div
      class="game-window"
      role="img"
      aria-label="Game campaigns changing within fixed frames inside the star ring"
      :style="{
        '--ring-mask': ringMask,
      }"
    >
      <div class="game-mask">
        <div class="game-wall" aria-hidden="true">
          <div
            v-for="(s, i) in visibleSlides"
            :key="i"
            class="game-tile"
            :style="{ '--column': i % 6, '--row': Math.floor(i / 6) }"
          >
            <Transition name="game-change">
              <img :key="s.src" :src="s.src" :style="crop(s)" alt="" decoding="async" />
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { figmaAssets as a } from "../data/figmaAssets";
// Production SVG data URLs contain parentheses; quote them for valid CSS urls.
const ringMask = `url("${a.imgRectangle6}")`;
const props = defineProps({ playing: { type: Boolean, default: false } });
// The original twelve image fills, including their Figma crop transforms.
const slides = [
  [a.imgRectangle7, 239.97, 144.89, -69.73, -6.14],
  [a.imgRectangle8, 180.93, 110.7, -36.33, 0],
  [a.imgRectangle9, 236.63, 132.5, -65.36, -16.48],
  [a.imgRectangle10, 187.7, 105.62, -43.79, 0],
  [a.imgRectangle11, 100, 100, 0, 0],
  [a.imgRectangle17, 163.92, 100, -31.82, 0],
  [a.imgRectangle12, 100, 100, 0, 0],
  [a.imgRectangle13, 163.92, 100, -0.02, 0],
  [a.imgRectangle14, 100, 100, 0, 0],
  [a.imgRectangle15, 100, 100, 0, 0],
  [a.imgRectangle16, 100, 100, 0, 0],
  [a.imgRectangle18, 190.35, 118.12, -44.95, -4.37],
].map(([src, w, h, x, y]) => ({ src, w, h, x, y }));
// All twelve fixed frames crossfade to their next image together; no tile moves.
const step = ref(0);
const visibleSlides = computed(() => slides.map((_, index) => slides[(index + step.value) % slides.length]));
let timer;
watch(() => props.playing, (playing) => {
  clearInterval(timer);
  if (playing) timer = setInterval(() => {
    step.value = (step.value + 1) % slides.length;
  }, 2000);
}, { immediate: true });
onBeforeUnmount(() => clearInterval(timer));
const crop = (s) => ({
  width: `${s.w}%`,
  height: `${s.h}%`,
  left: `${s.x}%`,
  top: `${s.y}%`,
});
</script>
<style scoped>
.orbit-scene {
  --orbit-unit: var(--du);
  position: absolute;
  top: 0;
  left: 0;
  width: calc(1920 * var(--orbit-unit));
  height: calc(1623 * var(--orbit-unit));
}
.original-orbit {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}
.orbit-glow {
  position: absolute;
  left: calc(-400 * var(--orbit-unit));
  top: calc(174 * var(--orbit-unit));
  width: calc(2258.305 * var(--orbit-unit));
  height: calc(1294.01 * var(--orbit-unit));
  display: flex;
  align-items: center;
  justify-content: center;
}
.orbit-glow img {
  width: calc(2763.87 * var(--orbit-unit));
  height: calc(1056.31 * var(--orbit-unit));
  max-width: none;
  transform: rotate(-21.46deg);
  flex: none;
  /* Feather the source artwork's rectangular boundary (feedback 176:36). */
  mask-image: radial-gradient(ellipse closest-side, #000 48%, transparent 100%);
}
.orbit-ring {
  position: absolute;
  left: calc(-302.65 * var(--orbit-unit));
  top: calc(277 * var(--orbit-unit));
  width: calc(2066 * var(--orbit-unit));
  height: calc(950 * var(--orbit-unit));
  max-width: none;
  object-fit: cover;
}
.game-window {
  --gallery-unit: var(--orbit-unit);
  position: absolute;
  left: calc(440 * var(--orbit-unit));
  top: calc(517 * var(--orbit-unit));
  width: calc(1040 * var(--gallery-unit));
  height: calc(336 * var(--gallery-unit));
  pointer-events: none;
}
/* Keep the original alpha mask in its Figma coordinate system. The asset is
   unrotated; applying it to its rotated bounding box loses the ring's slope.
   These offsets include the SVG's 24px blur padding. */
.game-mask {
  position: absolute;
  left: calc(-617.603893 * var(--gallery-unit));
  top: calc(325.950144 * var(--gallery-unit));
  width: calc(1735.34 * var(--gallery-unit));
  height: calc(426.365 * var(--gallery-unit));
  transform: rotate(-21.585144deg);
  transform-origin: 0 0;
  mask-mode: alpha;
  mask-image: var(--ring-mask);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}
.game-wall {
  position: absolute;
  left: calc(694.204187 * var(--gallery-unit));
  top: calc(-75.885619 * var(--gallery-unit));
  width: calc(1040 * var(--gallery-unit));
  height: calc(336 * var(--gallery-unit));
  transform: rotate(21.585144deg);
  transform-origin: 0 0;
  overflow: hidden;
}
.game-tile {
  width: calc(160 * var(--gallery-unit));
  height: calc(160 * var(--gallery-unit));
  position: absolute;
  top: calc(var(--row) * 176 * var(--gallery-unit));
  left: calc(var(--column) * 176 * var(--gallery-unit));
  border-radius: calc(14 * var(--gallery-unit));
  overflow: hidden;
}
.game-tile img {
  position: absolute;
  max-width: none;
  object-fit: cover;
}
.game-change-enter-active,
.game-change-leave-active { transition: opacity 650ms ease; }
.game-change-enter-from,
.game-change-leave-to { opacity: 0; }
@media (max-width: 1023px) {
  /* Scale and move the entire Figma canvas together. The ring, alpha mask and
     card belt must never use independent mobile dimensions or offsets. */
  .orbit-scene {
    --orbit-unit: var(--mobile-orbit-unit);
    left: calc(50% - 960 * var(--orbit-unit));
    top: calc(var(--mobile-gallery-top) - 517 * var(--orbit-unit));
  }
}
</style>
