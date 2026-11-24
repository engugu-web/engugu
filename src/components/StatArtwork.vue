<template>
  <div :class="['original-stat', `original-stat-${index}`]" aria-hidden="true">
    <div v-if="index === 0" class="clients-art">
      <img :src="a.img121121" alt="" />
    </div>
    <div
      v-else-if="index === 1"
      class="map-mask"
      :style="{ maskImage: `url(${a.img2})` }"
    >
      <img class="map-art" :src="a.img3" alt="" />
    </div>
    <div
      v-else
      class="earth-mask"
      :style="{ maskImage: `url(${a.imgEarth1})` }"
    >
      <img class="earth-art" :src="a.imgEarth2" alt="" />
      <div class="staff-dots">
        <img
          v-for="src in [
            a.imgFirstperson1,
            a.imgFirstperson2,
            a.imgFirstperson3,
          ]"
          :key="src"
          :src="src"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { figmaAssets as a } from "../data/figmaAssets";
defineProps({ index: Number });
</script>
<style scoped>
.original-stat {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.clients-art {
  position: absolute;
  left: 13.66%;
  top: 69.07%;
  width: 61.12%;
  height: 30.93%;
  overflow: hidden;
}
.clients-art img {
  position: absolute;
  width: 106.33%;
  height: 141.41%;
  top: -0.08%;
  left: 0;
  max-width: none;
}
.map-mask,
.earth-mask {
  position: absolute;
  left: 0;
  top: 59.65%;
  width: 100%;
  height: 40.35%;
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}
.map-art {
  position: absolute;
  left: -12.08%;
  top: 16.73%;
  width: 112.35%;
  height: 98.05%;
  max-width: none;
}
.earth-art {
  position: absolute;
  left: 55.69%;
  top: 20.23%;
  width: 29.45%;
  height: 65.69%;
}
.staff-dots {
  position: absolute;
  left: 11.56%;
  top: 65.37%;
  width: 9.1%;
  height: 10.12%;
}
.staff-dots img {
  position: absolute;
  top: 0;
  width: 50%;
  height: auto;
}
.staff-dots img:nth-child(2) {
  left: 25%;
}
.staff-dots img:nth-child(3) {
  left: 50%;
}
@media (max-width: 1023px) {
  .clients-art {
    top: auto;
    bottom: 0;
    height: 130px;
  }
  .map-mask,
  .earth-mask {
    top: auto;
    bottom: 0;
    height: 150px;
  }
}
</style>
