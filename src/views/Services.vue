<template>
  <div>
    <Header />
    <div class="services-content">
      <div class="services-main">
        <div class="servicesLine"></div>
        <div class="title-content">
          <h1>SERVICES</h1>
          <p>
            Produce high-quality game videos based on the preferences of global
            and local players to provide more<br />
            visual exposure opportunities for products. Video production covers
            CG animation /UE animation/Media buy<br />
            assets/post-packaging and other types.
          </p>
        </div>
      </div>
      <div class="main-content">
        <div class="bg1"></div>
        <div class="bg2"></div>
        <div class="bg3"></div>
        <div class="bg4"></div>
        <div class="box">
          <ul>
            <li id="gaming-row">
              <div class="text-content">
                <div class="arrow"></div>
                <h5>Gaming Global Campaign</h5>
                <p>
                  Result-oriented global marketing strategies, creative<br />
                  promotion strategies and project execution services based
                  on<br />
                  local market research and insights.
                </p>
              </div>
              <el-image style="width: 443px; height: 230px" :src="manImg" />
            </li>
            <li id="influencer-row">
              <el-image style="width: 443px; height: 230px" :src="fullImg" />
              <div class="text-content">
                <div
                  class="arrow"
                  style="transform: scaleX(-1); right: -32px"
                ></div>
                <h5>Influencer Marketing</h5>
                <p>
                  Provides one-stop global influencer cooperation services<br />
                  covering 27 regional languages and 100+ countries/regions,<br />
                  from planning to execution and effect tracking.
                </p>
              </div>
            </li>
            <li id="community-row">
              <div class="text-content">
                <div class="arrow"></div>
                <h5>Community operations</h5>
                <p>
                  Provide event planning and long-term operation services for<br />
                  global mainstream media platforms/communities for<br />
                  products, becoming the core position for accumulating and<br />
                  activating players.
                </p>
              </div>
              <el-image style="width: 443px; height: 230px" :src="blackImg" />
            </li>
            <li id="creative-row">
              <el-image
                style="width: 443px; height: 230px"
                :src="luminousImg"
              />
              <div class="text-content">
                <div
                  class="arrow"
                  style="transform: scaleX(-1); right: -32px"
                ></div>
                <h5>Creative Production</h5>
                <p>
                  According to the content preferences of local user groups,
                  we<br />
                  produce various promotional materials, covering AE, PV,
                  UE4,<br />
                  live-action shooting and other businesses.
                </p>
              </div>
            </li>
            <li id="localized-row">
              <div class="text-content">
                <div class="arrow"></div>
                <h5>Localized PR services</h5>
                <p>
                  China Unicom local media provides PR services, covering<br />
                  news/topic planning and other services, providing brands<br />
                  with maximum local brand exposure and reputation<br />
                  enhancement.
                </p>
              </div>
              <el-image style="width: 443px; height: 230px" :src="cartoonImg" />
            </li>
            <li id="celebrity-row">
              <el-image style="width: 443px; height: 230px" :src="futuriImg" />
              <div class="text-content">
                <div
                  class="arrow"
                  style="transform: scaleX(-1); right: -32px"
                ></div>
                <h5>Celebrity endorsements</h5>
                <p>
                  Provide globally influential celebrities to endorse
                  products,<br />
                  covering multiple offline and online channels, assisting<br />
                  products in gaining massive exposure and implanting them<br />
                  into users' minds.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import blackImg from "../assets/image/servicesimg/black-teen-smiling-girl-headset-playing-video-games-video-game-club-with-blue-red-illumination-keyboard-with-illumination.jpg";
import cartoonImg from "../assets/image/servicesimg/cartoon-woman-wearing-vr-glasses.jpg";
import fullImg from "../assets/image/servicesimg/full-shot-man-augmented-reality-technology.jpg";
import luminousImg from "../assets/image/servicesimg/luminous-metaverse-background.jpg";
import manImg from "../assets/image/servicesimg/man-neon-suit-sits-chair-with-neon-sign-that-says-word-it.jpg";
import futuriImg from "../assets/image/servicesimg/futurImg.jpg";
import Header from "../../src/components/Header.vue";
import Footer from "../../src/components/Footer.vue";
</script>
<style lang="scss" scoped>
.services-content {
  .services-main {
    height: 824px;
    width: 100%;
    position: relative;
    background-image: url("../assets/image/servicesBg.png");
    .servicesLine {
      position: absolute;
      width: 151px;
      height: 356px;
      left: 0;
      bottom: -117px;
      background-image: url("../assets/image/servicesLine9.png");
    }
    .title-content {
      padding-top: 190px;
      h1 {
        font-size: 189px;
        font-family: Montserrat, Montserrat;
        font-weight: bold;
        color: #00ffce;
        line-height: 230px;
        text-align: center;
      }
      p {
        font-size: 16px;
        font-family: Galvji;
        color: #ffffff;
        line-height: 30px;
        text-align: center;
        margin-top: 40px;
      }
    }
  }
  .main-content {
    height: 1828px;
    position: relative;
    .bg1 {
      position: absolute;
      width: 220px;
      height: 100px;
      left: 0;
      bottom: 0;
      background-image: url("../assets/image/servicesLine11.png");
    }
    .bg2 {
      position: absolute;
      width: 415px;
      height: 307px;
      right: 0;
      top: 564px;
      background-image: url("../assets/image/servicesLine5.png");
    }
    .bg3 {
      position: absolute;
      width: 284px;
      height: 284px;
      left: 291px;
      top: 401px;
      background-image: url("../assets/image/servicesOblong.png");
      background-size: contain;
    }
    .bg4 {
      position: absolute;
      width: 673px;
      height: 673px;
      right: 62px;
      top: 883px;
      background-image: url("../assets/image/servicesOblong.png");
    }
    .box {
      width: 1000px;
      margin: 34px auto 0;
      ul {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 49px;
          .text-content {
            padding: 29px 0 0 13px;
            border: 0.5px solid;
            width: 495px;
            height: 168px;
            position: relative;
            border-image: linear-gradient(to right, black, black, #00ffce) 1;
            border-image-slice: 1; /* 可选：指定边框图像的切片 */
            border-image-width: 1; /* 可选：指定边框图像的宽度 */
            border-image-outset: 0; /* 可选：指定边框图像的偏移量 */
            .arrow {
              width: 50px;
              height: 50px;
              top: 13px;
              right: -19px;
              position: absolute;
              background-image: url("../assets/image/line8.png");
            }
            h5 {
              font-size: 20px;
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              color: #00ffce;
              line-height: 28px;
            }
            p {
              font-size: 14px;
              font-family: Montserrat, Montserrat;
              font-weight: 400;
              color: #ffffff;
              line-height: 20px;
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
