<template>
  <footer id="contact" class="site-footer">
    <a class="back-top" href="#app">TOP</a>
    <div class="footer-orbit" aria-hidden="true"></div>
    <div class="contact-content">
      <h2><span>Let's talk!</span> <img :src="logo" alt="" /></h2>
      <p>
        If you'd like to learn more or explore collaboration opportunities,
        please feel free to reach out to us via the following email addresses.
      </p>
      <a class="email-link" href="mailto:fanta@orangeglobalmedia.agency"
        >fanta@orangeglobalmedia.agency</a
      >
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
import { ref } from "vue";
import Dialog from "./Dialog.vue";
import logo from "../assets/image/logo.webp";
const dialogVisible = ref(false);
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
.footer-nav {
  position: absolute;
  top: calc(960 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  width: calc(1000 * var(--du));
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: 400 calc(14 * var(--du))/1.2 var(--font-display);
}
.footer-nav button {
  color: inherit;
  font: inherit;
  border: 0;
  background: none;
  padding: 0;
}
.footer-nav a:hover,
.footer-nav button:hover {
  color: #f77a4a;
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
</style>
