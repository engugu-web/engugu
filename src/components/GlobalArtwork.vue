<template>
  <span class="global-scene" role="img" aria-label="GLOBAL">
    <img
      :src="a.imgGlobal1"
      :style="{ transform: `rotateX(${rotation}deg)` }"
      alt=""
    />
  </span>
</template>
<script setup>
import { figmaAssets as a } from '../data/figmaAssets';

defineProps({ rotation: { type: Number, default: 0 } });
</script>
<style scoped>
.global-scene {
  display: block;
  width: 100%;
  aspect-ratio: 221 / 57;
  perspective: 600px;
}
.global-scene img {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: center;
  backface-visibility: visible;
  /* Rotate the complete artwork as one surface: no strip seams or depth swaps. */
  will-change: transform;
}
</style>
