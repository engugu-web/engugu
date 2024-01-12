<template>
  <div class="footer">
    <div class="top-panel">
      <div class="line-box"></div>
      <span class="contact" @click="Contact">LET'S TALK</span>
    </div>
    <div class="main-panel">
      <div class="main-content" :style="{ width: 1200 + 'px' }">
        <div class="orangeglobal">
          <el-image style="width: 80px; height: 50px" :src="url" />
          <span
            >Orangeglobal<br />
            Media</span
          >
        </div>
        <ul class="item-box">
          <li class="item">
            <div class="title">MENU</div>
            <div>
              <a href="services">Services</a>
              <a href="/#about-row">About</a>
              <a href="/#our-services-row">Our Work</a>
              <a href="###" @click="Contact">Contact</a>
            </div>
          </li>
          <li class="item">
            <div class="title">SERVICES</div>
            <div>
              <a href="services#gaming-row">Marketing full case output</a>
              <a href="services#creative-row">Material output production</a>
              <a href="services#influencer-row"
                >Internet celebrity cooperationc</a
              >
              <a href="services#community-row">Community operations</a>
              <a href="services#localized-row">Localized PR services</a>
              <a href="services#celebrity-row"
                >Celebrity endorsement/overseas shooting</a
              >
            </div>
          </li>
          <li class="item">
            <div class="title">CONTACT</div>
            <div>
              <a href="###" @click="Contact">Contact Form</a>
              <a href="###">fanta@orangeglobalmedia.agency</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Dialog :dialogVisible="dialogVisible" @close="close" />
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Dialog from "../components/Dialog.vue";
import img from "../assets/image/logo.png";
const { proxy } = getCurrentInstance();
const dialogVisible = ref(false);
const url = img;
function Contact() {
  dialogVisible.value = true;
}
const close = () => {
  dialogVisible.value = false;
};
</script>
<style lang="scss" scoped>
.footer {
  background-color: #000;
  .top-panel {
    position: relative;
    width: 100%;
    height: 460px;
    background-image: url("../assets/image/metaverse-concept-collage-design.png");
    background-position: center;
    background-size: cover;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .line-box {
      position: absolute;
      width: 365px;
      height: 177px;
      background-image: url("../assets/image/talkLine.png");
      background-size: cover;
      right: 0;
      top: 0;
      z-index: 1;
    }
    .contact {
      display: inline-block;
      line-height: 0.8;
      font-size: 166px;
      color: #00ffce;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      border-bottom: 10px solid transparent;
    }
    .contact::after,
    .contact::before {
      content: "LET'S TALK";
      position: absolute;
      font-size: 166px;
      font-family: Montserrat, Montserrat;
      font-weight: bold;
      color: rgba(0, 255, 206, 0);
      line-height: 203px;
      -webkit-text-stroke: 1px rgba(0, 255, 206, 0.1);
      text-stroke: 1px rgba(0, 255, 206, 0.1);
    }
    .contact::after {
      top: 50px;
      left: 20%;
    }
    .contact::before {
      bottom: 50px;
    }
    .contact:hover {
      border-bottom: 10px solid #0d00ff;
    }
  }
  .main-panel {
    margin-top: 10px;
    .orangeglobal {
      display: flex;
      align-items: center;
      margin-bottom: 60px;
      color: #fff;
      span {
        margin-left: 8px;
      }
    }
    .main-content {
      margin: 0 auto;
      padding: 60px 0 40px 0;
      .item-box {
        display: flex;
        padding: 0;
      }
      .item {
        text-align: left;
        width: 400px;
        .title {
          font-size: 18px;
          margin-bottom: 25px;
          color: #fff;
        }
        a {
          font-size: 14px;
          display: block;
          text-decoration: none;
          color: #fff;
          margin: 10px 0;
        }
        a:hover {
          text-decoration: underline;
          text-decoration-color: #00ffce;
        }
      }
    }
  }
}
</style>
