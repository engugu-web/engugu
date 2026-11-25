<template>
  <footer id="contact" class="site-footer" :class="{ 'is-near-email': nearEmail }" @pointermove="trackEmailPointer" @pointerleave="nearEmail = false" @click="copyNearbyEmail">
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
      <div class="email-artwork-wrap">
        <img class="email-artwork" :src="emailArtwork" alt="" aria-hidden="true" />
        <button
        ref="emailButton"
        class="email-link"
        type="button"
        aria-label="Copy fanta@orangeglobalmedia.agency"
        @click.stop="copyEmail"
        @focus="focusEmail"
        @blur="keyboardHint = false"
        aria-describedby="footer-copy-hint"
        />
      </div>
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
import emailArtwork from "../assets/image/email.png";
import Dialog from "./Dialog.vue";
const dialogVisible = ref(false);
const copyStatus = ref("");
const emailButton = ref(null);
const nearEmail = ref(false);
const keyboardHint = ref(false);
const hintPosition = ref({ x: 0, y: 0 });
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
  window.addEventListener("scroll", clearPointerHint, { passive: true });
  window.addEventListener("resize", clearPointerHint);
});
onBeforeUnmount(() => {
  clearTimeout(copyTimer);
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
  position: absolute;
  z-index: -1;
  inset: 0;
  width: 100%;
  height: calc(930 * var(--du));
  pointer-events: none;
  mask: url("../assets/figma/8d917.svg") center / 100% 100%;
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
.contact-content h2 {
  position: absolute;
  top: calc(357.59 * var(--du));
  left: calc(727 * var(--du));
  width: calc(466 * var(--du));
  height: calc(122 * var(--du));
  font: 500 calc(102 * var(--du))/1.2 var(--font-display);
  white-space: nowrap;
}
.contact-content p {
  position: absolute;
  top: calc(494.18 * var(--du));
  left: calc(576 * var(--du));
  width: calc(768 * var(--du));
  height: calc(38 * var(--du));
  font: 400 calc(16 * var(--du))/1.2 var(--font-display);
}
.footer-sticker {
  position: absolute;
  left: calc(100% + 10 * var(--du));
  top: calc(-27 * var(--du));
  width: calc(100 * var(--du));
  height: calc(100 * var(--du));
}
.footer-sticker img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: auto;
}
.footer-sticker img:nth-child(2) {
  left: 13%;
  top: 23%;
  width: 74%;
}
.email-artwork-wrap {
  --email-unit: var(--du);
  position: absolute;
  left: calc(50% - 321.5 * var(--email-unit));
  top: calc(579.3 * var(--du));
  width: calc(640 * var(--email-unit));
  height: calc(140 * var(--email-unit));
  z-index: 3;
}
.email-artwork {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}
/* The supplied PNG includes its rotation, lettering, sticker and glass.
   Only this transparent hit target rotates; the artwork is never rotated twice. */
.email-link {
  position: absolute;
  left: 54.465625%;
  top: 14.785714%;
  width: 85.986094%;
  height: 61.427857%;
  transform: translateX(-50%) rotate(-3.32deg);
  padding: 0;
  border: 0;
  border-radius: 2.18% / 13.95%;
  background: transparent;
  color: inherit;
  cursor: inherit;
}
.email-artwork-wrap:has(.email-link:active) .email-artwork { scale: .95; }
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
  box-shadow: none;
  color: #ffd2bb;
}
.footer-nav {
  position: absolute;
  top: calc(970.59 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  width: calc(1000 * var(--du));
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: 400 calc(20 * var(--du))/1.2 var(--font-display);
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
  .contact-content { padding: 150px 0 135px; }
  .contact-content h2 {
    position: relative;
    top: auto;
    left: auto;
    width: fit-content;
    height: auto;
    margin: 0 auto;
    font-size: 64px;
  }
  .contact-content p {
    position: static;
    width: min(100%, 600px);
    height: auto;
    margin: 25px auto 32px;
    font-size: 15px;
    line-height: 1.4;
  }
  .footer-sticker {
    width: 56px;
    height: 56px;
    top: -18px;
    left: calc(100% + 8px);
  }
  .email-artwork-wrap {
    position: relative;
    left: auto;
    top: auto;
    width: min(640px, 100%);
    height: auto;
    aspect-ratio: 32 / 7;
    margin: 0 auto;
  }
  .footer-orbit { height: 520px; }
  .footer-orbit img {
    left: 0;
    top: 0;
    width: 115%;
    height: 400px;
    filter: blur(30px);
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
  .site-footer { min-height: 560px; }
  .contact-content { padding: 120px 0 110px; }
  .contact-content h2 { font-size: 48px; }
}
</style>
