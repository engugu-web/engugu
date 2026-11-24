<template>
  <Header />
  <main class="home-page">
    <section class="hero shell">
      <p>Guarantee Creativity To Reality</p>
      <h1>ORANGE GLOBAL<br />MEDIA</h1>
      <h2>
        No game is too hard to market, make the<br class="desktop-break" />
        game marketing easy.
      </h2>
      <router-link class="start-button" to="/services"
        >GO START <img class="start-arrow" :src="a.imgSubtract" alt="" /><img
          class="start-glass"
          :src="a.imgUnion"
          alt=""
      /></router-link>
    </section>
    <section
      id="our-work"
      ref="workSection"
      class="work-section"
      aria-label="Our work"
    >
      <GameArtwork :frame="frame" />
      <h2 ref="mission" class="mission">
        <span
          class="mission-first"
          :style="{ transform: `scaleX(${copyScale || 1})` }"
          >FOUNDED TO HELP CHINESE</span
        >
        <span class="games-word"
          >GAMES<span
            v-for="n in 24"
            :key="n"
            class="games-color"
            aria-hidden="true"
            :style="{
              opacity: progress >= (((n * 7) % 24) + 1) / 24 ? 1 : 0,
              clipPath: `inset(${(Math.floor((n - 1) / 8) * 100) / 3}% ${100 - (n % 8 || 8) * 12.5}% ${100 - ((Math.floor((n - 1) / 8) + 1) * 100) / 3}% ${((n - 1) % 8) * 12.5}%)`,
            }"
            >GAMES</span
          ></span
        ><span class="mission-second"
          >REACH
          <span
            class="global-word"
            :style="{
              transform: `perspective(600px) rotateX(${progress * 360}deg)`,
            }"
            ><img :src="a.imgGlobal1" alt="GLOBAL"
          /></span>
          AUDIENCES.</span
        >
      </h2>
    </section>
    <section
      id="our-services-row"
      class="services-panel shell"
      @pointermove="trackGlass"
      @pointerleave="glassTrail = []"
    >
      <div class="service-background" aria-hidden="true">
        <img :src="a.img5" alt="" />
      </div>
      <img
        v-for="point in glassTrail"
        :key="point.id"
        class="pointer-glass"
        :src="a.img"
        alt=""
        :style="{ left: point.x + 'px', top: point.y + 'px' }"
      />
      <h2>7 CORE SERVICES</h2>
      <div class="service-grid">
        <div class="service-intro">
          <h3>END-TO-END<br />MARKETING<br />SOLUTIONS</h3>
          <p>
            Global marketing solutions powered by local insights, strategic
            planning,<br />creative execution, and resource integration.
          </p>
        </div>
        <router-link
          v-for="(service, index) in services"
          :key="service.id"
          :to="`/services#${service.id}`"
          class="service-item"
          :style="servicePosition(index)"
          ><div class="service-icon">
            <img
              :src="serviceIcons[index]"
              alt=""
              :class="`service-icon-${index}`"
            />
          </div>
          <h3>
            <template
              v-for="(line, lineIndex) in serviceLines[index]"
              :key="line"
              ><br v-if="lineIndex" />{{ line }}</template
            >
          </h3>
          <p>{{ service.text }}</p></router-link
        >
      </div>
    </section>
    <OurClients />
    <section
      id="about-row"
      class="about-grid shell"
      aria-label="About Orange Global Media"
    >
      <article v-for="(item, i) in stats" :key="item.title" class="stat-card">
        <h2>{{ item.title }}</h2>
        <strong>{{ item.value }}<span>+</span></strong>
        <div class="stat-copy">
          <p>{{ item.text }}</p>
          <p>{{ item.detail }}</p>
        </div>
        <StatArtwork :index="i" />
      </article>
    </section>
    <section class="partner-section shell">
      <div class="partner-rating" aria-label="Five stars">
        <div class="partner-portraits">
          <img
            v-for="(src, i) in portraits"
            :key="src"
            :src="src"
            alt=""
            :class="{ 'is-flipped': i === 0 || i === 4 }"
          />
        </div>
        <img class="partner-stars" :src="a.imgGroup29" alt="" />
      </div>
      <h2 class="section-title">
        ALL-AROUND PARTNER<br />PROFESSIONAL EXPERTISE, POWERING<br
          class="desktop-break"
        />
        GAME BRANDS.
      </h2>
      <p>
        INFLUENCER MARKETING<br />SOCIAL STRATEGY<br />CONTENT PRODUCTION<br />COMMUNITY
        MARKETING & DISTRIBUTION
      </p>
    </section>
  </main>
  <Footer />
</template>
<script setup>
import { ref } from "vue";
import { figmaAssets as a } from "../data/figmaAssets";
import GameArtwork from "../components/GameArtwork.vue";
import StatArtwork from "../components/StatArtwork.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import OurClients from "../components/OurClinets.vue";
import { useHomeMotion } from "../composables/useHomeMotion";
const { workSection, mission, frame, progress, copyScale } = useHomeMotion();
import { services } from "../data/services";
const portraits = [
  a.imgEllipse5,
  a.imgEllipse6,
  a.imgEllipse7,
  a.imgEllipse8,
  a.imgEllipse9,
];
const serviceIcons = [
  a.imgIcon1,
  a.imgIcon2,
  a.imgIcon3,
  a.img331,
  a.imgGroup34,
  a.imgIcon6,
  a.imgIcon7,
];
const serviceLines = [
  ["INFLUENCER &", "KOL PARTNERSHIPS"],
  ["MANAGEMENT", "COMMUNITY ECOSYSTEM"],
  ["MUSIC PRODUCTION", "SERVICES"],
  ["OOH", "ADVERTISING"],
  ["GAMING MEDIA", "PR"],
  ["ENDORSEMENTS", "CELEBRITY", "& INFLUENCER"],
  ["CROSS-INDUSTRY", "PARTNERSHIPS"],
];
const serviceCoordinates = [
  [513, 252, 220],
  [865, 252, 283],
  [1223, 252, 248],
  [173, 572, 220],
  [513, 567, 220],
  [865, 567, 296],
  [1223, 567, 248],
];
const servicePosition = (i) => ({
  "--service-x": serviceCoordinates[i][0],
  "--service-y": serviceCoordinates[i][1],
  "--title-width": serviceCoordinates[i][2],
});
const glassTrail = ref([]);
let lastGlass = 0;
function trackGlass(event) {
  if (
    event.pointerType === "touch" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const now = performance.now();
  if (now - lastGlass < 65) return;
  lastGlass = now;
  const rect = event.currentTarget.getBoundingClientRect();
  glassTrail.value = [
    ...glassTrail.value.filter((p) => now - p.id < 1400).slice(-11),
    { id: now, x: event.clientX - rect.left, y: event.clientY - rect.top },
  ];
}
const stats = [
  {
    title: "CLIENTS SERVED",
    value: "40",
    text: "Founded in 2021, we are a global marketing and advertising agency dedicated to the gaming industry.",
    detail: "We empower Chinese games to reach players and markets worldwide.",
  },
  {
    title: "MARKETS COVERED",
    value: "110",
    text: "We create waves through resources, strategy, diversified services, and localized creativity—empowering game publishers to market smarter and scale globally.",
    detail:
      "We help game publishers reduce the time and resources spent on marketing, so they can focus on what matters most—their products and players.",
  },
  {
    title: "INTERNATIONAL STAFF",
    value: "108",
    text: "Every game expanding globally is like a rising ADC, with Orange Spirit as its all-round team captain.",
    detail:
      "With tank-like stability and support-style care, we guide each game through every stage of its global journey.",
  },
];
</script>
<style scoped>
/* Desktop coordinates are measured against Figma's 1920 × 6375 landing page.
   --du scales the desktop canvas while the mobile layout remains in flow. */
.home-page {
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: calc(5194.41 * var(--du));
  margin-inline: auto;
}
.hero {
  z-index: 2;
  position: absolute;
  inset: 0 0 auto;
  width: 100%;
  height: calc(653 * var(--du));
  text-align: center;
}
.hero > p {
  position: absolute;
  top: calc(144 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  width: calc(547 * var(--du));
  height: calc(30 * var(--du));
  font: 500 calc(28 * var(--du))/1.26 var(--font-body);
  letter-spacing: 0;
}
.hero h1 {
  position: absolute;
  top: calc(222 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  width: calc(836 * var(--du));
  height: calc(204 * var(--du));
  font: 500 calc(102 * var(--du))/1 var(--font-display);
  letter-spacing: 0;
  white-space: nowrap;
}
.hero h2 {
  position: absolute;
  top: calc(450 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  width: calc(667 * var(--du));
  height: calc(77 * var(--du));
  font: 500 calc(28 * var(--du))/1 var(--font-display);
  letter-spacing: 0;
}
.start-button {
  position: absolute;
  top: calc(576 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(28 * var(--du));
  width: calc(270 * var(--du));
  height: calc(77 * var(--du));
  border-radius: calc(40 * var(--du));
  box-shadow: 0 4px 7.4px #00000017;
  border: 1px solid #ffffffc2;
  background: linear-gradient(135deg, #ffffffb8, #ffffff4d);
  backdrop-filter: blur(18px) saturate(1.5);
  font: 500 calc(24 * var(--du))/1 var(--font-display);
}
.start-button:hover {
  box-shadow: 0 5px 20px #f1542d30;
}
.work-section {
  position: absolute;
  top: calc(380 * var(--du));
  left: 0;
  width: 100%;
  height: calc(1623 * var(--du));
  overflow: hidden;
  isolation: isolate;
}
.mission {
  white-space: nowrap;
  position: absolute;
  top: calc(1080 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  width: calc(970 * var(--du));
  height: calc(140 * var(--du));
  text-align: center;
  font: 500 calc(58 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
}
.games-word {
  position: relative;
  display: inline-block;
  color: var(--ink);
}
.games-color {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #ed84b7, #86b7bb, #f29535);
  color: transparent;
  background-clip: text;
}
.global-word {
  display: inline-block;
  width: calc(221 * var(--du));
  height: calc(57 * var(--du));
  vertical-align: middle;
  transform-origin: center;
}
.global-word img {
  width: 100%;
  height: auto;
}
.games-word {
  font-family: "Micro 5", monospace;
  font-size: calc(97 * var(--du));
  line-height: 1.2;
  vertical-align: middle;
}
.games-color {
  background-image: linear-gradient(
    101.65deg,
    #ee63b4 3.6%,
    #e8e89f 22.3%,
    #4cc0df 33.9%,
    #a2b1b1 45.5%,
    #fc7212 67.4%,
    #e7d975 96.4%
  );
}
.services-panel {
  position: absolute;
  top: calc(1844 * var(--du));
  left: calc(165 * var(--du));
  width: calc(1589 * var(--du));
  height: calc(943 * var(--du));
  border-radius: calc(40 * var(--du));
  background: linear-gradient(110deg, #ed3e13, #f07e51);
  color: white;
}
.services-panel > h2 {
  position: absolute;
  top: calc(89 * var(--du));
  left: calc(553 * var(--du));
  width: calc(461 * var(--du));
  height: calc(70 * var(--du));
  text-align: center;
  font: 500 calc(58 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
  white-space: nowrap;
}
.service-grid {
  position: absolute;
  top: calc(251 * var(--du));
  left: calc(175 * var(--du));
  display: grid;
  grid-template-columns: repeat(4, calc(269 * var(--du)));
  grid-auto-rows: calc(254 * var(--du));
  column-gap: calc(80 * var(--du));
  row-gap: calc(62 * var(--du));
}
.service-grid h3 {
  width: calc(220 * var(--du));
  min-height: calc(58 * var(--du));
  text-transform: uppercase;
  font: 500 calc(24 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
}
.service-grid p {
  width: calc(212 * var(--du));
  margin-top: calc(17 * var(--du));
  font: 400 clamp(10px, calc(14 * var(--du)), 14px)/1.2 var(--font-body);
  letter-spacing: 0;
}
.service-intro h3 {
  width: calc(269 * var(--du));
  height: calc(114 * var(--du));
  font-size: calc(32 * var(--du));
}
.service-intro p {
  margin-top: calc(44 * var(--du));
}
.service-item {
  border-radius: 16px;
  transition:
    background 0.2s,
    box-shadow 0.2s;
}
.service-item:hover {
  background: #ffffff12;
  box-shadow:
    0 0 28px #ffffff26,
    inset 0 0 0 1px #ffffff38;
}

.stat-card {
  transition:
    box-shadow 200ms,
    border-color 200ms;
}
.stat-card:hover {
  border-color: #ff9868;
  box-shadow: 0 0 22px #ff552640;
}
.service-item:nth-child(-n + 4)::after {
  content: "";
  display: block;
  width: calc(215 * var(--du));
  margin-top: calc(38 * var(--du));
  border-bottom: 1px solid #ffffff3a;
}
.about-grid {
  position: absolute;
  top: calc(3651 * var(--du));
  left: calc(166 * var(--du));
  width: calc(1589 * var(--du));
  height: calc(577.41 * var(--du));
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: calc(18.13 * var(--du));
}
.stat-card {
  position: relative;
  overflow: hidden;
  height: 100%;
  border-radius: calc(12.69 * var(--du));
  border: calc(1.81 * var(--du)) solid #717171;
  background: linear-gradient(#191919, #000);
  color: white;
}
.stat-card h2 {
  position: absolute;
  top: calc(55.3 * var(--du));
  left: calc(58.01 * var(--du));
  width: calc(398.84 * var(--du));
  height: calc(33 * var(--du));
  font: 400 calc(27.19 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
  white-space: nowrap;
}
.stat-card strong {
  position: absolute;
  top: calc(87.93 * var(--du));
  left: calc(58.01 * var(--du));
  color: #ff5526;
  font: 400 calc(58.01 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
}
.stat-card strong span {
  font: inherit;
}
.stat-copy {
  position: absolute;
  top: calc(197.61 * var(--du));
  left: calc(58.01 * var(--du));
  width: calc(398.84 * var(--du));
  color: #9a9aa3;
  font: 400 calc(18.13 * var(--du))/1.2 var(--font-body);
  letter-spacing: 0;
}
.stat-copy p + p {
  margin-top: calc(21.756 * var(--du));
}
.partner-section {
  position: absolute;
  top: calc(4488.41 * var(--du));
  left: calc(438 * var(--du));
  width: calc(1045 * var(--du));
  height: calc(446 * var(--du));
  text-align: center;
}
.partner-rating {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(24 * var(--du));
  height: calc(60 * var(--du));
  margin-bottom: calc(24 * var(--du));
}

.partner-section .section-title {
  white-space: nowrap;
  font: 500 calc(58 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
}
.partner-section > p {
  margin-top: calc(30 * var(--du));
  color: #777;
  font: 400 calc(16 * var(--du))/2 var(--font-display);
}
@media (max-width: 1023px) {
  .home-page {
    height: auto;
  }
  .hero,
  .work-section,
  .services-panel,
  .about-grid,
  .partner-section {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
  }
  .hero {
    height: auto;
    padding: 60px 20px 10px;
  }
  .hero > p,
  .hero h1,
  .hero h2,
  .start-button {
    position: static;
    transform: none;
    width: auto;
    height: auto;
  }
  .hero > p {
    font-size: 20px;
    margin-bottom: 30px;
  }
  .hero h1 {
    font-size: clamp(42px, 7vw, 76px);
    line-height: 1;
  }
  .hero h2 {
    font-size: 22px;
    line-height: 1.2;
    margin: 24px auto 40px;
    max-width: 600px;
  }
  .start-button {
    min-width: 210px;
    min-height: 60px;
    padding: 15px 28px;
    gap: 28px;
    border-radius: 40px;
    font-size: 18px;
  }
  .work-section {
    width: 100%;
    height: 620px;
  }

  .mission {
    white-space: normal;
    top: 445px;
    width: 90%;
    height: auto;
    font-size: 32px;
  }
  .services-panel {
    width: calc(100% - 40px);
    height: auto;
    margin: 0 auto;
    border-radius: 24px;
    padding: 45px 32px;
  }
  .services-panel > h2 {
    position: static;
    width: auto;
    height: auto;
    font-size: 38px;
    margin-bottom: 48px;
  }
  .service-grid {
    position: static;
    width: auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: auto;
    gap: 44px 30px;
  }
  .service-grid h3,
  .service-grid p,
  .service-intro h3 {
    width: auto;
    height: auto;
    min-height: 0;
  }
  .service-grid h3 {
    font-size: 22px;
  }
  .service-grid p,
  .service-intro p {
    font-size: 14px;
    line-height: 1.4;
    margin-top: 18px;
  }
  .service-intro h3 {
    font-size: 28px;
  }

  .service-item:nth-child(-n + 4)::after {
    display: none;
  }
  .about-grid {
    width: calc(100% - 40px);
    height: auto;
    margin: 0 auto;
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .stat-card {
    height: auto;
    min-height: 440px;
    padding: 40px 32px 150px;
    border-radius: 12.69px;
    border-width: 1.81px;
  }
  .stat-card h2,
  .stat-card strong,
  .stat-copy {
    position: static;
    width: auto;
    height: auto;
  }
  .stat-card h2 {
    font-size: 24px;
  }
  .stat-card strong {
    display: block;
    font-size: 52px;
    margin: 10px 0 28px;
  }
  .stat-copy {
    max-width: 520px;
    font-size: 16px;
  }
  .stat-copy p + p {
    margin-top: 20px;
  }

  .partner-section {
    width: calc(100% - 40px);
    height: auto;
    margin: 0 auto;
    padding: 100px 0 120px;
  }
  .partner-rating {
    height: 50px;
    gap: 18px;
    margin-bottom: 26px;
  }

  .partner-section .section-title {
    white-space: normal;
    font-size: 38px;
  }
  .partner-section > p {
    font-size: 12px;
    line-height: 2;
    margin-top: 25px;
  }
}
@media (max-width: 500px) {
  .hero {
    padding-top: 45px;
  }
  .hero > p {
    font-size: 17px;
  }
  .hero h1 {
    font-size: clamp(32px, 9.2vw, 46px);
  }
  .hero h2 {
    font-size: 18px;
  }
  .work-section {
    height: 450px;
  }

  .mission {
    top: 320px;
    font-size: 23px;
  }
  .services-panel {
    padding: 35px 24px;
  }
  .services-panel > h2 {
    font-size: 28px;
  }
  .service-grid {
    gap: 34px 22px;
  }
  .service-grid h3 {
    font-size: 17px;
  }
  .service-grid p {
    font-size: 13px;
  }
  .service-intro h3 {
    font-size: 22px;
  }
  .stat-card {
    padding: 32px 24px 130px;
  }
  .stat-card h2 {
    font-size: 22px;
  }
  .stat-copy {
    font-size: 15px;
  }
  .partner-section .section-title {
    font-size: 27px;
  }
  .desktop-break {
    display: none;
  }
}

/* Exact slots from Figma 157:4. Original SVG files are used without rewriting their contents. */
.start-button {
  top: calc(573 * var(--du));
  height: calc(80 * var(--du));
  border: 0;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
}
.start-arrow {
  transform: translateY(calc(1.5 * var(--du)));
  width: calc(21 * var(--du));
  height: calc(17 * var(--du));
}
.start-glass {
  position: absolute;
  left: calc(-7.9 * var(--du));
  top: calc(-3.9 * var(--du));
  width: calc(285.8 * var(--du));
  height: calc(95.8 * var(--du));
  max-width: none;
  z-index: -1;
}
.services-panel {
  background: #ff5526;
  overflow: hidden;
}
.service-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  mask-image: url("../assets/figma/36c88.svg");
  mask-size: 100% 100%;
  pointer-events: none;
}
.service-background img {
  position: absolute;
  left: -46.3%;
  top: -167.94%;
  width: 188.28%;
  height: 370.17%;
  max-width: none;
  object-fit: cover;
}
.service-grid {
  inset: 0;
  display: block;
}
.service-intro {
  position: absolute;
  left: calc(175 * var(--du));
  top: calc(251 * var(--du));
}
.service-intro p {
  width: calc(260 * var(--du));
  font: 400 calc(16 * var(--du))/1.2 var(--font-display);
}
.service-item {
  position: absolute;
  left: calc(var(--service-x) * var(--du));
  top: calc(var(--service-y) * var(--du));
  width: calc(300 * var(--du));
  height: calc(255 * var(--du));
}
.service-item h3 {
  position: absolute;
  left: calc(3 * var(--du));
  top: calc(85 * var(--du));
  width: calc(var(--title-width) * var(--du));
  white-space: nowrap;
}
.service-item p {
  position: absolute;
  top: calc(160 * var(--du));
  left: calc(5 * var(--du));
  margin: 0;
}
.service-item:nth-child(2) p {
  width: calc(164 * var(--du));
}
.service-item:nth-child(7) p {
  top: calc(194 * var(--du));
}
.service-item:nth-child(-n + 4)::after {
  position: absolute;
  left: calc(3 * var(--du));
  top: calc(255 * var(--du));
  margin: 0;
  width: calc(214 * var(--du));
  border: 0;
  height: calc(1 * var(--du));
  background: url("../assets/figma/64119.svg") center/100% 100%;
}
.service-icon {
  position: relative;
  width: calc(50 * var(--du));
  height: calc(50 * var(--du));
  transition:
    transform 150ms,
    filter 150ms;
}
.service-icon img {
  width: calc(50 * var(--du));
  height: auto;
}
.service-icon-3 {
  position: absolute;
  left: 14%;
  top: 12%;
  width: calc(40 * var(--du)) !important;
}
.service-icon-4 {
  position: absolute;
  left: 14%;
  top: 10%;
  width: calc(37.5827 * var(--du)) !important;
}
.service-item:hover .service-icon {
  filter: drop-shadow(0 0 8px #fff8);
}
.service-item:active .service-icon {
  transform: scale(0.95);
}
.pointer-glass {
  position: absolute;
  width: calc(29.8 * var(--du));
  height: auto;
  pointer-events: none;
  z-index: 3;
  animation: glass-trace 1.4s ease-out both;
}
@keyframes glass-trace {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -90%) scale(0.5);
  }
}
.partner-portraits {
  position: relative;
  width: calc(260 * var(--du));
  height: calc(60 * var(--du));
}
.partner-portraits img {
  position: absolute;
  top: calc(-1 * var(--du));
  left: calc(-1 * var(--du));
  width: calc(62 * var(--du));
  height: calc(62 * var(--du));
  max-width: none;
  margin-right: calc(-12 * var(--du));
}
.partner-portraits img:nth-child(2) {
  left: calc(49 * var(--du));
}
.partner-portraits img:nth-child(3) {
  left: calc(99 * var(--du));
}
.partner-portraits img:nth-child(4) {
  left: calc(149 * var(--du));
}
.partner-portraits img:nth-child(5) {
  left: calc(199 * var(--du));
}
.partner-rating {
  transform: translateX(calc(15 * var(--du)));
}
.partner-portraits .is-flipped {
  transform: scaleX(-1);
}
.partner-stars {
  width: calc(174 * var(--du));
  height: calc(30 * var(--du));
}
@media (max-width: 1023px) {
  .start-button {
    top: auto;
    height: auto;
    background: #fff7;
    backdrop-filter: blur(18px);
    box-shadow: 0 4px 8px #0001;
  }
  .start-glass {
    display: none;
  }
  .start-arrow {
    width: 21px;
    height: 17px;
  }
  .global-word {
    width: 125px;
    height: auto;
  }
  .games-word {
    font-size: 46px;
  }
  .service-grid {
    position: relative;
    display: grid;
    inset: auto;
  }
  .service-intro,
  .service-item {
    position: relative;
    inset: auto;
    width: auto;
    height: auto;
  }
  .service-intro p {
    width: auto;
    font-size: 14px;
  }
  .service-item h3,
  .service-item p {
    position: static;
    width: auto;
    margin-top: 17px;
  }
  .service-item:nth-child(2) p {
    width: auto;
  }
  .service-icon {
    width: 44px;
    height: 44px;
    margin-bottom: 30px;
  }
  .service-icon img {
    width: 44px;
  }
  .service-icon .service-icon-3 {
    width: 35px !important;
  }
  .service-icon .service-icon-4 {
    width: 33px !important;
  }
  .service-item::after {
    display: none;
  }
  .partner-portraits img {
    width: 42px;
    height: 42px;
    margin-right: -9px;
  }
  .partner-portraits {
    width: 178px;
    height: 40px;
  }
  .partner-portraits img:nth-child(1) {
    left: -1px;
  }
  .partner-portraits img:nth-child(2) {
    left: 33px;
  }
  .partner-portraits img:nth-child(3) {
    left: 67px;
  }
  .partner-portraits img:nth-child(4) {
    left: 101px;
  }
  .partner-portraits img:nth-child(5) {
    left: 135px;
  }
  .partner-stars {
    width: 122px;
    height: auto;
  }
}

.mission-first {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  transform-origin: left center;
}
.mission > .games-word {
  position: absolute;
  left: calc(774 * var(--du));
  top: calc(-19 * var(--du));
  width: calc(194 * var(--du));
}
.mission-second {
  position: absolute;
  top: calc(70 * var(--du));
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(20 * var(--du));
}
@media (max-width: 1023px) {
  .work-section {
    height: auto;
    min-height: 620px;
    padding: 445px 0 80px;
  }
  .mission {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    margin: 0 auto;
  }
  .services-panel > h2 {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    z-index: 1;
    font-size: clamp(24px, 6vw, 38px);
  }
  .mission-first,
  .mission > .games-word,
  .mission-second {
    position: static;
    width: auto;
  }
  .mission-first {
    display: block;
    white-space: normal;
    transform: none !important;
  }
  .mission-second {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .mission > .games-word {
    position: relative;
    left: auto;
    top: auto;
    display: inline-block;
    margin: 6px 0;
  }
  .service-item h3 {
    white-space: normal;
  }
}
</style>
