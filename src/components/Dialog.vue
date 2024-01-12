<template>
  <div>
    <el-dialog
      :model-value="dialogVisible"
      width="646"
      height="360"
      center
      :show-close="false"
      @close="close"
    >
      <div class="dialog-box">
        <div class="background1"></div>
        <div class="background2"></div>
        <h3 class="dialog-title">
          Contact<br />
          <div
            style="
              width: 178px;
              height: 17px;
              background: #00ffce;
              border-radius: 9px;
              opacity: 0.39;
              filter: blur(12px);
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
            "
          ></div>
          information
        </h3>
        <p>
          If you'd like to learn more or explore collaboration opportunities,
          please feel free to reach out to us via the following email addresses.
        </p>
        <div class="email-content">
          <span>Email</span>
          <div ref="emailText">fanta@orangeglobalmedia.agency</div>
          <span class="copy"
            ><el-icon @click="handleCopy"><CopyDocument /></el-icon
          ></span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
const emailText = ref();
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
});
const handleCopy = () => {
  const textToCopy = emailText.value.textContent; // 设置要复制的文本内容
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      ElMessage({
        message: "文本已成功复制到剪贴板",
        type: "success",
        duration: 1000,
      });
    })
    .catch(() => {
      ElMessage.error("复制失败，请手动复制文本");
    });
};
const emit = defineEmits();
const close = () => {
  emit("close");
};
</script>
<style lang="scss">
.el-dialog {
  position: relative;
  background-color: #000;
  border: 1px solid #00ffce;
  border-radius: 22px;
  box-shadow: 0px 10px 18px 0px #000000;
  padding: 45px 80px 53px;
  .background1,
  .background2 {
    position: absolute;
    background-size: cover; /* 图片填充整个容器 */
  }

  .background1 {
    width: 165px;
    height: 80px;
    top: 45px;
    left: 0;
    background-image: url("@/assets/image/line1.png"); /* 第一个背景图片 */
    z-index: 1; /* 设置层叠顺序 */
  }

  .background2 {
    width: 70px;
    height: 45px;
    right: 0;
    bottom: 26px;
    background-image: url("@/assets/image/line2.png"); /* 第二个背景图片 */
    z-index: 1;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .dialog-box {
    background-color: black;
    font-family: "Montserrat";
    .dialog-title {
      font-size: 22px;
      color: #00ffce;
      text-align: center;
      font-weight: 500;
      position: relative;
    }
    p {
      font-size: 16px;
      font-family: Galvji;
      color: #ffffff;
      line-height: 30px;
      text-indent: 2em;
    }
    .email-content {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      span {
        font-weight: 500;
        color: #00ffce;
        line-height: 19px;
        margin-right: 10px;
        line-height: 30px;
      }
      div {
        width: 250px;
        height: 30px;
        background: #00ffce;
        border-radius: 5px;
        color: #000000;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
      }
      .copy {
        width: 30px;
        height: 30px;
        background-color: rgba(0, 255, 206, 0.2);
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>
