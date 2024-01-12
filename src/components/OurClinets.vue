<template>
  <div class="ourclients-content">
    <div style="text-align: center">
      <div class="title">
        <h3 class="title-text">OUR CLIENTS</h3>
        <div class="icon"></div>
      </div>
    </div>
    <div class="partner-content">
      <div class="bg"></div>
      <div class="oblong"></div>
      <div class="line"></div>
      <div class="partner-list">
        <div class="partner-first-line">
          <el-image
            style="width: 183px; height: 80px"
            :src="logoList.yoka.url"
          />
          <el-image
            style="width: 143px; height: 80px"
            :src="logoList.eworld.url"
          />
          <el-image
            style="width: 170px; height: 80px"
            :src="logoList.leiting.url"
          />
          <el-image
            style="width: 214px; height: 80px"
            :src="logoList.idreamSky.url"
            fit="scale-down"
          />
          <el-image
            style="width: 173px; height: 80px"
            :src="logoList.zhaoxi.url"
          />
        </div>
        <div class="partner-second-line">
          <el-image
            style="width: 155px; height: 80px"
            :src="logoList.zLonGame.url"
            fit="cover"
          />
          <el-image
            style="width: 179px; height: 80px"
            :src="logoList.thirdSevengame.url"
          />
          <el-image
            style="width: 172px; height: 80px"
            :src="logoList.funplus.url"
          />
          <el-image style="width: 89px; height: 80px" :src="logoList.igg.url" />
          <el-image
            style="width: 180px; height: 80px"
            :src="logoList.happyGame.url"
          />
        </div>
        <div class="partner-third-line">
          <el-image
            style="width: 165px; height: 80px"
            :src="logoList.qingCi.url"
          />
          <el-image
            style="width: 100px; height: 80px"
            :src="logoList.sevenRoad.url"
          />
          <el-image
            style="width: 160px; height: 80px"
            :src="logoList.lilisi.url"
          />
          <el-image
            style="width: 124px; height: 80px"
            :src="logoList.melTing.url"
          />
          <el-image
            style="width: 74px; height: 80px"
            :src="logoList.yoTta.url"
          />
          <el-image
            style="width: 113px; height: 80px"
            :src="logoList.changYou.url"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import yoka from "../assets/image/partner/游卡.png";
import eworld from "../assets/image/partner/image-removebg-preview.png";
import leiting from "../assets/image/partner/雷霆游戏-removebg-preview.png";
import idreamSky from "../assets/image/partner/创梦天地-removebg-preview.png";
import zhaoxi from "../assets/image/partner/朝夕光年-removebg-preview.png";
import zLonGame from "../assets/image/partner/紫龙-removebg-preview (2).png";
import thirdSevengame from "../assets/image/partner/三七互娱-removebg-preview.png";
import funplus from "../assets/image/partner/Funplus-removebg-preview.png";
import igg from "../assets/image/partner/IGG.png";
import happyGame from "../assets/image/partner/欢乐互娱.png";
import qingCi from "../assets/image/partner/青瓷游戏.png";
import sevenRoad from "../assets/image/partner/第七大道-removebg-preview.png";
import lilisi from "../assets/image/partner/莉莉丝.png";
import melTing from "../assets/image/partner/火溶.png";
import yoTta from "../assets/image/partner/友塔.png";
import changYou from "../assets/image/partner/image-removebg-preview (1).png";
const logoList = {
  yoka: {
    url: yoka,
  },
  eworld: {
    url: eworld,
  },
  leiting: {
    url: leiting,
  },
  idreamSky: {
    url: idreamSky,
  },
  zhaoxi: {
    url: zhaoxi,
  },
  zLonGame: {
    url: zLonGame,
  },
  thirdSevengame: {
    url: thirdSevengame,
  },
  funplus: {
    url: funplus,
  },
  igg: {
    url: igg,
  },
  happyGame: {
    url: happyGame,
  },
  qingCi: {
    url: qingCi,
  },
  sevenRoad: {
    url: sevenRoad,
  },
  lilisi: {
    url: lilisi,
  },
  melTing: {
    url: melTing,
  },
  yoTta: {
    url: yoTta,
  },
  changYou: {
    url: changYou,
  },
};
</script>
<style lang="scss" scoped>
.ourclients-content {
  background-color: #000;
  .title {
    position: relative;
    display: inline-block;
    .title-text {
      color: #00ffce;
      font-size: 35px;
      line-height: 22px;
      font-family: "Galvji";
      display: inline-block;
    }
    .icon {
      position: absolute;
      top: -18px;
      right: -18px;
      width: 18px;
      height: 18px;
      background-image: url("../assets/image/bottomLeft.png");
    }
  }
  .partner-content {
    position: relative;
    width: 100%;
    height: 552px;
    .partner-list {
      padding: 30px 0 140px;
      .partner-second-line,
      .partner-third-line,
      .partner-first-line {
        width: 1200px;
        z-index: 3;
        display: flex;
        justify-content: space-between;
        margin: 0 auto 80px;
      }
    }
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("../assets/image/partnerBg.png") center;
      z-index: 2;
    }
    .oblong {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 585px;
      height: 471px;
      background: url("../assets/image/oblong.png") center;
    }
    .line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 297px;
      height: 129px;
      background: url("../assets/image/ourClinetsLine.png") center;
    }
    .line::before,
    .line::after {
      content: "";
      position: absolute;
      top: 0;
      width: 4px;
      height: 4px;
      left: 50%;
      transform: translateX(-50%);
      background: #00ffce; /* 调整点的颜色 */
    }
    .line::before {
      left: 45%;
      transform: translateX(-45%);
    }
  }
}
</style>
