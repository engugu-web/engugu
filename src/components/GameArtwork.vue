<template>
  <div class="original-orbit" aria-hidden="true">
    <div class="orbit-glow"><img :src="a.imgEllipse1" alt="" /></div>
    <img class="orbit-ring" :src="a.img13X2" alt="" />
  </div>
  <div
    class="game-window"
    role="img"
    aria-label="Game campaigns circulating counterclockwise inside the star ring"
    :style="{
      '--ring-mask': ringMask,
      '--carousel-state': playing ? 'running' : 'paused',
    }"
  >
    <div class="game-mask">
      <div class="game-wall" aria-hidden="true">
        <div
          v-for="(s, i) in orbitSlides"
          :key="i"
          class="game-tile"
          :style="{ '--slot': initialSlots[i] }"
        >
          <img :src="s.src" :style="crop(s)" alt="" decoding="async" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { figmaAssets as a } from "../data/figmaAssets";
// Production SVG data URLs contain parentheses; quote them for valid CSS urls.
const ringMask = `url("${a.imgRectangle6}")`;
defineProps({ playing: { type: Boolean, default: false } });
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
// One connected counterclockwise belt. Four extra cards fill its hidden turns,
// so cards never overlap at a visible corner or jump between the two rows.
// Slots 2–7 form the lower row; 10–15 form the upper row in reverse order.
const orbitSlides = [...slides, slides[4], slides[2], slides[7], slides[9]];
const initialSlots = [15, 14, 13, 12, 11, 10, 2, 3, 4, 5, 6, 7, 0, 1, 8, 9];
const crop = (s) => ({
  width: `${s.w}%`,
  height: `${s.h}%`,
  left: `${s.x}%`,
  top: `${s.y}%`,
});
</script>
<style scoped>
.original-orbit {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}
.orbit-glow {
  position: absolute;
  left: calc(-400 * var(--du));
  top: calc(174 * var(--du));
  width: calc(2258.305 * var(--du));
  height: calc(1294.01 * var(--du));
  display: flex;
  align-items: center;
  justify-content: center;
}
.orbit-glow img {
  width: calc(2763.87 * var(--du));
  height: calc(1056.31 * var(--du));
  max-width: none;
  transform: rotate(-21.46deg);
  flex: none;
}
.orbit-ring {
  position: absolute;
  left: calc(-302.65 * var(--du));
  top: calc(277 * var(--du));
  width: calc(2066 * var(--du));
  height: calc(950 * var(--du));
  max-width: none;
  object-fit: cover;
}
.game-window {
  --gallery-unit: var(--du);
  --orbit-duration: 80s;
  position: absolute;
  left: calc(440 * var(--du));
  top: calc(517 * var(--du));
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
  top: 0;
  left: 0;
  border-radius: calc(14 * var(--gallery-unit));
  overflow: hidden;
  animation: game-orbit var(--orbit-duration) linear
    calc(var(--slot) * var(--orbit-duration) / -16) infinite;
  animation-play-state: var(--carousel-state);
}
.game-tile img {
  position: absolute;
  max-width: none;
  object-fit: cover;
}
/* Turns are one full card + gap outside the viewport. The upper row moves
   left, then down the hidden left edge, right along the lower row and up the
   hidden right edge. Cards stay upright throughout the circuit. */
@keyframes game-orbit {
  0% { transform: translate(calc(-176 * var(--gallery-unit)), 0); }
  6.25% { transform: translate(calc(-176 * var(--gallery-unit)), calc(176 * var(--gallery-unit))); }
  50% { transform: translate(calc(1056 * var(--gallery-unit)), calc(176 * var(--gallery-unit))); }
  56.25% { transform: translate(calc(1056 * var(--gallery-unit)), 0); }
  100% { transform: translate(calc(-176 * var(--gallery-unit)), 0); }
}
@media (prefers-reduced-motion: reduce) {
  /* Paused by default via the composable; the existing explicit opt-in may
     resume it without changing the visitor's system preference. */
  .game-tile {
    animation: game-orbit var(--orbit-duration) linear
      calc(var(--slot) * var(--orbit-duration) / -16) infinite !important;
    animation-play-state: var(--carousel-state) !important;
  }
}
@media (max-width: 1023px) {
  .orbit-glow {
    left: -45%;
    top: 30px;
    width: 170%;
    height: 600px;
  }
  .orbit-glow img {
    width: 150%;
    height: auto;
  }
  .orbit-ring {
    left: -28%;
    top: 70px;
    width: 145%;
    height: 430px;
    object-fit: fill;
  }
  .game-window {
    --gallery-unit: calc(78vw / 1040);
    left: 11%;
    top: 160px;
  }
}
</style>
