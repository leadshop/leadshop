import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from "moment";
import hView from "./lib/index.js";
import UmyUi from 'umy-ui'
import './theme/umyui.css'; // 引入样式
Vue.use(UmyUi);
Vue.use(hView);

import './plugins/element.js'
import './plugins/leadshop.js'

import Heshop from "@heshop/heshop.js";

import pictureDialog from "@/pages/gallery/pictureDialog";

Vue.component("pictureDialog", pictureDialog);

import videoDialog from "@/pages/gallery/videoDialog";

Vue.component("videoDialog", videoDialog);
Vue.config.productionTip = false

Vue.prototype.$moment = moment;

Vue.use(Heshop);

Vue.prototype.$heshop = Heshop.connect($_W);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
