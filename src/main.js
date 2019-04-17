import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "material-design-icons/iconfont/material-icon-my.css";
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Toast from 'muse-ui-toast';

import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';
Vue.use(Message);

Vue.use(Toast);
Vue.use(MuseUI);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

