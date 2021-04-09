/*
 * @Author: qinuoyun
 * @Date:   2020-09-08 10:12:19
 * @Last Modified by:   wiki
 * @Last Modified time: 2021-01-07 16:29:16
 */
import Heshop from "@heshop/heshop.js";
//加载页面
import users from "./users.vue";
import userData from "./userData.vue";
import usersExportHistory from "./usersExportHistory.vue";
import modifyMobile from "@/pages/users/components/modifyMobile.vue";
import modifyRealname from "@/pages/users/components/modifyRealname.vue";
//初始化变量
let modules = {};
modules.install = function() {
    //添加设置界面
    Heshop.component("users", "index", users);
    Heshop.component("users", "userData", userData);
    Heshop.component("users", "usersExportHistory", usersExportHistory);
    Heshop.component("users", "modifyMobile", modifyMobile);
    Heshop.component("users", "modifyRealname", modifyRealname);
};
export default modules;