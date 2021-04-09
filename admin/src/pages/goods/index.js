/*
 * @Author: qinuoyun
 * @Date:   2020-09-08 10:12:19
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-03-05 15:43:28
 */
import Heshop from "@heshop/heshop.js";

//加载页面

import confirmPopup from "./components/confirmPopup.vue";
import chooseGroup from "./components/chooseGroup.vue";
import groupPromote from "./components/groupPromote.vue";
// import promote

import selectService from "./components/selectService.vue";
import chooseCategory from "./components/chooseCategory.vue";
import promote from "@/components/promote.vue";
import emptyPopup from "./components/emptyPopup.vue";
import groupManual from "./components/group-manual.vue";
//初始化变量
let modules = {};

modules.install = function() {
    Heshop.component("goods", "selectService", selectService);
    Heshop.component("goods", "chooseCategory", chooseCategory);
    Heshop.component("goods", "promote", promote);
    Heshop.component("goods", "emptyPopup", emptyPopup);

    //添加设置界面
    Heshop.component("goods", "role", confirmPopup);
    Heshop.component("goods", "groupPromote", groupPromote);
    Heshop.component("goods", "chooseGroup", chooseGroup);
    Heshop.component("goods", "groupManual", groupManual);
};

export default modules;
