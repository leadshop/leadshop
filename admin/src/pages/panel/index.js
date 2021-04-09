/*
 * @Author: qinuoyun
 * @Date:   2020-09-08 10:12:19
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2020-11-26 14:41:03
 */
import Heshop from "@heshop/heshop.js";

//加载页面
import panel from "./index.vue";
import promote from "@/components/promote.vue";

//初始化变量
let modules = {};

modules.install = function() {
    //添加设置界面
    Heshop.component("index", "index", panel);
    Heshop.component("goods", "promote", promote);
};

export default modules;
