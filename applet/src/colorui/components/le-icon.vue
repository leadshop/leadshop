<template>
    <text :class="type" class="iconfont" :style="{'fontSize':size,'color':color}"></text>
</template>
<script>
    export default {
    name: 'le-icon',
    props: {
        type: {
            type: String,
            default: ''
        },
        size: {
            type: [String, Number],
            default: '28rpx'
        },
        color: {
            type: String,
            default: '#333333'
        }
    }
}
</script>
<style type="text/css">@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2111115_lxqqnpiqek.eot?t=1611216818699'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2111115_lxqqnpiqek.eot?t=1611216818699#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_2111115_lxqqnpiqek.woff?t=1611216818699') format('woff'),
  url('//at.alicdn.com/t/font_2111115_lxqqnpiqek.ttf?t=1611216818699') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2111115_lxqqnpiqek.svg?t=1611216818699#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconarrow-down:before {
  content: "\e601";
}

.icontrash:before {
  content: "\e61a";
}

.iconarrow-top:before {
  content: "\e62b";
}

.iconcopy:before {
  content: "\e63a";
}

.iconproductlist_rank_second:before {
  content: "\e69e";
}

.iconproductlist_rank_first:before {
  content: "\e69f";
}

.iconnav_classification_normal:before {
  content: "\e671";
}

.iconproductdetails_tab_customerservice:before {
  content: "\e673";
}

.iconnav_personalcenter_normal:before {
  content: "\e674";
}

.iconsearch_empty:before {
  content: "\e675";
}

.iconproductdetails_goodsservices:before {
  content: "\e676";
}

.iconproductdetails_tab_customerservice_online:before {
  content: "\e677";
}

.iconproductdetails_popup_enlargethepicture:before {
  content: "\e678";
}

.iconproductdetails_share:before {
  content: "\e67c";
}

.iconproductdetails_tab_customerservice_telephone:before {
  content: "\e67d";
}

.iconbtn_addtocart:before {
  content: "\e67e";
}

.iconimago_defaultproduct:before {
  content: "\e67f";
}

.iconsearchbar_search:before {
  content: "\e680";
}

.iconbtn_open:before {
  content: "\e684";
}

.iconaddress_wechataddress:before {
  content: "\e685";
}

.iconpersonalcenter_address:before {
  content: "\e686";
}

.iconbtn_close:before {
  content: "\e687";
}

.iconpersonalcenter_contactus:before {
  content: "\e688";
}

.iconorderdetails_logistics:before {
  content: "\e689";
}

.iconshoppingcart_shopname:before {
  content: "\e68a";
}

.iconproductrecommendation_line:before {
  content: "\e68b";
}

.iconevaluate_uploadpictures_deleto:before {
  content: "\e68c";
}

.iconevaluate_uploadpictures:before {
  content: "\e68d";
}

.iconclassification_line:before {
  content: "\e68e";
}

.iconpersonalcenter_clearcache:before {
  content: "\e68f";
}

.iconaftersalesdetails-refund:before {
  content: "\e692";
}

.iconaftersalesdetails-exchangegoods:before {
  content: "\e694";
}

.iconaftersalesdetails-returngoods:before {
  content: "\e696";
}

.iconbtn_subtract:before {
  content: "\e697";
}

.iconbtn_add:before {
  content: "\e698";
}

.iconpopup_close:before {
  content: "\e699";
}

.iconevaluate_star:before {
  content: "\e69a";
}

.iconbtn_arrow:before {
  content: "\e69b";
}

.iconaddress_edit:before {
  content: "\e69c";
}

.iconbtn_select:before {
  content: "\e69d";
}

.iconnav_home_selected:before {
  content: "\e66a";
}

.iconnav_personalcenter_selected:before {
  content: "\e66c";
}

.iconnav_shoppingcart_normal:before {
  content: "\e66d";
}

.iconnav_home_normal:before {
  content: "\e66e";
}

.iconnav_classification_selected:before {
  content: "\e66f";
}

.iconnav_shoppingcart_selected:before {
  content: "\e670";
}
</style>