import Vue from "vue";
import App from "./App";
import Heshop from "@heshop/heshop.uni";
import Vuex from "vuex";
import store from "./store";
import getters from "./store/getters";

import hView from "./libs/index.js";

import utils from "./utils/index.js";
import zIndex from "./utils/zIndex";
import storageKey from "./utils/storageKey.js";
import leIcon from './colorui/components/le-icon.vue'


import heImage from "./components/he-image.vue";

// #ifndef H5
import siteinfo from "siteInfo";
// #endif
// #ifdef H5
import VueLazyload from "vue-lazyload";
import WeChat from "./static/h5/js/wechat.js";
// #endif


Vue.component('he-image', heImage);
Vue.component('le-icon', leIcon);

Vue.use(hView);

Vue.use(Vuex);
// #ifdef H5
Vue.use(VueLazyload);
// #endif
Vue.config.productionTip = false;

App.mpType = 'app';

const AppURL = siteinfo.siteroot.replace("/app/index.php", '') + "/addons/cloud_wedding/site.php?r=";

let AppType = "weapp";
// #ifdef H5
AppType = "wechat";
// #endif

Vue.prototype.$heshop = Heshop.connect({
    AppURL: siteinfo.AppURL,
    AppName: "leadmall",
    AppType: AppType,
    AppID: "98c08c25f8136d590c",
    AppSecret: "3AYpU16dZ1CY7ejqvrE39B351vanLJVD"
});

Vue.prototype.$utils = utils;
Vue.prototype.$zIndex = zIndex;
Vue.prototype.$storageKey = storageKey;

// #ifdef H5
Vue.prototype.$wechat = WeChat;
// #endif

const app = new Vue({
    store: Heshop.store(store, getters),
    router: Heshop.router({
        whiteList: [
            "/",
            "/pages/index/index",
            "/pages/other/error",
            "/pages/page/index",
            "/pages/goods/detail",
            "/pages/user/index",
            "/pages/cart/index",
            "/pages/categories/index",
            "/pages/goods/list",
            "/pages/goods/evaluation",
            "/pages/goods/search-list"
        ],
        loginPage: "/pages/user/login"
    }),
    ...App
});

// #ifdef H5
window.app = app;
// #endif
app.$mount()