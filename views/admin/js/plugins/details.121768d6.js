(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["plugins/details"],{"234d":function(s,t,i){"use strict";i("3b9f")},"3b9f":function(s,t,i){},5246:function(s,t,i){"use strict";i.r(t);var n=function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"plugins-details"},[i("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[i("el-breadcrumb-item",{staticClass:"el-icon-arrow_start"},[i("a",{attrs:{href:"javascript:void(history.back())"}},[s._v(" "+s._s(s.plugins[s.keyword].menu)+" ")])]),i("el-breadcrumb-item",[s._v(s._s(s.plugins[s.keyword].title))])],1),i("div",{staticClass:"plugins-details__header"},[i("img",{staticClass:"__header_cover",attrs:{src:s.plugins[s.keyword].cover,alt:""}}),i("h3",{staticClass:"__header_title"},[s._v(s._s(s.plugins[s.keyword].title))]),i("p",{staticClass:"__header_declare"},[s._v(s._s(s.plugins[s.keyword].details))])]),i("div",{staticClass:"plugins-details__body"},[i("h3",{staticClass:"__header_title"},[s._v("应用详情")]),i("div",{staticClass:"flex justify-center"},[i("img",{attrs:{src:s.plugins[s.keyword].body}})])])],1)},e=[],a=(i("61d9"),i("4822"),{data:function(){return{keyword:"task",plugins:{task:{link:"/plugins/tools",menu:"用户维护",name:"task",title:"任务中心",details:"任务中心”通过激励用户在商城完成任务，获得积分，使用积分兑换商品，达到增强用户粘性的目的。任务的设置有获取用户信息、促进每日活跃、提高订单转化三个方向，为商家维护用户提供强大的工具。",path:"/plugins/task/index",cover:"http://qmxq.oss-cn-hangzhou.aliyuncs.com/plugins/plugins-task-icon.png",body:"http://qmxq.oss-cn-hangzhou.aliyuncs.com/plugins/plugins-task-body.png"},coupon:{link:"/plugins/features",menu:"营销玩法",name:"coupon",title:"优惠券",details:"买家持优惠券享受减免优惠",path:"/plugins/coupon/index",cover:"http://qmxq.oss-cn-hangzhou.aliyuncs.com/plugins/plugins-coupon-icon.png",body:"http://qmxq.oss-cn-hangzhou.aliyuncs.com/plugins/plugins-coupon-body.png"},live:{link:"/plugins/practical",menu:"实用工具",name:"coupon",title:"小程序直播",details:"跟上直播热潮，与观众实时互动",path:"/plugins/coupon/index",cover:"http://qmxq.oss-cn-hangzhou.aliyuncs.com/plugins/plugins-live-icon.png",body:"http://qmxq.oss-cn-hangzhou.aliyuncs.com/plugins/plugins-live-body.png"},evaluation:{link:"/plugins/practical",menu:"实用工具",name:"coupon",title:"评价助手",details:"用好口碑提高订单转化率",path:"/plugins/coupon/index",cover:"http://qmxq.oss-cn-hangzhou.aliyuncs.com/plugins/plugins-evaluation-icon.png",body:"http://qmxq.oss-cn-hangzhou.aliyuncs.com/plugins/plugins-evaluation-body.png"}}}},mounted:function(){var s;this.keyword=this.$route.query.keyword,"coupon"===this.keyword?s="/plugins/features":"task"===this.keyword?s="/plugins/tools":("live"===this.keyword||"evaluation"===this.keyword)&&(s="/plugins/practical"),this.$route.meta.activeMenu=s,this.$router.replace({meta:{activeMenu:s}}),this.$router.replace({query:{keyword:this.keyword}})},methods:{toUrl:function(){}}}),o=a,l=(i("234d"),i("cba8")),u=Object(l["a"])(o,n,e,!1,null,"f8c59de0",null);t["default"]=u.exports}}]);