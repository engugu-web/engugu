import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/base.scss";
//引入cookies
import VueCookies from "vue-cookies";
//引入element plus
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";
//图标 图标在附件中
import "./assets/icon/iconfont.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);

app.use(ElementPlus, {
  locale: zhCn,
});
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.globalInfo = {
  bodyWidth: 1300,
};
app.mount("#app");
