<template>
  <footer id="contact" class="site-footer" :class="{ 'is-near-email': nearEmail }" @pointermove="trackEmailPointer" @pointerleave="nearEmail = false" @click="copyNearbyEmail">
    <svg class="glass-filter-defs" aria-hidden="true" width="0" height="0">
      <defs>
        <filter id="footer-liquid-refraction" x="-10%" y="-30%" width="120%" height="160%" color-interpolation-filters="sRGB">
          <feImage :href="refractionMap" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="edgeRefraction" />
          <feDisplacementMap in="SourceGraphic" in2="edgeRefraction" :scale="refractionScale" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
    <a class="back-top" href="#app">TOP</a>
    <div class="footer-orbit" aria-hidden="true">
      <img :src="a.img13X4" alt="" />
    </div>
    <div class="contact-content">
      <h2>
        <span>Let's talk!</span
        ><span class="footer-sticker" aria-hidden="true"
          ><img :src="a.imgStar1" alt="" /><img :src="a.imgGroup1" alt=""
        /></span>
      </h2>
      <p>
        If you'd like to learn more or explore collaboration opportunities,
        please feel free to reach out to us via the following email addresses.
      </p>
      <button
        ref="emailButton"
        class="email-link"
        type="button"
        aria-label="Copy fanta@orangeglobalmedia.agency"
        @click.stop="copyEmail"
        @focus="focusEmail"
        @blur="keyboardHint = false"
        aria-describedby="footer-copy-hint"
      >
        <img
          class="email-glass"
          :src="emailGlass"
          alt=""
        />
        <svg class="paper-refraction" viewBox="0 0 47 22" aria-hidden="true">
          <path d="M0 0H43C43 5 47 12 45 20C33 20 13 16 0 13Z" fill="#f0f0f0" />
        </svg>
        <span class="email-address">fanta@orangeglobalmedia.agency</span>
      </button>
      <Teleport to="body">
        <span
          v-show="nearEmail || keyboardHint || copyStatus"
          id="footer-copy-hint"
          class="copy-hint"
          :class="{ 'has-feedback': copyStatus }"
          :style="{ left: hintPosition.x + 'px', top: hintPosition.y + 'px', maxWidth: `min(280px, calc(100vw - ${hintPosition.x + 8}px))` }"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          >{{ copyStatus || "Click to copy" }}</span
        >
      </Teleport>
      <span class="contact-sticker" aria-hidden="true">Contact us!</span>
    </div>
    <nav class="footer-nav shell" aria-label="Footer navigation">
      <router-link to="/services">Services</router-link
      ><router-link to="/#about-row">About</router-link
      ><router-link to="/#our-work">Our Work</router-link
      ><button type="button" @click="dialogVisible = true">Contact</button>
    </nav>
    <Dialog :dialog-visible="dialogVisible" @close="dialogVisible = false" />
  </footer>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { figmaAssets as a } from "../data/figmaAssets";
import emailGlass from "../assets/figma/email-glass-smooth.svg";
import refractionMap from "../assets/figma/email-refraction-map.svg";
import Dialog from "./Dialog.vue";
const dialogVisible = ref(false);
const copyStatus = ref("");
const emailButton = ref(null);
const nearEmail = ref(false);
const keyboardHint = ref(false);
const hintPosition = ref({ x: 0, y: 0 });
const refractionScale = ref(14);
let glassResize;
function positionHint(x, y) {
  hintPosition.value = {
    x: Math.max(8, Math.min(x + 16, window.innerWidth - 104)),
    y: Math.max(8, Math.min(y + 18, window.innerHeight - 44)),
  };
}
function isWithinEmailHalo(event) {
  if (!emailButton.value) return false;
  const rect = emailButton.value.getBoundingClientRect();
  // Measure the 32 CSS-pixel halo in the bubble's rotated coordinate system.
  const angle = -3.32 * Math.PI / 180;
  const dx = event.clientX - (rect.left + rect.width / 2);
  const dy = event.clientY - (rect.top + rect.height / 2);
  const x = dx * Math.cos(angle) + dy * Math.sin(angle);
  const y = -dx * Math.sin(angle) + dy * Math.cos(angle);
  const distance = Math.hypot(
    Math.max(0, Math.abs(x) - emailButton.value.offsetWidth / 2),
    Math.max(0, Math.abs(y) - emailButton.value.offsetHeight / 2),
  );
  return distance <= 32;
}
function trackEmailPointer(event) {
  if (event.pointerType === "touch") return;
  nearEmail.value = isWithinEmailHalo(event);
  if (nearEmail.value) positionHint(event.clientX, event.clientY);
}
function copyNearbyEmail(event) {
  // Preserve navigation and other controls that happen to overlap the halo.
  if (event.target.closest('a, button') || !isWithinEmailHalo(event)) return;
  positionHint(event.clientX, event.clientY);
  copyEmail();
}
function focusEmail() {
  if (nearEmail.value) return;
  keyboardHint.value = true;
  const rect = emailButton.value.getBoundingClientRect();
  positionHint(rect.left + rect.width / 2, rect.bottom);
}
function clearPointerHint() { nearEmail.value = false; keyboardHint.value = false; }
let copyTimer;
async function copyEmail() {
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText("fanta@orangeglobalmedia.agency");
    copyStatus.value = "Email copied!";
  } catch {
    copyStatus.value =
      "Unable to copy. Please select and copy the email address.";
  }
  copyTimer = setTimeout(() => {
    copyStatus.value = "";
  }, 3500);
}
onMounted(() => {
  glassResize = new ResizeObserver(() => {
    // Keep the paper-corner refraction proportional to the Figma canvas.
    refractionScale.value = 14 * emailButton.value.offsetWidth / 550.311;
  });
  glassResize.observe(emailButton.value);
  window.addEventListener("scroll", clearPointerHint, { passive: true });
  window.addEventListener("resize", clearPointerHint);
});
onBeforeUnmount(() => {
  clearTimeout(copyTimer);
  glassResize?.disconnect();
  window.removeEventListener("scroll", clearPointerHint);
  window.removeEventListener("resize", clearPointerHint);
});
</script>
<style scoped>
.site-footer {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
  max-width: 1920px;
  height: calc(1080 * var(--du));
  margin-inline: auto;
  background: #000;
  color: white;
  text-align: center;
}
.site-footer.is-near-email { cursor: pointer; }
.back-top {
  position: absolute;
  top: calc(42 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  font: 400 calc(14 * var(--du))/1.2 var(--font-display);
}
.footer-orbit {
  clip-path: inset(-50% -50% 45% -50%);
  position: absolute;
  z-index: -1;
  width: 125%;
  height: calc(400 * var(--du));
  left: -10%;
  top: calc(100 * var(--du));
  border: calc(80 * var(--du)) solid #e95100;
  border-radius: 50%;
  transform: rotate(-23deg);
  filter: blur(calc(38 * var(--du)));
  opacity: 0.72;
  box-shadow:
    0 0 40px #f60,
    inset 0 0 55px #f50;
}
.contact-content h2 {
  position: absolute;
  top: calc(357.59 * var(--du));
  left: calc(727 * var(--du));
  width: calc(466 * var(--du));
  height: calc(122 * var(--du));
  font: 500 calc(102 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
  white-space: nowrap;
}
.contact-content h2 img {
  position: absolute;
  left: calc(100% + 10 * var(--du));
  top: calc(-15 * var(--du));
  width: calc(80 * var(--du));
  height: calc(80 * var(--du));
  border-radius: 50%;
  object-fit: cover;
  transform: rotate(-18deg);
}
.contact-content p {
  position: absolute;
  top: calc(494.18 * var(--du));
  left: calc(576 * var(--du));
  width: calc(768 * var(--du));
  height: calc(38 * var(--du));
  font: 400 calc(16 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
}
.email-link {
  color: inherit;
  backdrop-filter: blur(18px) saturate(1.5);
  box-shadow:
    inset 0 1px 0 #ffffff70,
    0 8px 28px #00000050;
  position: absolute;
  top: calc(598 * var(--du));
  left: 50%;
  transform: translateX(-50%) rotate(-3.32deg);
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(560 * var(--du));
  height: calc(64 * var(--du));
  padding-left: calc(53 * var(--du));
  border: 1px solid #777;
  border-radius: calc(6 * var(--du));
  background: #ffffff17;
  font: 500 calc(28 * var(--du))/1.2 var(--font-display);
  letter-spacing: 0;
  white-space: nowrap;
}
.email-link:hover {
  background: #ffffff30;
}
.email-link:active {
  scale: 0.95;
}
.copy-hint {
  position: fixed;
  display: grid;
  place-items: center;
  width: max-content;
  min-width: 80px;
  max-width: min(280px, 80vw);
  min-height: 28px;
  padding: 6px 10px;
  border: 1px solid #ffffff66;
  border-radius: 14px;
  background: linear-gradient(120deg, #ff5526b3, #ff966780);
  backdrop-filter: blur(2px) saturate(1.5);
  box-shadow: 0 4px 7.4px rgb(0 0 0 / 9%), inset 0 1px 1px #ffffff70;
  color: #492116;
  font: 500 10px/1.2 var(--font-body);
  white-space: normal;
  pointer-events: none;
  z-index: 1000;
}
.copy-hint.has-feedback {
  border: 0;
  border-radius: 0;
  background: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: none;
  color: #ffd2bb;
}
.footer-nav {
  position: absolute;
  top: calc(960 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font: 400 calc(14 * var(--du))/1.2 var(--font-display);
}
.footer-nav button {
  color: inherit;
  font: inherit;
  border: 0;
  background: none;
  padding: 0;
}
@media (max-width: 1023px) {
  .site-footer {
    height: auto;
    min-height: 640px;
    padding: 30px 20px 48px;
  }
  .back-top {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    font-size: 12px;
  }
  .contact-content {
    padding: 150px 0 135px;
  }
  .contact-content h2 {
    position: relative;
    top: auto;
    left: auto;
    width: fit-content;
    height: auto;
    margin: 0 auto;
    font-size: 64px;
  }
  .contact-content h2 img {
    top: -12px;
    left: calc(100% + 8px);
    width: 48px;
    height: 48px;
  }
  .contact-content p {
    position: static;
    width: min(100%, 600px);
    height: auto;
    margin: 25px auto 32px;
    font-size: 15px;
    line-height: 1.4;
  }
  .email-link {
    position: relative;
    top: auto;
    left: auto;
    transform: rotate(-3.32deg);
    width: fit-content;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 12px 20px;
    font-size: 20px;
    border-radius: 6px;
    white-space: normal;
    overflow-wrap: anywhere;
  }
  .footer-orbit {
    top: 110px;
    height: 270px;
    border-width: 55px;
    filter: blur(26px);
  }
  .footer-nav {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    width: 100%;
    font-size: 14px;
    justify-content: space-evenly;
  }
}
@media (max-width: 500px) {
  .site-footer {
    min-height: 560px;
  }
  .contact-content {
    padding: 120px 0 110px;
  }
  .contact-content h2 {
    font-size: 48px;
  }
  .contact-content h2 img {
    width: 36px;
    height: 36px;
  }
  .email-link {
    font-size: 16px;
  }
  .footer-orbit {
    height: 190px;
    border-width: 35px;
  }
}
/* Source artwork and exact layer slots: Figma 157:167. */
.footer-orbit {
  left: 0;
  top: 0;
  width: 100%;
  height: calc(930 * var(--du));
  border: 0;
  border-radius: 0;
  transform: none;
  filter: none;
  opacity: 1;
  box-shadow: none;
  clip-path: none;
  mask-image: url("../assets/figma/8d917.svg");
  mask-size: 100% 100%;
}
.footer-orbit img {
  position: absolute;
  left: calc(187 * var(--du));
  top: calc(-147 * var(--du));
  width: calc(1872 * var(--du));
  height: calc(791 * var(--du));
  max-width: none;
  object-fit: fill;
  filter: blur(calc(67.3 * var(--du)));
}
.footer-sticker {
  position: absolute;
  left: calc(100% + 10 * var(--du));
  top: calc(-27 * var(--du));
  width: calc(100 * var(--du));
  height: calc(100 * var(--du));
}
.contact-content h2 .footer-sticker img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: auto;
  transform: none;
  border-radius: 0;
}
.contact-content h2 .footer-sticker img:nth-child(2) {
  left: 13%;
  top: 23%;
  width: 74%;
}
.email-link {
  left: calc(50% + 27.08 * var(--du));
  top: calc(600 * var(--du));
  width: calc(550.311 * var(--du));
  height: calc(85.999 * var(--du));
  padding: 0;
  border: 0;
  box-shadow: none;
  background: transparent;
  backdrop-filter: none;
  z-index: 3;
}
.email-link:hover {
  background: transparent;
}
.email-glass {
  position: absolute;
  left: calc(-7.9 * var(--du));
  top: calc(-4.4 * var(--du));
  width: calc(566.111 * var(--du));
  height: calc(102.299 * var(--du));
  max-width: none;
  z-index: -1;
}
.email-link::before {
  content: "";
  position: absolute;
  left: calc(-7.9 * var(--du));
  top: calc(-4.4 * var(--du));
  width: calc(566.111 * var(--du));
  height: calc(102.299 * var(--du));
  mask-image: url("../assets/figma/email-glass-mask.svg");
  mask-size: 100% 100%;
  -webkit-backdrop-filter: blur(4px) saturate(1.4);
  backdrop-filter: url("#footer-liquid-refraction") blur(calc(0.7 * var(--du))) saturate(1.15);
  pointer-events: none;
  z-index: -2;
}
.glass-filter-defs { position: absolute; pointer-events: none; }
.email-address { position: relative; z-index: 1; }
/* The paper corner bends through the glass rim, beneath its tint and stroke. */
.paper-refraction {
  position: absolute;
  left: calc(32 * var(--du));
  top: calc(8 * var(--du));
  width: calc(49 * var(--du));
  height: calc(14 * var(--du));
  transform: rotate(11.85deg);
  transform-origin: 0 0;
  filter: blur(calc(0.8 * var(--du)));
  pointer-events: none;
  z-index: -1;
}
.email-glass { z-index: 0; pointer-events: none; }
.contact-sticker {
  position: absolute;
  left: calc(656 * var(--du));
  /* Reference image 2: tuck the paper's lower-right corner behind the glass. */
  top: calc(600.33 * var(--du));
  width: calc(134 * var(--du));
  height: calc(36 * var(--du));
  font:
    400 calc(26 * var(--du))/1.2 "Micro 5",
    monospace;
  background: #f0f0f0;
  border: 1px solid #000;
  color: #000;
  transform: rotate(8.53deg);
  z-index: 2;
}
.footer-nav {
  width: calc(1000 * var(--du));
  gap: 0;
  justify-content: space-between;
  top: calc(970.59 * var(--du));
  font-size: calc(20 * var(--du));
}
@media (max-width: 1023px) {
  .footer-orbit {
    height: 520px;
  }
  .footer-orbit img {
    left: 0;
    top: 0;
    width: 115%;
    height: 400px;
    filter: blur(30px);
  }
  .footer-sticker {
    width: 56px;
    height: 56px;
    top: -18px;
    left: calc(100% + 8px);
  }
  .email-link {
    left: auto;
    top: auto;
    width: fit-content;
    max-width: 100%;
    height: auto;
    padding: 18px 10px;
    background: #ffffff17;
    border: 1px solid #ffffff70;
    backdrop-filter: blur(18px);
  }
  .email-glass {
    display: none;
  }
  .paper-refraction { display: none; }
  .email-link::before { display: none; }
  .contact-sticker {
    display: none;
  }
  .footer-nav {
    width: 100%;
    top: auto;
    justify-content: space-evenly;
    font-size: 14px;
  }
}
</style>
