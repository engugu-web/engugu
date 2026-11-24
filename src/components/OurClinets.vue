<template>
  <section class="clients shell" aria-labelledby="clients-title">
    <div
      class="logo-arc"
      :class="{ 'is-paused': paused }"
      aria-label="Our game publishing clients"
    >
      <div
        v-for="(client, i) in featured"
        :key="client.name"
        :class="['client-logo', client.tone]"
        :style="{ '--delay': `${-(featured.length - i - 0.5) * 4.8}s` }"
      >
        <img :src="client.url" :alt="client.name" />
      </div>
    </div>
    <button
      class="carousel-control"
      type="button"
      :aria-pressed="paused"
      @click="paused = !paused"
    >
      {{ paused ? "Play carousel" : "Pause carousel" }}
    </button>
    <p>
      CHINESE GAME PUBLISHERS <span class="accent">50+</span><br />PROJECTS
      DELIVERED <span class="accent">400+</span>
    </p>
    <h2 id="clients-title" class="section-title">OUR CLIENTS</h2>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { figmaAssets as a } from "../data/figmaAssets";
const paused = ref(false);
const featured = [
  { name: "Bilibili Games", url: a.imgBilibili1, tone: "bilibili" },
  { name: "FunPlus", url: a.imgFunplusRemovebgPreview1, tone: "orange" },
  { name: "Lilith Games", url: a.img1, tone: "red" },
  { name: "IGG", url: a.imgIgg1, tone: "dark" },
  { name: "Nuverse", url: a.imgRemovebgPreview1, tone: "nuverse" },
];
</script>
<style scoped>
.clients {
  position: absolute;
  top: calc(2868 * var(--du));
  left: calc(337 * var(--du));
  width: calc(1247 * var(--du));
  height: calc(539 * var(--du));
  text-align: center;
}
.logo-arc {
  --arc-rise: calc(220 * var(--du));
  position: absolute;
  top: calc(171 * var(--du));
  left: calc(82.37 * var(--du));
  width: calc(1052.83 * var(--du));
  height: calc(297.65 * var(--du));
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 12%,
    black 88%,
    transparent
  );
}
.client-logo {
  position: absolute;
  width: calc(170 * var(--du));
  height: calc(80 * var(--du));
  padding: calc(18 * var(--du)) calc(22 * var(--du));
  border: 1px solid #ddd;
  border-radius: calc(50 * var(--du));
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: client-orbit 24s linear var(--delay) infinite !important;
}
.logo-arc.is-paused .client-logo {
  animation-play-state: paused !important;
}
.carousel-control {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 6px 12px;
  border: 0;
  background: transparent;
  color: #737373;
  font-size: 12px;
}
.carousel-control:hover {
  color: var(--orange);
}
.carousel-control:focus-visible {
  opacity: 1;
  pointer-events: auto;
}
.client-logo img {
  max-height: 100%;
  object-fit: contain;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .client-logo:hover img {
    animation: logo-wiggle 650ms ease-in-out infinite alternate;
  }
}
@keyframes logo-wiggle {
  from {
    transform: scale(1.2) rotate(-4deg);
  }
  to {
    transform: scale(1.2) rotate(4deg);
  }
}
.client-logo.monochrome img {
  filter: brightness(0);
}
.client-logo.orange img {
  filter: brightness(0) saturate(100%) invert(43%) sepia(92%) saturate(2012%)
    hue-rotate(351deg) brightness(100%) contrast(94%);
}
.client-logo.red img {
  filter: brightness(0) saturate(100%) invert(26%) sepia(99%) saturate(3535%)
    hue-rotate(346deg) brightness(93%) contrast(99%);
}
.client-logo.dark {
  width: calc(80 * var(--du));
  padding: calc(10 * var(--du));
  background: #181818;
}
@keyframes client-orbit {
  0% {
    left: 110%;
    top: var(--arc-rise);
    transform: translateX(-50%) rotate(36deg);
    opacity: 0;
  }
  12.5% {
    left: 95%;
    top: calc(var(--arc-rise) * 0.5625);
    transform: translateX(-50%) rotate(27deg);
    opacity: 0.5;
  }
  25% {
    left: 80%;
    top: calc(var(--arc-rise) * 0.25);
    transform: translateX(-50%) rotate(18deg);
    opacity: 1;
  }
  37.5% {
    left: 65%;
    top: calc(var(--arc-rise) * 0.0625);
    transform: translateX(-50%) rotate(9deg);
  }
  50% {
    left: 50%;
    top: 0;
    transform: translateX(-50%) rotate(0deg);
  }
  62.5% {
    left: 35%;
    top: calc(var(--arc-rise) * 0.0625);
    transform: translateX(-50%) rotate(-9deg);
  }
  75% {
    left: 20%;
    top: calc(var(--arc-rise) * 0.25);
    transform: translateX(-50%) rotate(-18deg);
    opacity: 1;
  }
  87.5% {
    left: 5%;
    top: calc(var(--arc-rise) * 0.5625);
    transform: translateX(-50%) rotate(-27deg);
    opacity: 0.5;
  }
  100% {
    left: -10%;
    top: var(--arc-rise);
    transform: translateX(-50%) rotate(-36deg);
    opacity: 0;
  }
}

.clients > p {
  white-space: nowrap;
  position: absolute;
  top: calc(407 * var(--du));
  left: calc(509 * var(--du));
  width: calc(230 * var(--du));
  height: calc(38 * var(--du));
  margin: 0;
  font: 400 calc(16 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
  color: #666;
}
.clients h2 {
  position: absolute;
  top: calc(469 * var(--du));
  left: calc(446 * var(--du));
  width: calc(356 * var(--du));
  height: calc(70 * var(--du));
  font: 500 calc(58 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
  white-space: nowrap;
}
@media (max-width: 1023px) {
  .clients {
    position: relative;
    top: auto;
    left: auto;
    width: calc(100% - 40px);
    height: auto;
    padding: 90px 0 100px;
    margin: 0 auto;
  }
  .logo-arc {
    --arc-rise: 140px;
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    max-width: 820px;
    height: 190px;
    margin: 0 auto;
  }
  .client-logo {
    width: 130px;
    height: 65px;
    padding: 17px 22px;
    border-radius: 40px;
  }
  .client-logo.dark {
    width: 65px;
    padding: 10px;
  }
  .clients > p,
  .clients h2 {
    position: static;
    width: auto;
    height: auto;
  }
  .clients > p {
    font-size: 12px;
    margin: 12px 0 24px;
  }
  .clients h2 {
    font-size: 40px;
  }
  .carousel-control {
    bottom: 55px;
  }
}
@media (max-width: 650px) {
  .clients {
    padding: 80px 0;
  }
  .logo-arc {
    --arc-rise: 100px;
    height: 130px;
  }
  .client-logo {
    width: 82px;
    height: 44px;
    padding: 10px 13px;
  }
  .client-logo.dark {
    width: 44px;
  }
  .clients h2 {
    font-size: 30px;
  }
  .carousel-control {
    bottom: 35px;
  }
}
.logo-arc {
  mask-image: url("../assets/figma/88a64.svg");
  mask-size: calc(1347 * var(--du)) calc(545 * var(--du));
  mask-position: calc(-132.37 * var(--du)) calc(-221 * var(--du));
  mask-repeat: no-repeat;
}
.client-logo {
  width: calc(169 * var(--du));
  height: calc(76 * var(--du));
  border-color: #b3b3b3;
}
.client-logo.bilibili {
  background: #939393;
}
.client-logo img {
  width: calc(87 * var(--du));
  height: auto;
  max-height: 100%;
}
.client-logo.orange img,
.client-logo.red img {
  filter: none;
}
.client-logo.dark {
  width: calc(76 * var(--du));
}
.client-logo.dark img {
  width: calc(43 * var(--du));
}
.client-logo.nuverse img {
  width: calc(91.482 * var(--du));
}
@media (max-width: 1023px) {
  .logo-arc {
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 12%,
      #000 88%,
      transparent
    );
    mask-size: 100% 100%;
    mask-position: center;
  }
  .client-logo {
    width: 130px;
    height: 65px;
  }
  .client-logo.dark {
    width: 65px;
  }
  .client-logo img {
    width: 87px;
  }
  .client-logo.dark img {
    width: 43px;
  }
}
@media (max-width: 650px) {
  .client-logo {
    width: 82px;
    height: 44px;
  }
  .client-logo.dark {
    width: 44px;
  }
  .client-logo img {
    width: 58px;
  }
  .client-logo.dark img {
    width: 30px;
  }
}
</style>
