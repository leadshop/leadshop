/*
 * @Author: qinuoyun
 * @Date:   2020-09-08 10:12:19
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2020-11-24 15:32:23
 */
import Heshop from "@heshop/heshop.js";

//加载页面
import store from "./store.vue";
import tabber from "./tabber.vue";
import personal from "./personal.vue";
import touch from "./touch.vue";
import pages from "./pages.vue";
import themeColor from "./themeColor.vue";
//初始化变量
let modules = {};

modules.install = function() {
    //添加设置界面
    Heshop.component("store", "index", store);
    Heshop.component("store", "tabber", tabber);
    Heshop.component("store", "personal", personal);
    Heshop.component("store", "touch", touch);
    Heshop.component("store", "pages", pages);
    Heshop.component("store", "themeColor", themeColor);
};

export default modules;