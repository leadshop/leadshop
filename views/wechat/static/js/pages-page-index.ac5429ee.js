(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-page-index"],{"0ad7":function(a,t,e){var n=e("549e");"string"===typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);var o=e("b41b").default;o("9831e2be",n,!0,{sourceMap:!1,shadowMode:!1})},"3ebc":function(a,t,e){"use strict";var n=e("fe5c").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("23d2");var o=n(e("4b77")),c=n(e("4bc6")),d=n(e("5830")),i=n(e("9990")),s=n(e("23f8")),r=n(e("ae01")),f=n(e("ed5e")),l=n(e("857d")),u=n(e("29c6")),p=n(e("d545")),g=n(e("30bc")),h=n(e("05a7")),m=n(e("b43a")),v=n(e("564e5")),b=n(e("8bb2")),x={components:{videos:d.default,separate:i.default,blank:s.default,banner:r.default,search:f.default,goods:l.default,advertising:u.default,navigation:c.default,tabs:p.default,titles:o.default,rubik:g.default,notice:h.default,coupon:m.default,task:v.default,HeLoginModel:b.default},data:function(){return{page:[]}},onShow:function(a){if(this.$scope&&this.$scope.options.id){var t=this.$scope.options.id;this.handlePageLoading(t)}if(this.options&&this.options.id){var e=this.options.id;this.handlePageLoading(e)}},methods:{handlePageLoading:function(a){var t="micropage"+a;try{var e=this.getStorageSync(t);e?(uni.setNavigationBarTitle({title:e.name}),document.title=e.name,this.page=JSON.parse(e.content),console.log(this.page),this.handleLoadData(e,a,t)):(console.log("打野"),this.handleLoadData(null,a,t))}catch(n){this.handleLoadData(null,a,t)}},handleLoadData:function(a,t,e){var n=this;console.log("dii"),this.$heshop.pages("GET",parseInt(t)).then((function(t){uni.setNavigationBarTitle({title:t.name}),document.title=t.name,console.log(t),console.log("bshh"),a&&n.$heshop.MD5(a)==n.$heshop.MD5(t)||(console.log("tamd "),n.page=JSON.parse(t.content),uni.setStorageSync(e,t),console.log(n.page))})).catch((function(a){console.log(a)}))},handlePageUpdate:function(){}}};t.default=x},4351:function(a,t,e){"use strict";e.r(t);var n=e("5bfe"),o=e("a70a");for(var c in o)["default"].indexOf(c)<0&&function(a){e.d(t,a,(function(){return o[a]}))}(c);e("9c76");var d,i=e("522a"),s=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,"4a62e5dc",null,!1,n["a"],d);t["default"]=s.exports},"549e":function(a,t,e){var n=e("a1a8");t=n(!1),t.push([a.i,".pages[data-v-4a62e5dc]{width:100%;overflow-x:hidden}",""]),a.exports=t},"5bfe":function(a,t,e){"use strict";var n;e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return c})),e.d(t,"a",(function(){return n}));var o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-uni-scroll-view",{staticClass:"pages"},[a._l(a.page,(function(t,n){return e("v-uni-view",{key:n},["title"==t.name?e("titles",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"navigation"==t.name?e("navigation",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"video"==t.name?e("videos",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"banner"==t.name?e("banner",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"search"==t.name?e("search",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"goods"==t.name?e("goods",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"blank"==t.name?e("blank",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"tabs"==t.name?e("tabs",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):"rubik"===t.name?e("rubik",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"advertising"==t.name?e("advertising",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"notice"==t.name?e("notice",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"separate"==t.name?e("separate",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"coupon"==t.name?e("coupon",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e(),"task"==t.name?e("task",{tag:"component",attrs:{facade:t.facade,content:t.content,"data-index":n}}):a._e()],1)})),e("HeLoginModel")],2)},c=[]},"9c76":function(a,t,e){"use strict";var n=e("0ad7"),o=e.n(n);o.a},a70a:function(a,t,e){"use strict";e.r(t);var n=e("3ebc"),o=e.n(n);for(var c in n)["default"].indexOf(c)<0&&function(a){e.d(t,a,(function(){return n[a]}))}(c);t["default"]=o.a}}]);