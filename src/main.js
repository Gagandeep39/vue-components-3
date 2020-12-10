/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-10 14:16:38
 * @modify date 2020-12-10 14:16:38
 * @desc [description]
 */
import { createApp } from "vue";

import App from "./App.vue";
import BaseBadge from "./components/BaseBadge.vue";

createApp(App)
  .component("base-badge", BaseBadge)
  .mount("#app");
