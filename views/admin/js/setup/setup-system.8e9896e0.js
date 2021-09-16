(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["setup/setup-system"],{"0060":function(e,t,i){},"0ef9":function(e,t,i){"use strict";i.r(t);var s,o,a,l,r,c,n,m,u=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"le-main"},[i("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading||e.submitLoading,expression:"loading || submitLoading"}],ref:"ruleForm",staticClass:"le-card",attrs:{model:e.form,rules:e.rules,"label-width":"160px"}},[i("el-form-item",{attrs:{label:"存储位置"}},[i("el-radio-group",{on:{change:e.switchChange},model:{value:e.way,callback:function(t){e.way=t},expression:"way"}},[i("el-radio",{attrs:{label:0}},[e._v("本地服务器")]),i("el-radio",{attrs:{label:1}},[e._v("阿里云OSS")]),i("el-radio",{attrs:{label:2}},[e._v("腾讯云COS")]),i("el-radio",{attrs:{label:3}},[e._v("七牛云存储")])],1)],1),0===e.way?[i("el-form-item",{staticClass:"le-tip",attrs:{label:"",prop:""}},[e._v("选择存储到本地服务器，无需配置信息")])]:e._e(),1===e.way?[i("el-form-item",{key:"oss_bucket",attrs:{prop:"oss.bucket",label:" 存储空间名称(Bucket)"}},[i("el-input",{attrs:{placeholder:"请输入存储空间名称"},model:{value:e.form.oss.bucket,callback:function(t){e.$set(e.form.oss,"bucket",t)},expression:"form.oss.bucket"}})],1),i("el-form-item",{key:"oss_is_cname",attrs:{label:"使用自定义域名",prop:"is_cname"}},[i("el-switch",{attrs:{activeValue:!0,inactiveValue:!1},model:{value:e.form.oss.is_cname,callback:function(t){e.$set(e.form.oss,"is_cname",t)},expression:"form.oss.is_cname"}})],1),i("el-form-item",{key:"oss_domain",attrs:{prop:"oss.domain",label:"域名(Endpoint)"}},[i("el-input",{attrs:{placeholder:"请输入域名"},model:{value:e.form.oss.domain,callback:function(t){e.$set(e.form.oss,"domain",t)},expression:"form.oss.domain"}}),i("div",{staticClass:"le-prompt-text"},[e._v(" 示例: http://oss-xx-xxx-1.aliyuncs.com 或 http://mydomain.com ")])],1),i("el-form-item",{key:"oss_access_key",attrs:{label:"AccessKey ID",prop:"oss.access_key"}},[i("el-input",{attrs:{placeholder:"请输入AccessKey ID"},model:{value:e.form.oss.access_key,callback:function(t){e.$set(e.form.oss,"access_key",t)},expression:"form.oss.access_key"}})],1),i("el-form-item",{key:"oss_secret_key",attrs:{label:"AccessKey Secret",prop:"oss.secret_key"}},[i("el-input",{attrs:{placeholder:"请输入AccessKey Secret"},model:{value:e.form.oss.secret_key,callback:function(t){e.$set(e.form.oss,"secret_key",t)},expression:"form.oss.secret_key"}})],1)]:e._e(),2===e.way?[i("el-form-item",{key:"cos_bucket",attrs:{prop:"cos.bucket",label:"存储空间名称(Bucket)"}},[i("el-input",{attrs:{placeholder:"请输入存储空间名称"},model:{value:e.form.cos.bucket,callback:function(t){e.$set(e.form.cos,"bucket",t)},expression:"form.cos.bucket"}})],1),i("el-form-item",{key:"cos_region",attrs:{prop:"cos.region",label:"所属地域"}},[i("el-input",{attrs:{placeholder:"请输入所属地域"},model:{value:e.form.cos.region,callback:function(t){e.$set(e.form.cos,"region",t)},expression:"form.cos.region"}}),i("div",{staticClass:"le-prompt-text"},[e._v(" 示例: ap-shanghai 或 ap-shenzhen 或 ap-xxxxxx ")])],1),i("el-form-item",{key:"cos_domain",attrs:{label:"自定义域名",prop:""}},[i("el-input",{attrs:{placeholder:"请输入域名"},model:{value:e.form.cos.domain,callback:function(t){e.$set(e.form.cos,"domain",t)},expression:"form.cos.domain"}}),i("div",{staticClass:"le-prompt-text"},[e._v("示例: http://mydomain.com")])],1),i("el-form-item",{key:"cos_secret_id",attrs:{label:"Secretld",prop:"cos.secret_id"}},[i("el-input",{attrs:{placeholder:"请输入Secretld"},model:{value:e.form.cos.secret_id,callback:function(t){e.$set(e.form.cos,"secret_id",t)},expression:"form.cos.secret_id"}})],1),i("el-form-item",{attrs:{label:"SecretKey",prop:"cos.secret_key",Key:"cos_secret_key"}},[i("el-input",{attrs:{placeholder:"请输入SecretKey"},model:{value:e.form.cos.secret_key,callback:function(t){e.$set(e.form.cos,"secret_key",t)},expression:"form.cos.secret_key"}})],1)]:e._e(),3===e.way?[i("el-form-item",{key:"qinin_bucket",attrs:{prop:"qiniu.bucket",label:" 存储空间名称(Bucket)"}},[i("el-input",{attrs:{placeholder:"请输入存储空间名称"},model:{value:e.form.qiniu.bucket,callback:function(t){e.$set(e.form.qiniu,"bucket",t)},expression:"form.qiniu.bucket"}})],1),i("el-form-item",{key:"qinin_domain",attrs:{prop:"qiniu.domain",label:"绑定域名"}},[i("el-input",{attrs:{placeholder:"请输入域名"},model:{value:e.form.qiniu.domain,callback:function(t){e.$set(e.form.qiniu,"domain",t)},expression:"form.qiniu.domain"}}),i("div",{staticClass:"le-prompt-text"},[e._v(" 示例: http://mydomain.com 或 http://xxxxxx.bkt.clouddn.com ")])],1),i("el-form-item",{key:"qiniu_access_key",attrs:{label:"AccessKey(AK)",prop:"qiniu.access_key"}},[i("el-input",{attrs:{placeholder:"请输入AccessKey(AK)"},model:{value:e.form.qiniu.access_key,callback:function(t){e.$set(e.form.qiniu,"access_key",t)},expression:"form.qiniu.access_key"}})],1),i("el-form-item",{key:"qiniu_secret_key",attrs:{label:"SecretKey(SK)",prop:"qiniu.secret_key"}},[i("el-input",{attrs:{placeholder:"请输入SecretKey(SK)"},model:{value:e.form.qiniu.secret_key,callback:function(t){e.$set(e.form.qiniu,"secret_key",t)},expression:"form.qiniu.secret_key"}})],1)]:e._e()],2),i("div",{staticClass:"le-cardpin"},[i("el-button",{attrs:{type:"primary",disabled:e.loading,loading:e.submitLoading},on:{click:e.submit}},[e._v(" 保存 ")])],1)],1)},d=[],p=(i("2769"),i("ecf1"),{name:"cloud-storage",data:function(){return{loading:!1,submitLoading:!1,way:0,form:{local:{},oss:{bucket:"",domain:"",is_cname:!0,access_key:"",secret_key:""},cos:{bucket:"",region:"",secret_id:"",secret_key:"",domain:""},qiniu:{bucket:"",domain:"",access_key:"",secret_key:""}},rules:{"oss.bucket":[{required:!0,message:"请输入存储空间名称",trigger:"blur"}],"qiniu.bucket":[{required:!0,message:"请输入存储空间名称",trigger:"blur"}],"cos.bucket":[{required:!0,message:"请输入存储空间名称",trigger:"blur"}],"oss.domain":[{required:!0,message:"请绑定域名",trigger:"blur"}],"qiniu.domain":[{required:!0,message:"请输入域名",trigger:"blur"}],"oss.access_key":[{required:!0,message:"请输入access_key",trigger:"blur"}],"oss.secret_key":[{required:!0,message:"请输入secret_key",trigger:"blur"}],"cos.region":[{required:!0,message:"请输入所属地域",trigger:"blur"}],"cos.secret_id":[{required:!0,message:"请输入Secretld",trigger:"blur"}],"cos.secret_key":[{required:!0,message:"请输入secret_key",trigger:"blur"}],"qiniu.secret_key":[{required:!0,message:"请输入SecretKey(SK)",trigger:"blur"}],"qiniu.access_key":[{required:!0,message:"请输入AccessKey(AK)",trigger:"blur"}]}}},methods:{switchChange:function(){this.$refs.ruleForm.resetFields()},submit:function(){var e=this;this.$refs["ruleForm"].validate((function(t){if(!t)return!1;e.submitLoading=!0,e.$heshop.setting("post",{keyword:"storage_setting",content:{way:e.way,config:e.form}}).then((function(){e.submitLoading=!1,e.$message.success("保存成功")})).catch((function(t){e.submitLoading=!1,e.$message.error(t.data.message)}))}))},getSetting:function(){var e=this;this.$heshop.search("post",{include:"setting"},{keyword:"storage_setting"}).then((function(t){e.loading=!1,e.form=t.content.config,e.way=t.content.way})).catch((function(t){e.loading=!1,e.$message.error(t.data.message)}))}},mounted:function(){this.getSetting()}}),f=p,_=(i("aec7"),i("4ac2")),g=Object(_["a"])(f,u,d,!1,null,"35ad8e02",null),b=g.exports,h=i("1c03"),v=i("4c02"),y=i.n(v),k=(i("0756"),i("e1d4"),i("7736")),x=Object(k["a"])("setting"),$=x.mapMutations,w={data:function(){var e=this,t=function(t,i,s){e.form.is_pic_limit||i||s("请输入图片大小限制"),s()},i=function(t,i,s){e.form.is_video_limit||i||s("请输入视频大小限制"),s()};return{loading:!0,submitLoading:!1,form:{is_pic_limit:!1,pic_limit:2,is_video_limit:!1,video_limit:5},rules:{pic_limit:[{required:!0,validator:t}],video_limit:[{required:!0,validator:i}]}}},render:function(){var e=this,t=arguments[0],i=this;return t("div",{class:"le-main"},[t("el-form",y()([{class:"le-card",ref:"ruleForm"},{props:{model:this.form,rules:this.rules,labelWidth:"190px"}},{directives:[{name:"loading",value:this.loading||this.submitLoading}]}]),[t("div",{class:"le-prompt"},["温馨提示：为了保障服务器性能及用户体验，请谨慎填写限制！此处的限制需要与服务器的限制相匹配，否则将无法生效。"]),t("el-form-item",{attrs:{label:"图片大小限制",prop:"pic_limit"}},[t("el-radio-group",y()([{},{on:{change:function(e){e&&(i.form.pic_limit=null)}}},{model:{value:e.form.is_pic_limit,callback:function(t){e.$set(e.form,"is_pic_limit",t)}}}]),[t("el-radio",{attrs:{label:!1}},["限制"]),t("el-radio",{attrs:{label:!0}},["无限制"])]),t("div",{class:"le-form-input"},[t("el-input",y()([{attrs:{maxlength:10}},{on:{input:function(e){e=e.replace(/\D|^0/g,""),i.form.pic_limit=e}}},{attrs:{value:this.form.pic_limit,disabled:this.form.is_pic_limit}}]),[t("template",{slot:"append"},["MB"])])])]),t("el-form-item",{attrs:{label:"视频大小限制",prop:"video_limit"}},[t("el-radio-group",y()([{},{on:{change:function(e){e&&(i.form.video_limit=null)}}},{model:{value:e.form.is_video_limit,callback:function(t){e.$set(e.form,"is_video_limit",t)}}}]),[t("el-radio",{attrs:{label:!1}},["限制"]),t("el-radio",{attrs:{label:!0}},["无限制"])]),t("div",{class:"le-form-input"},[t("el-input",y()([{attrs:{maxlength:10}},{on:{input:function(e){e=e.replace(/\D|^0/g,""),i.form.video_limit=e}}},{attrs:{value:this.form.video_limit,disabled:this.form.is_video_limit}}]),[t("template",{slot:"append"},["MB"])])])])]),t("div",{class:"le-cardpin"},[t("el-button",{attrs:{type:"primary",disabled:this.loading,loading:this.submitLoading},on:{click:this.submit}},["保存"])])])},mounted:function(){this.getSetting()},methods:Object(h["a"])(Object(h["a"])({},$(["setStorage"])),{},{submit:function(){var e=this;this.$refs["ruleForm"].validate((function(t){if(!t)return!1;var i=JSON.parse(JSON.stringify(e.form));i.is_pic_limit&&(i.pic_limit=-1),i.is_video_limit&&(i.video_limit=-1),i.pic_limit=Number(i.pic_limit),i.video_limit=Number(i.video_limit),delete i.is_pic_limit,delete i.is_video_limit,e.submitLoading=!0,e.$heshop.setting("post",{keyword:"storage_limit",content:i}).then((function(){e.submitLoading=!1,e.setStorage(i),e.$message.success("保存成功")})).catch((function(t){e.submitLoading=!1,e.$message.error(t.data.message)}))}))},getSetting:function(){var e=this;this.$heshop.search("post",{include:"setting"},{keyword:"storage_limit"}).then((function(t){var i=t.content,s=i.pic_limit,o=i.video_limit;-1===s?e.form.is_pic_limit=!0:e.form.pic_limit=s,-1===o?e.form.is_video_limit=!0:e.form.video_limit=o,e.loading=!1})).catch((function(t){e.loading=!1,e.$message.error(t.data.message)}))}})},q=w,S=(i("b3e7"),Object(_["a"])(q,s,o,!1,null,"2d96a187",null)),L=S.exports,K={data:function(){return{loading:!0,submitLoading:!1,form:{ico_url:"",record_number_a:"",record_number_b:""}}},render:function(){var e=this,t=arguments[0];return t("div",[t("el-form",{attrs:{"label-width":"200px"},directives:[{name:"loading",value:this.loading}]},[t("div",{class:"le-card"},[t("div",{class:"le-head flex align-center"},[t("span",{class:"le-title-line"}),t("span",{class:"le-title"},["favicon.ico上传"])]),t("el-form-item",{attrs:{label:"ico上传"}},[t("div",{class:"select-cover__120"},[t("div",{class:"select-cover__120-add"},[t("input",{attrs:{type:"file",id:"file-input",accept:"image/x-png"},on:{change:this.handleFileChange},class:"le-file-input"}),t("i",{class:"le-icon le-icon-add select-cover__120-icon"}),t("span",{class:"select-cover__120-text"},["添加图片"])]),function(){if(e.form.ico_url)return t("div",{class:"select-cover__120-edit"},[t("el-image",{attrs:{src:e.form.ico_url,fit:"cover"}}),t("div",{class:"select-cover__120-tips"},[t("span",{on:{click:function(){document.getElementById("file-input").click()}}},["替换"])," ","|",t("span",{on:{click:function(){event.stopPropagation(),e.form.ico_url="",document.getElementById("file-input").value=null}}},["删除"])])])}()]),t("div",{class:"le-prompt-text"},["仅支持.ico格式文件，尺寸要求32*32像素，大小不超过100kb"])])]),t("div",{class:"le-card"},[t("div",{class:"le-head flex align-center"},[t("span",{class:"le-title-line"}),t("span",{class:"le-title"},["备案信息"])]),t("div",{class:"le-tip"},["应工信部的要求，请务必填写公安备案号和网站备案号，保存的备案信息，将展示在后台登录页面。"]),t("el-form-item",{attrs:{label:"公安备案号"}},[t("el-input",{attrs:{placeholder:"请输入公安备案号"},model:{value:e.form.record_number_a,callback:function(t){e.$set(e.form,"record_number_a",t)}}})]),t("el-form-item",{attrs:{label:"网站备案号(ICP)"}},[t("el-input",{attrs:{placeholder:"请输入网站备案号"},model:{value:e.form.record_number_b,callback:function(t){e.$set(e.form,"record_number_b",t)}}})])])]),t("div",{class:"le-cardpin"},[t("el-button",{attrs:{type:"primary",disabled:this.loading,loading:this.submitLoading},on:{click:this.submit}},["保存"])])])},methods:{submit:function(){var e=this;this.submitLoading=!0,this.$heshop.setting("post",{keyword:"web_setting",content:this.form}).then((function(){e.submitLoading=!1,e.$message.success("保存成功")})).catch((function(t){e.$message.error(t.data.message)}))},handleFileChange:function(e){var t=e.target.files[0];if(t.size>102400)return this.$message({type:"error",message:"ico大小超过100kb，请重新上传"}),void(e.target.value=null);var i=new FormData,s=this;i.append("file",t,"favicon.ico"),this.$heshop.file(i,{behavior:"upload"}).then((function(t){e.target.value=null,s.form.ico_url="",s.$nextTick((function(){s.form.ico_url=t+"?".concat((new Date).getTime())}))})).catch((function(e){console.error("数据出出力",e)}))},getDetail:function(){var e=this;this.$heshop.search("post",{include:"setting"},{keyword:"web_setting"}).then((function(t){t&&(e.form=t.content),e.loading=!1})).catch((function(t){e.loading=!1,e.$message.error(t.data.message)}))}},mounted:function(){this.getDetail()}},C=K,D=(i("4207"),Object(_["a"])(C,a,l,!1,null,"2300197a",null)),O=D.exports,A=i("f65d"),j=i.n(A),F=Object(k["a"])("setting"),N=F.mapGetters,B={data:function(){return{loading:!0,submitLoading:!1,form:{login_img:"",brand_name:"",admin_copyright_content:"",admin_copyright_icon:"",admin_copyright_link:"",mobile_copyright_content:"",mobile_copyright_icon:""},rules:{admin_copyright_content:[{required:!0,message:"版权内容不能为空",trigger:"blur"}],mobile_copyright_content:[{required:!0,message:"版权内容不能为空",trigger:"blur"}]}}},computed:Object(h["a"])({},N({auth:"getAuth"})),render:function(){var e=this,t=arguments[0];return t("div",[function(){if(!e.auth)return t("div",{style:"position: relative;margin-bottom: 24px"},[t("img",{attrs:{src:j.a,width:"100%",height:"296",alt:""}}),t("div",{class:"le-buy-copyright flex flex-direction align-center"},[t("span",["Leadshop微商城授权 - 自定义版权"]),t("el-button",{on:{click:function(){window.open("https://www.leadshop.vip/goods/author")}},attrs:{type:"primary"}},["购买授权"])])])}(),t("el-form",y()([{attrs:{"label-width":"200px"}},{props:{rules:this.rules,model:this.form}},{directives:[{name:"loading",value:this.loading}]}]),[t("div",{class:"le-card"},[t("div",{class:"le-head flex align-center"},[t("span",{class:"le-title-line"}),t("span",{class:"le-title"},["背景图"])]),t("el-form-item",{attrs:{label:"登录页背景图"}},[t("div",{class:"select-cover__120"},[t("pictureDialog",{attrs:{limit:1,disabled:!this.auth},scopedSlots:{upload:function(){return t("div",{class:"select-cover__120-add"},[t("i",{class:"le-icon le-icon-add select-cover__120-icon"}),t("span",{class:"select-cover__120-text"},["添加图片"])])},preview:function(i){return t("div",{class:"select-cover__120-edit"},[t("el-image",{attrs:{src:i.url,fit:"cover"}}),function(){if(e.auth)return t("div",{class:"select-cover__120-tips"},[t("span",["替换"])," |",t("span",{on:{click:function(){event.stopPropagation(),e.form.login_img=""}}},["删除"])])}()])}},model:{value:e.form.login_img,callback:function(t){e.$set(e.form,"login_img",t)}}})]),t("div",{class:"le-prompt-text"},["建议尺寸：400像素*512像素"])]),t("el-form-item",{attrs:{label:"品牌名"}},[t("div",{class:"select-cover__120"},[t("pictureDialog",{attrs:{limit:1,disabled:!this.auth},scopedSlots:{upload:function(){return t("div",{class:"select-cover__120-add"},[t("i",{class:"le-icon le-icon-add select-cover__120-icon"}),t("span",{class:"select-cover__120-text"},["添加图片"])])},preview:function(i){return t("div",{class:"select-cover__120-edit"},[t("el-image",{attrs:{src:i.url,fit:"cover"}}),function(){if(e.auth)return t("div",{class:"select-cover__120-tips"},[t("span",["替换"])," |",t("span",{on:{click:function(){event.stopPropagation(),e.form.brand_name=""}}},["删除"])])}()])}},model:{value:e.form.brand_name,callback:function(t){e.$set(e.form,"brand_name",t)}}})]),t("div",{class:"le-prompt-text"},["建议尺寸：260像素*64像素"])])]),t("div",{class:"le-card"},[t("div",{class:"le-head flex align-center"},[t("span",{class:"le-title-line"}),t("span",{class:"le-title"},["后台版权"])]),t("el-form-item",{attrs:{label:"版权内容",prop:"admin_copyright_content"},key:"admin_copyright_content"},[t("el-input",{attrs:{disabled:!this.auth,placeholder:"请输入版权内容"},model:{value:e.form.admin_copyright_content,callback:function(t){e.$set(e.form,"admin_copyright_content",t)}}})]),t("el-form-item",{attrs:{label:"版权图标"}},[t("div",{class:"select-cover__120"},[t("pictureDialog",{attrs:{limit:1,disabled:!this.auth},scopedSlots:{upload:function(){return t("div",{class:"select-cover__120-add"},[t("i",{class:"le-icon le-icon-add select-cover__120-icon"}),t("span",{class:"select-cover__120-text"},["添加图片"])])},preview:function(i){return t("div",{class:"select-cover__120-edit"},[t("el-image",{attrs:{src:i.url,fit:"cover"}}),function(){if(e.auth)return t("div",{class:"select-cover__120-tips"},[t("span",["替换"])," |",t("span",{on:{click:function(){event.stopPropagation(),e.form.admin_copyright_icon=""}}},["删除"])])}()])}},model:{value:e.form.admin_copyright_icon,callback:function(t){e.$set(e.form,"admin_copyright_icon",t)}}})]),t("div",{class:"le-prompt-text"},["建议尺寸：240像素*48像素，不超过2M"])]),t("el-form-item",{attrs:{label:"版权跳转链接"}},[t("el-input",{attrs:{disabled:!this.auth,placeholder:"请输入版权跳转链接"},model:{value:e.form.admin_copyright_link,callback:function(t){e.$set(e.form,"admin_copyright_link",t)}}})])]),t("div",{class:"le-card"},[t("div",{class:"le-head flex align-center"},[t("span",{class:"le-title-line"}),t("span",{class:"le-title"},["手机端版权"])]),t("el-form-item",{attrs:{label:"版权内容",prop:"mobile_copyright_content"},key:"mobile_copyright_content"},[t("el-input",{attrs:{disabled:!this.auth,placeholder:"请输入版权内容"},model:{value:e.form.mobile_copyright_content,callback:function(t){e.$set(e.form,"mobile_copyright_content",t)}}})]),t("el-form-item",{attrs:{label:"版权图标"}},[t("div",{class:"select-cover__120"},[t("pictureDialog",{attrs:{disabled:!this.auth,limit:1},scopedSlots:{upload:function(){return t("div",{class:"select-cover__120-add"},[t("i",{class:"le-icon le-icon-add select-cover__120-icon"}),t("span",{class:"select-cover__120-text"},["添加图片"])])},preview:function(i){return t("div",{class:"select-cover__120-edit"},[t("el-image",{attrs:{src:i.url,fit:"cover"}}),function(){if(e.auth)return t("div",{class:"select-cover__120-tips"},[t("span",["替换"])," |",t("span",{on:{click:function(){event.stopPropagation(),e.form.mobile_copyright_icon=""}}},["删除"])])}()])}},model:{value:e.form.mobile_copyright_icon,callback:function(t){e.$set(e.form,"mobile_copyright_icon",t)}}})]),t("div",{class:"le-prompt-text"},["建议尺寸：240像素*48像素，不超过2M"])])])]),function(){if(e.auth)return t("div",{class:"le-cardpin"},[t("el-button",{attrs:{type:"primary",disabled:e.loading,loading:e.submitLoading},on:{click:e.submit}},["保存"])])}()])},methods:{submit:function(){var e=this;this.submitLoading=!0,this.$heshop.setting("post",{keyword:"copyright_information",content:this.form}).then((function(){e.submitLoading=!1,e.$message.success("保存成功"),e.$store.state.setting.copyright_information=e.form})).catch((function(t){e.$message.error(t.data.message)}))},getDetail:function(){var e=this;this.$heshop.search("post",{include:"setting"},{keyword:"copyright_information"}).then((function(t){t&&(e.form=t.content),e.loading=!1})).catch((function(t){e.loading=!1,e.$message.error(t.data.message)}))}},mounted:function(){this.getDetail()}},I=B,P=(i("2570"),Object(_["a"])(I,r,c,!1,null,"391d9daa",null)),z=P.exports,E={components:{cloudStorage:b,uploadLimitExceeded:L,siteInformation:O},data:function(){return{activeName:"first"}},render:function(){var e=this,t=arguments[0];return t("div",[t("el-tabs",{class:"le-tabs",model:{value:e.activeName,callback:function(t){e.activeName=t}}},[t("el-tab-pane",{attrs:{label:"站点信息",name:"first"}},[t(O)]),t("el-tab-pane",{attrs:{lazy:!0,label:"云存储",name:"second"}},[t(b)]),t("el-tab-pane",{attrs:{lazy:!0,label:"上传超限",name:"third"}},[t(L)]),t("el-tab-pane",{attrs:{lazy:!0,label:"版权信息",name:"four"}},[t(z)])])])}},M=E,J=(i("52c1"),Object(_["a"])(M,n,m,!1,null,"05b9b43a",null));t["default"]=J.exports},2570:function(e,t,i){"use strict";i("2b59")},"2b59":function(e,t,i){},4207:function(e,t,i){"use strict";i("0060")},"52c1":function(e,t,i){"use strict";i("a8f1")},"7c41":function(e,t,i){},"906f":function(e,t,i){},a8f1:function(e,t,i){},aec7:function(e,t,i){"use strict";i("7c41")},b3e7:function(e,t,i){"use strict";i("906f")},f65d:function(e,t,i){e.exports=i.p+"img/custom-copyright.5f95855f.png"}}]);