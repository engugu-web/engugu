<template>
  <div>
    <Header />
    <div class="body-content">
      <div class="homebox">
        <div class="video-box">
          <video id="video-background" autoplay loop muted>
            <source src="../assets/video/bgVideo.mp4" type="video/mp4" />
          </video>
          <div class="videoLine1"></div>
          <div class="videoLine2"></div>
          <div class="companyText">
            <h1>
              Orangeglobal<br />
              Media
            </h1>
            <div class="box">
              <button class="btn" @click="Contact">
                Get Start <el-icon><Right /></el-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="about-content" id="about-row">
          <div class="line1-bg">
            <div class="arrow-bottom"></div>
            <div class="dian1"></div>
            <div class="dian2"></div>
          </div>
          <div class="line2-bg"></div>
          <div class="oblong-bg"></div>
          <div class="line3-bg"></div>
          <div class="text-content">
            <h5>Versatile overseas game</h5>
            <h3>squad leader</h3>
            <p>
              Founded in 2021<br />
              an overseas marketing advertising service company focusing on the
              game industry.<br />
              We are committed to providing support for Chinese game
              manufactures,<br />
              including professional diversified business and plans deeply
              rooted in local culture, helping the ninth art grow abroad.
            </p>
          </div>
          <div class="main-content">
            <div class="description-content">
              <h5>
                Every overseas game
                <el-icon color="#00ffce"><Menu /></el-icon><br />
                is an emerging high-potential ADC, <br />
                and Orange Global Media is willing to act as the <br />
                game’s “versatile squad leader”.
              </h5>
              <div class="bottom-text">
                <div class="setpsBox">
                  <div class="setp1"></div>
                  <div class="setp2"></div>
                  <div class="setp3"></div>
                </div>
                <div>
                  <p>
                    We can be as stable as a tank, providing all-round
                    protection and support
                  </p>
                  <p />

                  <p>
                    we can also be as careful as a support, providing key
                    assistance and<br />
                    guidance for the growth of the product at every step
                  </p>

                  <p>
                    We will take on an important supporting role to adapt to
                    different demand<br />
                    scenarios flexibly, fully supporting and accompanying the
                    growth of the<br />
                    product in the overseas market
                  </p>
                </div>
              </div>
            </div>
            <div class="img-box">
              <el-image style="width: 449px; height: 539px" :src="indexImg" />
            </div>
          </div>
          <div class="case-studies">
            <div style="text-align: center; margin-bottom: 30px">
              <div class="title">
                <h3 class="title-text">CASE STUDIES</h3>
                <div class="icon"></div>
              </div>
            </div>
            <div class="carousel-content">
              <el-carousel type="card" height="206px" indicator-position="none">
                <el-carousel-item
                  v-for="item in caseStudiesImgList"
                  :key="item"
                >
                  <el-image
                    style="width: 332px; height: 166px"
                    :src="item.url"
                  />
                </el-carousel-item>
                <!-- <el-carousel-item v-for="item in 10" :key="item">
              <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item> -->
              </el-carousel>
            </div>
          </div>
        </div>
        <div class="our-services" id="our-services-row">
          <div class="bg-box"></div>
          <div class="oblong-box"></div>
          <div class="line-box"></div>
          <div style="text-align: center; margin-bottom: 30px">
            <div class="title">
              <h3 class="title-text">OUR SERVICES</h3>
              <div class="icon"></div>
            </div>
          </div>
          <el-carousel trigger="click" height="500px" arrow="never">
            <el-carousel-item>
              <div class="carousel-content">
                <el-image style="width: 400px; height: 253px" :src="manImg" />
                <el-image style="width: 400px; height: 253px" :src="fullImg" />
                <el-image style="width: 400px; height: 253px" :src="blackImg" />
                <div class="gradient-box">
                  <div class="border-gradient">
                    <h6>
                      <el-icon color="#00ffce"><Menu /></el-icon>
                      Gaming Global Campaign
                    </h6>
                    <p>
                      Result-oriented global marketing strategies, creative
                      promotion strategies and project execution services based
                      on local market research and insights.
                    </p>
                  </div>
                  <div class="border-gradient">
                    <h6>
                      <el-icon color="#00ffce"><Menu /></el-icon> Influencer
                      Marketing
                    </h6>
                    <p>
                      Provides one-stop global influencer cooperation services
                      covering 27 regional languages and 100+ countries/regions,
                      from planning to execution and effect tracking.
                    </p>
                  </div>
                  <div class="border-gradient">
                    <h6>
                      <el-icon color="#00ffce"><Menu /></el-icon> Community
                      operations
                    </h6>
                    <p>
                      Provide event planning and long-term operation services
                      for global mainstream media platforms/communities for
                      products, becoming the core position for accumulating and
                      activating players.
                    </p>
                  </div>
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="carousel-content">
                <el-image
                  style="width: 400px; height: 253px"
                  :src="luminousImg"
                />
                <el-image
                  style="width: 400px; height: 253px"
                  :src="cartoonImg"
                />
                <el-image
                  style="width: 400px; height: 253px"
                  :src="futuriImg"
                />
                <div class="gradient-box">
                  <div class="border-gradient">
                    <h6>
                      <el-icon color="#00ffce"><Menu /></el-icon> Creative
                      Production
                    </h6>
                    <p>
                      According to the content preferences of local user groups,
                      we produce various promotional materials, covering AE, PV,
                      UE4, live-action shooting and other businesses.
                    </p>
                  </div>
                  <div class="border-gradient">
                    <h6>
                      <el-icon color="#00ffce"><Menu /></el-icon> Localized PR
                      services
                    </h6>
                    <p>
                      China Unicom local media provides PR services, covering
                      news/topic planning and other services, providing brands
                      with maximum local brand exposure and reputation
                      enhancement.
                    </p>
                  </div>
                  <div class="border-gradient">
                    <h6>
                      <el-icon color="#00ffce"><Menu /></el-icon> Celebrity
                      endorsements
                    </h6>
                    <p>
                      Provide globally influential celebrities to endorse
                      products, covering multiple offline and online channels,
                      assisting products in gaining massive exposure and
                      implanting them into users' minds.
                    </p>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <OurClinets />
      </div>
    </div>
    <Footer />
    <Dialog :dialogVisible="dialogVisible" @close="close" />
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "../../src/components/Header.vue";
import Footer from "../../src/components/Footer.vue";
import Dialog from "../../src/components/Dialog.vue";
import OurClinets from "../../src/components/OurClinets.vue";
import img from "../assets/image/logo.png";
import blackImg from "../assets/image/servicesimg/black-teen-smiling-girl-headset-playing-video-games-video-game-club-with-blue-red-illumination-keyboard-with-illumination.jpg";
import cartoonImg from "../assets/image/servicesimg/cartoon-woman-wearing-vr-glasses.jpg";
import fullImg from "../assets/image/servicesimg/full-shot-man-augmented-reality-technology.jpg";
import luminousImg from "../assets/image/servicesimg/luminous-metaverse-background.jpg";
import manImg from "../assets/image/servicesimg/man-neon-suit-sits-chair-with-neon-sign-that-says-word-it.jpg";
import futuriImg from "../assets/image/servicesimg/futurImg.jpg";
import caseStudiesImg1 from "../assets/image/caseStudiesImg/1.png";
import caseStudiesImg2 from "../assets/image/caseStudiesImg/2.png";
import caseStudiesImg3 from "../assets/image/caseStudiesImg/3.png";
import caseStudiesImg4 from "../assets/image/caseStudiesImg/4.png";
import caseStudiesImg5 from "../assets/image/caseStudiesImg/5.png";
import caseStudiesImg6 from "../assets/image/caseStudiesImg/6.png";
import caseStudiesImg7 from "../assets/image/caseStudiesImg/7.png";
import caseStudiesImg8 from "../assets/image/caseStudiesImg/8.png";
import caseStudiesImg9 from "../assets/image/caseStudiesImg/9.png";
import caseStudiesImg10 from "../assets/image/caseStudiesImg/10.png";
import indexImg from "../assets/image/indexImg.jpg";

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const url = img;
const dialogVisible = ref(false);
function Contact() {
  dialogVisible.value = true;
}
const close = () => {
  dialogVisible.value = false;
};
const caseStudiesImgList = [
  { url: caseStudiesImg1 },
  { url: caseStudiesImg2 },
  { url: caseStudiesImg3 },
  { url: caseStudiesImg4 },
  { url: caseStudiesImg5 },
  { url: caseStudiesImg6 },
  { url: caseStudiesImg7 },
  { url: caseStudiesImg8 },
  { url: caseStudiesImg9 },
  { url: caseStudiesImg10 },
];
</script>
<style lang="scss">
.body-content {
  margin-top: 77px;
  position: relative;
  background: #000;
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
  .video-box {
    position: relative;
    height: 923px;
    width: 100%;
    background-color: #102132;
    overflow: hidden;
    #video-background {
      position: absolute;
      top: 0;
      left: 0;
      width: auto;
      height: auto;
    }
    .videoLine1 {
      position: absolute;
      top: 0;
      left: 0;
      height: 338px;
      width: 443px;
      background-image: url("../assets/image/videoLine1.png");
    }
    .videoLine2 {
      position: absolute;
      top: 443px;
      right: 0;
      height: 393px;
      width: 527px;
      background-image: url("../assets/image/vedioLine2.png");
    }
    .companyText {
      position: absolute;
      padding-top: 189px;
      width: 100%;
      h1 {
        font-size: 210px;
        font-family: "DINCondensed", DINCondensed;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.5);
        line-height: 200px;
        text-align: center;
      }
      // .box {
      //   width: 220px;
      //   height: 58px;
      //   // padding: 1px;
      //   background: linear-gradient(135deg, transparent 20px, #2baaca 0),
      //     linear-gradient(-45deg, transparent 10px, #2baaca 0);
      //   margin: 80px auto;
      // }
      .btn {
        display: block;
        width: 220px;
        height: 58px;
        border: 1px solid #00ffce;
        text-align: center;
        margin: 80px auto;
        font-size: 22px;
        font-family: Galvji;
        color: #00ffce;
        line-height: 26px;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
        border-radius: 6px;
        // background: linear-gradient(135deg, transparent 9px, #fff 0),
        //   linear-gradient(-45deg, transparent 10px, #2baaca 0);
        // linear-gradient(-45deg, transparent 10px, #2baaca 0);
        cursor: pointer;
      }
      .btn:hover {
        background: #00ffce;
        color: #000;
      }
    }
  }
  .about-content {
    height: 1613px;
    width: 100%;
    position: relative;
    .line1-bg {
      position: absolute;
      top: 0;
      left: 0;
      height: 471px;
      width: 371px;
      background-image: url("../assets/image/aboutLine1.png");
      .arrow-bottom {
        position: absolute;
        bottom: 0;
        width: 40px;
        height: 40px;
        left: 48%;
        transform: translateX(-50%);
        background-image: url("../assets/image/arrowBottom.png");
      }
      .dian1,
      .dian2 {
        position: absolute;
        bottom: 356px;
        width: 5px;
        height: 5px;
        left: 50%;
        transform: translateX(-50%);
        background: #00ffce;
      }
      .dian2 {
        left: 45%;
        transform: translateX(-45%);
      }
    }
    .line1-bg::before,
    .line1-bg::after {
      content: "";
      position: absolute;
      bottom: 280px;
      width: 5px;
      height: 5px;
      left: 50%;
      transform: translateX(-50%);
      background: #00ffce;
    }
    .line1-bg::before {
      left: 45%;
      transform: translateX(-45%);
    }

    .about-content::before {
      left: 45%;
      transform: translateX(-45%);
    }
    .line2-bg {
      position: absolute;
      top: 113px;
      right: 0;
      height: 341px;
      width: 441px;
      background-image: url("../assets/image/aboutLine2.png");
    }
    .line3-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 699px;
      width: 907px;
      background-image: url("../assets/image/partnerBg.png");
      background-position: center bottom;
      background-size: cover;
    }
    .oblong-bg {
      position: absolute;
      top: 643px;
      right: 50px;
      height: 673px;
      width: 673px;
      background-image: url("../assets/image/aboutOblong.png");
    }
    .text-content {
      padding-top: 136px;
      h5 {
        font-size: 20px;
        font-family: Galvji;
        color: #00ffce;
        line-height: 23px;
        text-align: center;
      }
      h3 {
        font-size: 73px;
        font-family: DS-Digital;
        font-weight: bold;
        color: #00ffce;
        text-align: center;
      }
      p {
        font-size: 16px;
        font-family: Galvji;
        color: #ffffff;
        line-height: 26px;
        text-align: center;
      }
    }
    .main-content {
      width: 1300px;
      margin: 200px auto 129px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .description-content {
        h5 {
          text-align: left;
          font-size: 26px;
          font-family: Galvji, Galvji;
          font-weight: bold;
          color: #00ffce;
          line-height: 40px;
        }
        p {
          font-size: 16px;
          font-family: Galvji;
          color: #ffffff;
          line-height: 26px;
          text-align: left;
          margin-bottom: 40px;
          margin-left: 10px;
        }
        .bottom-text {
          margin-top: 40px;
          display: flex;
          .setpsBox {
            .setp1 {
              width: 2px;
              height: 63px;
              background: #00ffce;
              position: relative;
              margin-top: 15px;
            }
            .setp1::before {
              content: "。";
              position: absolute;
              top: -35px;
              left: -7px;
              font-size: 30px;
              color: #00ffce;
            }
            .setp2 {
              width: 2px;
              height: 83px;
              background: #00ffce;
              position: relative;
              margin-top: 6px;
            }
            .setp2::before {
              content: "。";
              position: absolute;
              top: -35px;
              left: -7px;
              font-size: 30px;
              color: #00ffce;
            }
            .setp3 {
              width: 2px;
              height: 60px;
              background: #00ffce;
              position: relative;
              margin-top: 6px;
            }
            .setp3::before {
              content: "。";
              position: absolute;
              top: -35px;
              left: -7px;
              font-size: 30px;
              color: #00ffce;
            }
          }
        }
      }
    }
  }
  .case-studies {
    width: 100%;
    height: 450px;
    .carousel-content {
      width: 1500px;
      height: 260px;
      margin: 0 auto;
      .el-carousel__arrow {
        color: #00ffce;
        font-size: 48px;
        background-color: rgba(173, 216, 230, 0);
        border-radius: 0;
      }
      .el-carousel__arrow--left {
        left: 0;
      }
      .el-carousel__arrow--right {
        right: 0;
      }
      .el-carousel__item {
        width: 332px;
        height: 166px;
        margin: 0 100px;
      }
      .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
        width: 200px;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }
  .our-services {
    position: relative;
    height: 760px;
    padding-top: 30px;
    .el-carousel__button {
      width: 88px;
    }
    .el-carousel__indicator--horizontal.is-active .el-carousel__button {
      background: #00ffce;
    }

    .carousel-content {
      width: 1200px;
      height: 440px;
      margin: 0 auto;
      color: #fff;
      font-size: 0;
      .gradient-box {
        display: flex;
      }
      .border-gradient {
        // display: inline-block;
        width: 400px;
        height: 187px;
        border-width: 1px;
        border-style: solid;
        border-image: linear-gradient(to bottom, black, #00ffce) 1;
        border-image-slice: 1; /* 可选：指定边框图像的切片 */
        border-image-width: 1; /* 可选：指定边框图像的宽度 */
        border-image-outset: 0; /* 可选：指定边框图像的偏移量 */
        h6 {
          margin: 24px 0 12px 25px;
          font-size: 20px;
          color: #00ffce;
          display: flex;
          align-items: center;
        }
        h6 :first-child {
          margin-right: 5px;
        }
        p {
          margin: 0 50px;
          font-size: 14px;
        }
      }
    }
    .bg-box {
      position: absolute;
      top: 0;
      left: 0;
      height: 394px;
      width: 100%;
      background-image: url("../assets/image/bg8.png");
    }
    .oblong-box {
      position: absolute;
      top: 475px;
      left: 70px;
      width: 284px;
      height: 284px;
      background: url("../assets/image/oblong2.png") center;
      background-size: contain;
    }
    .line-box {
      position: absolute;
      top: -85px;
      right: 0;
      width: 150px;
      height: 356px;
      background: url("../assets/image/line9.png") center;
    }
  }
}
</style>
