<template>
  <header class="site-header">
    <div class="shell header-inner">
      <router-link to="/" class="brand" aria-label="Orange Global Media home"
        ><img class="wordmark" :src="a.imgGroup" alt="ORANGE" /></router-link
      ><button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="main-nav"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? "Close" : "Menu" }}
      </button>
      <nav
        id="main-nav"
        :class="{ open: menuOpen }"
        aria-label="Main navigation"
        @click="menuOpen = false"
      >
        <router-link to="/services">Services</router-link
        ><router-link to="/#about-row">About</router-link
        ><router-link to="/#our-work">Our Work</router-link
        ><a class="nav-contact" href="#contact">Contact</a>
      </nav>
    </div>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { figmaAssets as a } from "../data/figmaAssets";
const menuOpen = ref(false);
</script>
<style scoped>
.site-header {
  position: relative;
  z-index: 20;
  width: 100%;
  max-width: 1920px;
  height: calc(101 * var(--du));
  margin-inline: auto;
  background: white;
}
.header-inner {
  position: relative;
  width: calc(1700 * var(--du));
  height: 100%;
}
.brand {
  position: absolute;
  top: calc(38 * var(--du));
  left: 0;
  display: inline-flex;
  align-items: center;
  height: calc(25 * var(--du));
}
.wordmark {
  width: calc(146 * var(--du));
  height: calc(26 * var(--du));
  font: 600 calc(28 * var(--du))/1 var(--font-display);
  letter-spacing: calc(3 * var(--du));
}
.wordmark span {
  color: var(--orange);
}
.header-inner nav {
  position: absolute;
  top: calc(38 * var(--du));
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(574 * var(--du));
  height: calc(25 * var(--du));
  font: 400 calc(18 * var(--du))/1 var(--font-display);
  letter-spacing: 0;
}
.header-inner nav a:hover {
  color: var(--orange);
}
.menu-toggle {
  display: none;
}
@media (max-width: 1023px) {
  .site-header {
    height: 80px;
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 40px);
  }
  .brand {
    position: static;
    height: auto;
  }
  .wordmark {
    width: 125px;
    height: auto;
    font-size: 23px;
    letter-spacing: 3px;
  }
  .menu-toggle {
    display: block;
    background: none;
    border: 1px solid #ddd;
    border-radius: 24px;
    padding: 9px 16px;
  }
  .header-inner nav {
    display: none;
    position: absolute;
    top: 80px;
    left: -20px;
    right: -20px;
    width: auto;
    height: auto;
    transform: none;
    background: white;
    padding: 24px;
    box-shadow: 0 14px 25px #0000000d;
    gap: 16px;
    flex-direction: column;
    font-size: 16px;
    line-height: 1.2;
  }
  .header-inner nav.open {
    display: flex;
  }
}
</style>
