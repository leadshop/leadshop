import Heshop from "@heshop/heshop.js";

//加载页面
import channel from "./channel.vue";
import buy from "./buy.vue";
import bind from "./bind.vue";
import manualBinding from "./manualBinding.vue";
import uploadGuide from "./components/upload-guide.vue";
import deployGuide from "./components/deploy-guide.vue";
import uploadQrcode from "./components/upload-qrcode.vue";
//初始化变量
let modules = {};

modules.install = function() {
    Heshop.component("channel", "index", channel);
    Heshop.component("channel", "buy", buy);
    Heshop.component("channel", "bind", bind);
    Heshop.component("channel", "manualBinding", manualBinding);
    Heshop.component("channel", "uploadGuide", uploadGuide);
    Heshop.component("channel", "deployGuide", deployGuide);
    Heshop.component("channel", "uploadQrcode", uploadQrcode);
};

export default modules;
