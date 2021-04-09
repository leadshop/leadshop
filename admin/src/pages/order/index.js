/*
 * @Author: qinuoyun
 * @Date:   2020-09-08 10:12:19
 * @Last Modified by:   wiki
 * @Last Modified time: 2021-03-03 15:28:16
 */
import Heshop from "@heshop/heshop.js";

//加载页面
import order from "./order.vue";
import after from "./after.vue";
import remark from "./remark.vue";
import delivery from "./delivery.vue";
import emptyPopup from "@/pages/order/components/emptyPopup";
import insertAddress from "@/pages/order/components/insertAddress";
import shippingRules from "./shippingRules.vue";
import freightTemplate from "./freightTemplate.vue";
import shippingPublish from "@/pages/order/shippingPublish.vue";
import setDistrict from "@/pages/order/components/setDistrict.vue";
import modifyPrice from "@/pages/order/components/modifyPrice.vue";
import orderShipping from "@/pages/order/components/orderShipping.vue";
import changeAddress from "@/pages/order/components/changeAddress.vue";
import modifyLogistics from "@/pages/order/components/modifyLogistics.vue";
import logisticsInformation from "@/pages/order/components/logisticsInformation.vue";
import refuseToSell from "@/pages/order/components/refuseToSell.vue";
import onlyRefund from "@/pages/order/components/onlyRefund.vue";
import receiveRefund from "@/pages/order/components/receiveRefund.vue";
import orderExport from "@/pages/order/components/orderExport.vue";
import merchantNotes from "@/pages/order/components/merchantNotes.vue";
import agreeAfterSale from "@/pages/order/components/agreeAfterSale.vue";
import replyReviewsBulk from "@/pages/order/components/replyReviewsBulk.vue";
import replyReviews from "@/pages/order/components/replyReviews.vue";
import receiveExchange from "@/pages/order/components/receiveExchange.vue";
import afterOrderExport from "@/pages/order/components/afterOrderExport.vue";
import orderExportHistory from "@/pages/order/orderExportHistory.vue";
import freightPublish from "@/pages/order/freightPublish.vue";
import orderDetail from "@/pages/order/orderDetail.vue";
import afterOrderExportHistory from "@/pages/order/afterOrderExportHistory.vue";
import afterDetail from "@/pages/order/afterDetail.vue";
//初始化变量
let modules = {};

modules.install = function () {
    //添加设置界面
    Heshop.component("order", "index", order);
    Heshop.component("order", "after", after);
    Heshop.component("order", "remark", remark);
    Heshop.component("order", "delivery", delivery);
    Heshop.component("order", "shippingRules", shippingRules);
    Heshop.component("order", "freightTemplate", freightTemplate);
    Heshop.component("order", "emptyPopup", emptyPopup);
    Heshop.component("order", "insertAddress", insertAddress);
    Heshop.component("order", "shippingPublish", shippingPublish);
    Heshop.component("order", "freightPublish", freightPublish);
    Heshop.component("order", "setDistrict", setDistrict);
    Heshop.component("order", "orderDetail", orderDetail);
    Heshop.component("order", "modifyPrice", modifyPrice);
    Heshop.component("order", "orderShipping", orderShipping);
    Heshop.component("order", "changeAddress", changeAddress);
    Heshop.component("order", "modifyLogistics", modifyLogistics);
    Heshop.component("order", "logisticsInformation", logisticsInformation);
    Heshop.component("order", "orderExport", orderExport);
    Heshop.component("order", "orderExportHistory", orderExportHistory);
    Heshop.component("order", "agreeAfterSale", agreeAfterSale);
    Heshop.component("order", "refuseToSell", refuseToSell);
    Heshop.component("order", "onlyRefund", onlyRefund);
    Heshop.component("order", "receiveRefund", receiveRefund);
    Heshop.component("order", "merchantNotes", merchantNotes);
    Heshop.component("order", "afterDetail", afterDetail);
    Heshop.component("order", "replyReviewsBulk", replyReviewsBulk);
    Heshop.component("order", "replyReviews", replyReviews);
    Heshop.component("order", "receiveExchange", receiveExchange);
    Heshop.component("order", "afterOrderExport", afterOrderExport);
    Heshop.component("order", "afterOrderExportHistory", afterOrderExportHistory);
};

export default modules;
