<template>
  <Header />
  <main class="services-page shell">
    <div class="services-heading">
      <p class="eyebrow accent">Local insights. Global impact.</p>
      <h1>OUR SERVICES</h1>
      <p>
        End-to-end marketing solutions.<br />Built for games. Connected to the
        world.
      </p>
    </div>
    <div class="service-list">
      <article
        v-for="(service, i) in services"
        :key="service.id"
        :id="service.id"
      >
        <div>
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
              d="M6 5h15l4 4v17H6zM20 5v6h5M11 15h9M11 20h7"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <h2>{{ service.title }}</h2>
          <p>{{ service.text }}</p>
          <a class="text-link" href="#contact">Let's talk</a>
        </div>
        <img
          :src="serviceImages[i % serviceImages.length].src"
          :srcset="serviceImages[i % serviceImages.length].srcset"
          sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1280px) calc((100vw - 160px) / 2), 560px"
          decoding="async"
          :alt="service.title"
          loading="lazy"
        />
      </article>
    </div>
  </main>
  <Footer />
</template>
<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { services } from "../data/services";
import { serviceImages } from "../data/serviceImages";
</script>
<style scoped>
.services-heading {
  text-align: center;
  padding: 90px 0 100px;
}
.services-heading h1 {
  font-size: clamp(42px, 7vw, 96px);
  letter-spacing: -0.06em;
  margin: 24px 0;
}
.services-heading > p:last-child {
  color: var(--text-muted);
  line-height: 1.7;
}
.service-list {
  padding-bottom: 120px;
}
.service-list article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 80px;
  padding: 60px 0;
  border-top: 1px solid #ddd;
}
.service-list article:nth-child(even) > div {
  order: 2;
}
.service-list h2 {
  font-size: clamp(25px, 3vw, 40px);
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin: 15px 0 20px;
  text-transform: uppercase;
}
.service-list p {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 28px;
  max-width: 470px;
}
.service-list svg {
  width: 36px;
  height: 36px;
  color: var(--orange);
}
.service-list img {
  width: 100%;
  aspect-ratio: 1.55;
  object-fit: cover;
  border-radius: 18px;
}
@media (max-width: 700px) {
  .services-heading {
    padding: 50px 0 60px;
  }
  .service-list article {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 40px 0;
  }
  .service-list article:nth-child(even) > div {
    order: 0;
  }
  .service-list {
    padding-bottom: 60px;
  }
}
</style>
