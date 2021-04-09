/*
 * @Author: qinuoyun
 * @Date:   2020-09-08 10:12:19
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2020-11-24 15:32:18
 */
import Heshop from "@heshop/heshop.js";

//加载页面
import setup from "./setup.vue";
import address from "./address.vue";
import message from "./message.vue";
import addressPublish from "./addressPublish.vue";
import emptyPopup from "./components/emptyPopup.vue";

//初始化变量
let modules = {};

modules.install = function() {
    //添加设置界面
    Heshop.component("setup", "index", setup);
    Heshop.component("setup", "address", address);
    Heshop.component("setup", "message", message);
    Heshop.component("setup", "addressPublish", addressPublish);
    Heshop.component("setup", "emptyPopup", emptyPopup);
};

export default modules;
