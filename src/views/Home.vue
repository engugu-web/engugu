<template>
  <Header />
  <main class="home-page">
    <section class="hero shell">
      <p>Guarantee Creativity To Reality</p>
      <h1>ORANGE 测试<br />MEDIA</h1>
      <h2>
        No game is too hard to market, make the<br class="desktop-break" />
        game marketing easy.
      </h2>
      <a class="start-button" href="#contact"
        >GO START <span aria-hidden="true">→</span></a
      >
    </section>
    <section id="our-work" class="work-section" aria-label="Our work">
      <div class="orbit" aria-hidden="true"></div>
      <div class="game-wall">
        <img
          v-for="(url, i) in games"
          :key="url"
          :src="url"
          :alt="`Game campaign ${i + 1}`"
          loading="lazy"
          decoding="async"
          width="384"
          height="384"
        />
      </div>
      <h2 class="mission">
        FOUNDED TO HELP CHINESE <span class="games-word">GAMES</span><br />REACH
        <span class="global-word">GLOBAL</span> AUDIENCES.
      </h2>
    </section>
    <section id="our-services-row" class="services-panel shell">
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
          v-for="service in services"
          :key="service.id"
          :to="`/services#${service.id}`"
          class="service-item"
          ><svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
              d="M7 5h14l4 4v17H7zM20 5v6h5M11 14h9M11 18h9M11 22h5"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="m21 25 7-7 2 2-7 7-3 1z" fill="currentColor" />
          </svg>
          <h3>{{ service.title }}</h3>
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
        <div :class="['stat-art', `stat-art-${i}`]" aria-hidden="true">
          <span v-for="n in 12" :key="n" :style="{ '--i': n }"></span
          ><b>{{ i === 0 ? "◎" : i === 1 ? "✦" : "◉" }}</b>
        </div>
      </article>
    </section>
    <section class="partner-section shell">
      <div class="partner-rating">
        <span class="partner-emblem" aria-hidden="true">✺</span
        ><span aria-label="Five stars">★★★★★</span>
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
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import OurClients from "../components/OurClinets.vue";
import { services } from "../data/services";
const assets = import.meta.glob("../assets/image/caseStudiesImg/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const games = Object.entries(assets)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url)
  .reverse();
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
  background: white;
  font: 500 calc(24 * var(--du))/1 var(--font-display);
}
.start-button:hover {
  box-shadow: 0 5px 20px #f1542d30;
}
.work-section {
  position: absolute;
  top: calc(653 * var(--du));
  left: 0;
  width: 100%;
  height: calc(1191 * var(--du));
  overflow: hidden;
  isolation: isolate;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 12%,
    black 95%,
    transparent
  );
}
.orbit {
  position: absolute;
  width: calc(2304 * var(--du));
  height: calc(590 * var(--du));
  left: 44%;
  top: calc(110 * var(--du));
  transform: translateX(-50%) rotate(-22deg);
  border: calc(90 * var(--du)) solid white;
  border-radius: 50%;
  background: linear-gradient(
    115deg,
    #91bfc0,
    #f29c6d 30%,
    #ed6848 65%,
    #ba81ab
  );
  box-shadow: 0 0 calc(90 * var(--du)) calc(30 * var(--du)) #e9b8b887;
  z-index: -1;
}
.game-wall {
  position: absolute;
  top: calc(246 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: calc(16 * var(--du));
  width: calc(1040 * var(--du));
  mask-image: linear-gradient(
    110deg,
    transparent,
    #000 15%,
    #000 83%,
    transparent
  );
}
.game-wall img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: calc(16 * var(--du));
  transition: transform 0.25s;
}
.game-wall img:hover {
  transform: translateY(-6px);
}
.mission {
  white-space: nowrap;
  position: absolute;
  top: calc(807 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  width: calc(970 * var(--du));
  height: calc(140 * var(--du));
  text-align: center;
  font: 500 calc(58 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
}
.games-word {
  background: linear-gradient(90deg, #ed84b7, #86b7bb, #f29535);
  color: transparent;
  background-clip: text;
}
.global-word {
  color: #e66c2a;
  text-shadow:
    1px 3px #a72c12,
    2px 5px #80231a;
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
  transition: opacity 0.2s;
}
.service-item:hover {
  opacity: 0.75;
}
.service-item svg {
  display: block;
  width: calc(44 * var(--du));
  height: calc(44 * var(--du));
  margin-bottom: calc(44 * var(--du));
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
.stat-art {
  position: absolute;
  bottom: calc(-35 * var(--du));
  left: 15%;
  width: 70%;
  height: calc(170 * var(--du));
  opacity: 0.7;
}
.stat-art b {
  display: block;
  text-align: center;
  font-size: calc(125 * var(--du));
  font-weight: 300;
  color: #ccc;
}
.stat-art span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 110%;
  height: calc(70 * var(--du));
  border: 1px dotted #bbb;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(calc(var(--i) * 15deg));
}
.stat-art-0 span {
  height: calc(140 * var(--du));
  width: calc(140 * var(--du));
  transform: translate(-50%, -50%) rotateX(55deg) rotate(calc(var(--i) * 15deg));
}
.stat-art-1 {
  width: 95%;
  left: 2.5%;
  height: calc(150 * var(--du));
  bottom: calc(-50 * var(--du));
}
.stat-art-1 span {
  height: calc(100 * var(--du));
  transform: translate(-50%, -50%) rotate(calc(var(--i) * 8deg));
}
.stat-art-2 span {
  width: calc(135 * var(--du));
  height: calc(135 * var(--du));
  transform: translate(-50%, -50%) rotateY(calc(var(--i) * 15deg));
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
.partner-rating > span {
  color: #f5cc56;
  letter-spacing: calc(4 * var(--du));
  font-size: calc(32 * var(--du));
}
.partner-rating .partner-emblem {
  font-size: calc(52 * var(--du));
  color: #ec6936;
}
.partner-section .section-title {
  white-space: nowrap;
  font: 500 calc(58 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
}
.partner-section > p {
  margin-top: calc(30 * var(--du));
  color: #777;
  font: 400 calc(14 * var(--du))/2.2 var(--font-body);
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
  .orbit {
    top: 120px;
    width: 140%;
    height: 320px;
    border-width: 40px;
  }
  .game-wall {
    top: 160px;
    width: 78%;
    gap: 8px;
  }
  .game-wall img {
    border-radius: 8px;
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
  .service-item svg {
    width: 36px;
    height: 36px;
    margin-bottom: 24px;
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
  .stat-art {
    width: 60%;
    left: 35%;
    height: 150px;
    bottom: -30px;
  }
  .stat-art b {
    font-size: 125px;
  }
  .stat-art span {
    width: 140px;
    height: 100px;
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
  .partner-rating > span {
    font-size: 26px;
    letter-spacing: 4px;
  }
  .partner-rating .partner-emblem {
    font-size: 40px;
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
  .orbit {
    top: 90px;
    height: 230px;
    border-width: 28px;
  }
  .game-wall {
    top: 135px;
    width: 84%;
    gap: 4px;
  }
  .game-wall img {
    border-radius: 5px;
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
</style>
