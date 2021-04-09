<template>
    <el-form v-loading="loading" label-width="160px" :model="form" class="le-matter" ref="form" :rules="rules"
             @submit.native.prevent>
        <div class="le-arrow" v-if="step === 0 || step === 1">
            <ul>
                <li class="active" style="z-index: 3;cursor:pointer;" @click="editSwitch('first')">
                    <div class="center">1.编辑商品信息</div>
                </li>
                <li :class="step > 0 ? 'active' : ''"
                    :style="form.status === 0?'z-index: 2;cursor:pointer;':'z-index: 2;'" @click="editSwitch('second')">
                    <div class="center">2.编辑商品详情</div>
                </li>
            </ul>
        </div>
        <el-tabs class="le-tabs" v-model="activeName" type="card" v-if="step !== 1 && step !== 2">
            <el-tab-pane label="基本信息" name="first">
                <addBasic v-model="form"/>
            </el-tab-pane>
            <el-tab-pane lazy label="价格库存" name="second" :disabled="!(form.status === 0 || form.status >= 1)">
                <addPrice v-model="form" ref="addPrice"/>
            </el-tab-pane>
            <el-tab-pane lazy label="物流设置" name="third" :disabled="!(form.status === 0 || form.status >= 2)">
                <addLogistic v-model="form"/>
            </el-tab-pane>
            <el-tab-pane label="其他设置" name="fourth" :disabled="!(form.status === 0 || form.status >= 3)">
                <addOther v-model="form"/>
            </el-tab-pane>
        </el-tabs>
        <template v-if="step === 1">
            <goodsEditor v-model="form.body.content"></goodsEditor>
        </template>
        <template v-if="step === 2">
            <goodsPreview :form="form"></goodsPreview>
        </template>
        <div class="le-cardpin">
            <el-button @click="preview" v-if="step === 1">预览</el-button>
            <el-button v-if="step === 0" @click="onSave(false)">保存</el-button>
            <el-button type="primary" @click="onSave(true)" v-if="step === 0">下一步</el-button>
            <el-button @click="previous" v-if="step === 1">上一步</el-button>
            <el-button @click="editSwitch('second')" v-if="step === 2">继续编辑</el-button>
            <el-button type="primary" @click="release" v-if="step === 1">保存商品</el-button>
            <el-button type="primary" @click="onSale" v-if="step === 2 && form.is_sale === 0">立即上架</el-button>
        </div>
        <heloading :show="load"></heloading>
    </el-form>
</template>
<script type="text/javascript">
import addBasic from "./components/addBasic.vue";
import addPrice from "./components/addPrice.vue";
import addLogistic from "./components/addLogistic.vue";
import addMarketing from "./components/addMarketing.vue";
import addOther from "./components/addOther.vue";
import goodsEditor from "./components/goodsEditor.vue";
import goodsPreview from "./components/goodsPreview.vue";
import heloading from "@/components/heloading2.vue";

export default {
    components: {
        addBasic,
        addPrice,
        addLogistic,
        addMarketing,
        addOther,
        goodsEditor,
        goodsPreview,
        heloading
    },
    data() {
        return {
            rules: {
                group: [
                    {required: true, message: '请选择商品分类', trigger: 'blur'}
                ],
                video: [
                    {required: true, message: '请选择主视频', trigger: 'change'}
                ],
                resource: [
                    {required: true, message: '请选择商品分类', trigger: 'change'}
                ],
                slideshow: [
                    {required: true, message: '请选择商品轮播图', trigger: 'change'}
                ],
                video_cover: [
                    {required: true, message: '请选择视频封面', trigger: 'change'}
                ],
                'price': [
                    {required: true, message: '请输入商品价格', trigger: "blur"}
                ],
                'param.param_data[0].value[0].value': [
                    {required: true, message: '请输入规格值', trigger: "blur"}
                ],
                stocks: [
                    {required: true, message: '请输入商品库存', trigger: 'blur'}
                ],
                unit: [
                    {required: true, message: '请输入商品单位', trigger: 'blur'}
                ],
                param_type: [
                    {required: true, message: '请选择规格', trigger: 'blur'}
                ]
            },
            load: false,
            step: 0,
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            activeName: 'first',
            form: {
                id: null,
                group: [],
                param: {
                    goods_data: [{
                        param_value: '',
                        price: '',
                        stocks: 1000,
                        cost_price: '',
                        weight: '',
                        goods_sn: ''
                    }],
                    param_data: [{
                        name: '',
                        image_status: false,
                        value: [{
                            value: '',
                            image: ''
                        }]
                    }]
                },
                param_type: 1,
                body: {
                    content: ''
                },
                pfr_id: null,
                video_cover: '',
                video: '',
                status: null,
                is_sale: 0,
                is_video: 0,
                slideshow: [],
                services: [],
                ft_type: 1,
                limit_buy_type: "day",
                unit: '件'
            },
            loading: false
        }
    },
    async mounted() {
        let id = this.$heshop.utils.getQueryVariable('id');
        if (id) this.getDetail(parseInt(id));
    },
    methods: {
        editSwitch(v) {
            if (v == 'second') {
                if (this.form.status !== 0) {
                    return;
                }
                this.step = 1;
            } else {
                this.step = 0;
            }
        },
        previous() {
            this.step = 0;
        },
        preview() {
            this.step = 2;
        },
        onSale() {
            this.form.is_sale = 1;
            this.saveDetail('form').then(() => {
                this.$message.success('上架成功');
            });
        },
        onSave(nextStep = false) {
            this.saveDetail('form').then(() => {
                if (nextStep) {
                    if (this.activeName === 'first') {
                        this.activeName = 'second';
                    } else if (this.activeName === 'second') {
                        this.activeName = 'third';
                    } else if (this.activeName === 'third') {
                        this.activeName = 'fourth';
                    } else {
                        this.step = 1;
                    }
                } else {
                    if (this.form.status === 0) {
                        this.$message.success('保存成功');
                    } else {
                        this.$message.success('已保存到草稿箱');
                    }
                }
            })
        },
        saveDetail(formName) {
            let _this = this;
            return new Promise(function (resolve, reject) {
                _this.$refs[formName].validate(function () {
                    let {
                        param_type,
                        unit,
                        line_price,
                        price,
                        stocks,
                        virtual_sales,
                        param,
                        ft_id,
                        ft_price,
                        pfr_id,
                        ft_type,
                        limit_buy_status,
                        limit_buy_type,
                        limit_buy_value,
                        min_number,
                        is_sale,
                        services,
                        name,
                        id,
                        group,
                        slideshow,
                        is_video,
                        video,
                        video_cover
                    } = _this.form;
                    let behavior = '';
                    let putData = {};
                    if (!name) {
                        _this.$message.error("请输入商品名称");
                        return;
                    }
                    if (group.length === 0) {
                        _this.$message.error("请选择商品分类");
                        return;
                    }
                    if (video.length === 0 && is_video === 1) {
                        _this.$message.error("请选择主视频");
                        return;
                    }
                    if (!video_cover && is_video === 1) {
                        _this.$message.error("视频封面不能为空");
                        return;
                    }
                    switch (_this.activeName) {
                        case "first": {
                            let newGroup = _this.$heshop.utils.deepClone(group);

                            let newVideo = _this.$heshop.utils.deepClone(video);
                            let group_array = newGroup.map(item => {
                                return item;
                            });
                            behavior = 'basicsetting';
                            putData = {
                                name,
                                group: group_array,
                                slideshow,
                                is_video,
                                video: newVideo ? {
                                    url: newVideo.url,
                                    cover: newVideo.cover
                                } : '',
                                video_cover
                            }

                            if (_this.form.id) {
                                _this.$heshop.goods('put', {id, behavior}, putData).then(res => {
                                    _this.form = Object.assign(_this.form, res);
                                    resolve(true);
                                }).catch(err => {
                                    if (err.data[0]) {
                                        err.data.forEach(v => {
                                            _this.$message.error(v.message);
                                        })
                                    } else {
                                        _this.$message.error(err.data.message);
                                    }
                                    reject(false);
                                });
                            } else {
                                _this.$heshop.goods('post', putData).then(res => {
                                    _this.form = Object.assign(_this.form, res);
                                    resolve(true);
                                }).catch(err => {
                                    if (err.data[0]) {
                                        _this.$message.error(err.data[0].message);
                                    } else {
                                        _this.$message.error(err.data.message);
                                    }
                                    reject(false);
                                });
                            }
                            break;
                        }
                        case 'second':
                            let error = [];
                            if (param.goods_data.length === 1 && param.param_data.length === 0) {

                                param.param_data = [{
                                    name: '',
                                    value: {
                                        value: param.goods_data[0].param_value,
                                        image: ''
                                    }
                                }];
                            }
                            if (param_type == 2) {
                                error = _this.$refs.addPrice.handleDataCheck();
                                if (error.length > 0) {
                                    _this.$message.error(error[0]);
                                    return;
                                }
                            } else {
                                if (!param.goods_data[0].param_value) {
                                    _this.$message.error("请输入商品规格值");
                                    return;
                                }
                                if (!param.goods_data[0].price && param.goods_data[0].price != 0) {
                                    _this.$message.error("请输入商品价格");
                                    return;
                                }
                            }
                            if (!stocks && stocks != 0) {
                                _this.$message.error("请输入商品库存");
                                return;
                            }
                            if (!unit) {
                                _this.$message.error("请输入商品单位");
                                return;
                            }
                            behavior = 'paramsetting';
                            putData = {
                                param_type,
                                param_data: param.param_data,
                                goods_data: JSON.stringify(param.goods_data),
                                unit,
                                virtual_sales,
                                line_price,
                                price,
                                stocks
                            }
                            break;
                        case 'third':
                            behavior = 'logisticssetting';
                            putData = {
                                ft_type,
                                pfr_id,
                                ft_price,
                                ft_id
                            }
                            break;
                        case 'fourth':
                            behavior = 'othersetting';
                            putData = {
                                limit_buy_type,
                                limit_buy_value,
                                min_number,
                                limit_buy_status,
                                is_sale,
                                services
                            }
                            break;
                    }
                    if (_this.activeName === 'second' || _this.activeName === 'third' || _this.activeName === 'fourth') {
                        _this.$heshop.goods('put', {id, behavior}, putData).then(res => {
                            _this.form = Object.assign(_this.form, res);
                            resolve(true);
                        }).catch(err => {
                            if (err.data[0]) {
                                err.data.forEach(v => {
                                    _this.$message.error(v.message);
                                });
                            } else {
                                _this.$message.error(err.data.message);
                            }
                            reject(false);
                        });
                    }
                });
            });
        },
        release() {
            this.$heshop.goods('put', {
                id: this.form.id,
                behavior: 'bodysetting'
            }, {content: this.form.body.content}).then(() => {
                this.$message.success('保存成功');
                this.$router.push({
                    path: '/goods/index'
                });
            }).catch(err => {
                if (err.data[0]) {
                    err.data.forEach(v => {
                        this.$message.error(v.message);
                    })
                } else {
                    this.$message.error(err.data.message);
                }
            })
        },
        getDetail(id) {
            this.loading = true;
            this.$heshop.goods('get', id).then(res => {
                let {param} = res;
                let goods_data = param.goods_data;
                for (let i = 0; i < goods_data.length; i++) {
                    let param_value = goods_data[i].param_value;
                    let arr = param_value.split('_');
                    let newArr = [];
                    arr.forEach(item => {
                        newArr.push({
                            value: item
                        });
                    });
                    goods_data[i].attrList = newArr;
                }
                if (res.param.goods_data.length === 0) {
                    res.param = {
                        goods_data: [{
                            param_value: '',
                            price: 0,
                            stocks: 1000,
                            cost_price: 0,
                            weight: 0,
                            goods_sn: ''
                        }],
                        param_data: [{
                            name: '',
                            image_status: false,
                            value: [{
                                value: '',
                                image: ''
                            }]
                        }]
                    }
                }
                res.video = res.video ? res.video : {}
                this.form = res;
                this.loading = false;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    }
};
</script>
<style>
.le-matter .le-cardpin {
    z-index: 3000;
}

.le-tabs {
    margin-top: 24px;
}
</style>