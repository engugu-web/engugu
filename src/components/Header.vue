<template>
  <div>
    <div class="header">
      <div
        class="header-content"
        :style="{ width: proxy.globalInfo.bodyWidth + 'px' }"
      >
        <!-- logo -->
        <router-link to="/" class="logo">
          <el-image style="width: 80px; height: 50px" :src="url" />
        </router-link>
        <div>
          <el-menu
            class="menu-panel"
            mode="horizontal"
            background-color="#000"
            text-color="#fff"
            active-text-color="#00FFCE"
            :ellipsis="false"
            popper-effect="light"
            menu-trigger="click"
            @select="handleSelect"
          >
            <el-menu-item class="menu-item" index="1">
              <a href="services">services</a>
            </el-menu-item>
            <el-menu-item class="menu-item" index="2">
              <a href="/#about-row">About</a>
            </el-menu-item>
            <el-menu-item class="menu-item" index="3"
              ><a href="/#our-services-row">Our Work</a></el-menu-item
            >
            <el-menu-item class="menu-item" index="4" @click="Contact"
              >Contact</el-menu-item
            >
          </el-menu>
        </div>
      </div>
    </div>
    <Dialog :dialogVisible="dialogVisible" @close="close" />
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import Dialog from "../components/Dialog.vue";
const { proxy } = getCurrentInstance();
import img from "../assets/image/logo.png";
const url = img;
const dialogVisible = ref(false);

function Contact() {
  dialogVisible.value = true;
}
const close = () => {
  dialogVisible.value = false;
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 1000;
  background: #000;
  top: 0px;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, #00ffce, black, #00ffce) 1;
  border-image-slice: 1; /* 可选：指定边框图像的切片 */
  border-image-width: 1; /* 可选：指定边框图像的宽度 */
  border-image-outset: 0; /* 可选：指定边框图像的偏移量 */
  .header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    height: 77px;

    .logo {
      font-size: 30px;
      text-decoration: none;
      margin-right: 150px;
      display: block;
    }
    .menu-panel {
      display: flex;
      align-items: center;
      .el-menu-item {
        font-size: 16px;
        font-family: Galvji;
      }
      .el-menu-item:hover {
        color: #00ffce;
      }
    }
    .el-menu--horizontal.el-menu {
      border-bottom: none;
      width: 1000px;
      display: flex;
      justify-content: space-around;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom: none;
    }
    .el-menu--horizontal > .el-menu-item {
      border-bottom: none;
    }
  }
}
</style>
