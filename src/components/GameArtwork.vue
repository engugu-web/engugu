<template>
  <div class="original-orbit" aria-hidden="true">
    <div class="orbit-glow"><img :src="a.imgEllipse1" alt="" /></div>
    <img class="orbit-ring" :src="a.img13X2" alt="" />
  </div>
  <div class="game-wall" :style="{ '--ring-mask': `url(${a.imgRectangle6})` }">
    <div v-for="(_, i) in slides" :key="i" class="game-tile">
      <Transition name="game-crossfade">
        <img
          :key="(i + frame) % slides.length"
          :src="slide(i).src"
          :style="crop(slide(i))"
          :alt="`Game campaign ${i + 1}`"
          loading="lazy"
          decoding="async"
        />
      </Transition>
    </div>
  </div>
</template>
<script setup>
import { figmaAssets as a } from "../data/figmaAssets";
const props = defineProps({ frame: { type: Number, default: 0 } });
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
const slide = (i) => slides[(i + props.frame) % slides.length];
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
.game-wall {
  position: absolute;
  left: calc(440 * var(--du));
  top: calc(517 * var(--du));
  width: calc(1040 * var(--du));
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: calc(16 * var(--du));
  mask-image: var(--ring-mask);
  mask-size: calc(1623.274 * var(--du)) calc(761.645 * var(--du));
  mask-position: calc(-543.99 * var(--du)) calc(-175.842 * var(--du));
  mask-repeat: no-repeat;
}
.game-tile {
  position: relative;
  aspect-ratio: 1;
  border-radius: calc(14 * var(--du));
  overflow: hidden;
}
.game-tile img {
  position: absolute;
  max-width: none;
  object-fit: cover;
}
.game-crossfade-enter-active,
.game-crossfade-leave-active {
  transition: opacity 700ms ease;
}
.game-crossfade-enter-from,
.game-crossfade-leave-to {
  opacity: 0;
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
  .game-wall {
    left: 11%;
    top: 160px;
    width: 78%;
    gap: 8px;
    mask-size: 156.08% 226.68%;
    mask-position: center;
  }
  .game-tile {
    border-radius: 8px;
  }
}
</style>
