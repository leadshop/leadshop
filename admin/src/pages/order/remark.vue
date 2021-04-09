<template>
    <div class="le-matter">
        <div class="le-form-card">
            <el-form :model="keyword" status-icon ref="keyword" label-width="100px">
                <div style="display:flex;flex-wrap: wrap;">
                    <el-form-item label="评价搜索" prop="pass">
                        <el-input v-model="keyword.search" @keyup.enter.native="brush" autocomplete="off"
                                  :placeholder="`输入${placeHolder}搜索`" class="he-searchInput">
                            <el-select v-model="keyword.search_key" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item, index) in selectList" :label="item.label" :value="item.value"
                                           :key="index"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="评价等级" prop="checkPass">
                        <el-select v-model="keyword.level" placeholder="请选择" class="he-select__width">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="好评" value="good"></el-option>
                            <el-option label="中评" value="general"></el-option>
                            <el-option label="差评" value="bad"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="评价时间" prop="checkPass">
                        <div class="el-row--flex">
                            <div class="data-picker">
                                <el-date-picker style="width: 200px" v-model="keyword.time_start_show" type="datetime"
                                                placeholder="开始时间">
                                </el-date-picker>
                            </div>
                            <div class="to">
                                至
                            </div>
                            <div class="data-picker">
                                <el-date-picker style="width: 200px" v-model="keyword.time_end_show" type="datetime"
                                                placeholder="结束时间">
                                </el-date-picker>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="评价状态" prop="age">
                        <el-select v-model="keyword.status" placeholder="请选择" class="he-select__width">
                            <el-option label="全部" :value="''"></el-option>
                            <el-option label="隐藏" :value="0"></el-option>
                            <el-option label="显示" :value="1"></el-option>
                            <el-option label="置顶" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" @click="brush">筛选</el-button>
                            <el-button @click="empty">清空</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="le-line"></div>
        <div class="le-card">
            <el-row>
                <el-col>
                    <el-checkbox class="he-all__check" @change="allCheckEvent" v-model="allCheck"
                                 :indeterminate="indeterminate">当页全选
                    </el-checkbox>
                    <el-button class="setBut" :disabled="checkList.length === 0" action="bulkReply"
                               v-popup.replyReviewsBulk="checkList" module="order" title="批量回复评价" width="480"
                               top="30vh">批量回复
                    </el-button>
                    <popconfirm width="328px" @confirm="bulkTop" title="确认批量置顶选中评价？">
                        <el-button class="setBut" :disabled="checkList.length === 0">批量置顶</el-button>
                    </popconfirm>
                    <popconfirm width="328px" @confirm="batchDisplay" title="确认批量显示选中评价？">
                        <el-button :disabled="checkList.length === 0">批量显示</el-button>
                    </popconfirm>
                    <popconfirm width="328px" @confirm="bulkHide" title="确认批量隐藏选中评价？">
                        <el-button :disabled="checkList.length === 0">批量隐藏</el-button>
                    </popconfirm>
                    <popconfirm width="328px" @confirm="batchDeletion" title="确认批量删除选中评价？">
                        <el-button :disabled="checkList.length === 0">批量删除</el-button>
                    </popconfirm>
                </el-col>
            </el-row>
            <div class="el-row--flex he-header">
                <div class="he-goods">商品</div>
                <div class="he-rating">评价等级</div>
                <div class="he-evaluation">评价内容</div>
                <div class="he-reply">回复内容</div>
            </div>
            <div class="he-body">
                <div class="he-item" :class="item.status === 0 ? 'he-item__hidden' : ''" v-for="(item, index) in list"
                     :key="index">
                    <div class="he-item__header el-row--flex is-justify-space-between">
                        <div>
                            <el-checkbox class="he-check" @change="changeItem" v-model="item.check"></el-checkbox>
                            <span class="he-label">评价时间：</span>
                            <span class="he-value">{{ item.created_time | timeFormat('yyyy-mm-dd hh:MM:ss') }}</span>
                            <span class="he-label">订单号：</span>
                            <span class="he-value">{{ item.order_sn }}</span>
                            <span class="he-value">{{ item.user.nickname }}</span>
                        </div>
                        <div class="el-row--flex is-align-middle">
                            <popconfirm @confirm="displayHidden(item)"
                                        :title="`确认${item.status === 0 ? '显示' : '隐藏'}该评价？`" width="320px" top="30vh">
                                <el-popover placement="top" trigger="hover" :content="item.status === 0 ? '显示': '隐藏'">
                                    <he-icon :type="item.status === 0 ? 'le-icon-hidden' : 'le-icon-eye'" class="he-eye"
                                             slot="reference"></he-icon>
                                </el-popover>
                            </popconfirm>
                            <popconfirm @confirm="setTop(item)" :title="`确认${item.status === 2 ? '取消置顶' : '置顶'}该评价？`"
                                        width="320px" top="30vh">
                                <el-popover placement="top" trigger="hover" :content="item.status === 2 ? '取消置顶': '置顶'">
                                    <he-icon type="le-icon-placed-top" class="he-top"
                                             :class="item.status === 2 ? 'he-top-1' : 'he-top-0'"
                                             slot="reference"></he-icon>
                                </el-popover>
                            </popconfirm>
                            <popconfirm @confirm="deleteItem(item)" title="确认删除该评价？" width="320px" top="30vh">
                                <el-popover placement="top" trigger="hover" content="删除">
                                    <he-icon type="le-icon-trash" :id="item.id + '_delete'" class="he-delete"
                                             slot="reference"></he-icon>
                                </el-popover>
                            </popconfirm>
                        </div>
                    </div>
                    <div class="he-item__body el-row--flex">
                        <div class="he-goods el-row--flex">
                            <img :src="item.goods_image" class="he-goods__img" alt="">
                            <div>
                                <div class="he-goods__name">{{ item.goods_name }}</div>
                                <div class="he-goods__attr">
                                    {{ item.show_goods_param }}
                                </div>
                            </div>
                        </div>
                        <div class="he-rating el-row--flex">
                            <div class="he-rating__text">{{ item.star >= 4 ? '好评' : item.star === 3 ? "中评" : '差评' }}
                            </div>
                            <el-rate void-color="#F7BA2A" :value="item.star" disabled
                                     :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                        </div>
                        <div class="he-evaluation">
                            <div class="he-evaluation__text">
                                {{ item.content }}
                            </div>
                            <div class="he-evaluation__img">
                                <img :src="img" alt="" @click="preview(item.images, img_index)"
                                     v-for="(img, img_index) in item.images" :key="img_index">
                            </div>
                        </div>
                        <div class="he-reply">
                            <div class="he-reply__text">{{ item.reply }}</div>
                            <el-button class="he-reply__btn" type="text" :id="item.id +'_reply'"
                                       v-popup.replyReviews="item" module="order" title="回复评价" width="480" top="30vh">
                                {{ item.reply ? '修改回复' : '回复' }}
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="el-row--flex is-justify-space-between he-footer">
                <div>
                    <el-checkbox class="he-all__check" @change="allCheckEvent" v-model="allCheck"
                                 :indeterminate="indeterminate">当前全选
                    </el-checkbox>
                    <el-button class="setBut" :disabled="checkList.length === 0" action="bulkReply"
                               v-popup.replyReviewsBulk="checkList" module="order" title="批量回复评价" width="480"
                               top="30vh">批量回复
                    </el-button>
                    <popconfirm width="328px" @confirm="bulkTop" title="确认批量置顶选中评价？">
                        <el-button class="setBut" :disabled="checkList.length === 0">批量置顶</el-button>
                    </popconfirm>
                    <popconfirm width="328px" @confirm="batchDisplay" title="确认批量显示选中评价？">
                        <el-button :disabled="checkList.length === 0">批量显示</el-button>
                    </popconfirm>
                    <popconfirm width="328px" @confirm="bulkHide" title="确认批量隐藏选中评价？">
                        <el-button :disabled="checkList.length === 0">批量隐藏</el-button>
                    </popconfirm>
                    <popconfirm width="328px" @confirm="batchDeletion" title="确认批量删除选中评价？">
                        <el-button :disabled="checkList.length === 0">批量删除</el-button>
                    </popconfirm>
                </div>
                <div>
                    <el-pagination background @current-change="currentChange" layout="prev, pager, next, jumper"
                                   :current-page="page.current" :page-count="page.count">
                    </el-pagination>
                </div>
            </div>
            <preview ref="preview" v-model="previewList"></preview>
        </div>
    </div>
</template>
<script type="text/javascript">
import popconfirm from "@/components/popconfirm.vue";
import preview from "@/components/preview/index.vue";

export default {
    components: {
        popconfirm,
        preview
    },
    data() {
        return {
            visible: true,
            keyword: {
                time_start: '',
                time_end: '',
                time_start_show: '',
                time_end_show: '',
                search_key: 'nickname',
                search: '',
                level: '',
                status: '',
                search_key_label: '买家昵称'
            },
            placeHolder: '买家昵称',
            selectList: [{
                label: '买家昵称',
                value: 'nickname'
            },
                {
                    label: '商品名称',
                    value: 'goods_name'
                },
                {
                    label: '评价内容',
                    value: 'content'
                },
            ],
            indeterminate: false,
            allCheck: false,
            checkList: [],
            page: {
                current: 1,
                size: 20
            },
            list: [],
            previewList: []
        };
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        'keyword.search_key': {
            handler(newVal) {
                for (let i = 0; i < this.selectList.length; i++) {
                    if (newVal === this.selectList[i].value) {
                        this.placeHolder = this.selectList[i].label;
                        this.keyword.search_key_label = this.placeHolder;
                    }
                }
            }
        },
        'keyword.time_start_show': {
            handler(newVal) {
                if (newVal) {
                    let str = newVal.valueOf().toString();
                    this.keyword.time_start = str.slice(0, str.length - 3);
                } else {
                    this.keyword.time_start = '';
                }
            }
        },
        'keyword.time_end_show': {
            handler(newVal) {
                if (newVal) {
                    let str = newVal.valueOf().toString();
                    this.keyword.time_end = str.slice(0, str.length - 3);
                } else {
                    this.keyword.time_end = '';
                }
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.getList(this.page);
    },
    methods: {
        allCheckEvent: function () {
            this.list.forEach(item => {
                item.check = this.allCheck;
            });
            this.indeterminate = false;
            this.checkList = this.allCheck ? this.list : [];
        },
        changeItem: function () {
            let data = [];
            this.list.forEach(obj => {
                if (obj.check) {
                    data.push(obj);
                }
            });
            this.checkList = data;
            this.allCheck = this.checkList.length === this.list.length;
            this.indeterminate = !this.allCheck && this.checkList.length > 0;
        },
        currentChange: function (e) {
            this.page.current = e;
            this.getList(this.page);
        },
        brush: function () {
            this.page.current = 1;
            this.getList(this.page);
        },
        empty: function () {
            this.keyword = {
                time_start: '',
                time_end: '',
                time_start_show: '',
                time_end_show: '',
                search_key: 'nickname',
                search: '',
                level: '',
                status: '',
                search_key_label: '买家昵称'
            }
            this.brush();
        },
        getList: function (page) {
            let keyword = this.$heshop.utils.deepClone(this.keyword);
            delete keyword.time_start_show;
            delete keyword.time_end_show;
            this.$heshop.search('post', {include: 'orderevaluate'}, {keyword}).page(page.current, page.size).then(res => {
                let {data, headers} = res;
                this.page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-total-count']
                }
                data.forEach(item => {
                    item.check = false;
                });
                this.list = data;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        bulkReply: function () {
            this.getList(this.page);
        },
        bulkTop: function () {
            this.setStatus(2, '置顶成功');
        },
        batchDisplay: function () {
            this.setStatus(1, '显示成功');
        },
        bulkHide: function () {
            this.setStatus(0, '隐藏成功');
        },
        setStatus: function (status, msg) {
            let ids = [];
            this.checkList.forEach(item => {
                ids.push(item.id);
            });
            this.$heshop.evaluate('put', ids, {
                status: status
            }).then(() => {
                ids.forEach(id => {
                    this.list.forEach(item => {
                        if (item.id === id) {
                            item.status = status;
                        }
                    });
                })
                this.$message.success(msg);
            }).catch(error => {
                this.$message.error(error.data.message);
            });
        },
        batchDeletion: function () {
            let ids = [];
            this.checkList.forEach(item => {
                ids.push(item.id);
            });
            this.$heshop.evaluate('delete', ids).then(() => {
                this.$message.success('删除成功');
                this.getList(this.page);
            }).catch(error => {
                this.$message.error(error.data.message);
            });
        },
        displayHidden: function (item) {
            let status = 1;
            if (item.status === 0) {
                status = 1;
            } else {
                status = 0;
            }
            this.$heshop.evaluate('put', item.id, {
                status
            }).then(() => {
                item.status = status;
                let msg = status === 1 ? '显示成功' : '隐藏成功';
                this.$message.success(msg);
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        setTop: function (item) {
            let status = 1;
            if (item.status === 2) {
                status = 1;
            } else {
                status = 2;
            }
            this.$heshop.evaluate('put', item.id, {
                status
            }).then(() => {
                item.status = status;
                let msg = status === 1 ? '取消置顶成功' : '置顶成功';
                this.$message.success(msg);
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        deleteItem: function (item) {
            this.$heshop.evaluate('delete', item.id).then(() => {
                this.getList(this.page);
                this.$message.success('删除成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        preview: function (list) {
            this.previewList = list;
            this.$refs.preview.handleDialog();
        }
    }
};
</script>
<style lang="scss" scoped>
.le-matter {
    min-width: 1600px;
}

.le-form-card {
    background-color: #FFFFFF;
    border-radius: 16px;
    padding: 24px 24px 0 24px;

    /deep/ .el-input-group__prepend {
        background: #ffffff !important;
    }
}

.le-card {
    background-color: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
}

.le-form-card /deep/ .el-col.el-col-6 {
    width: 22.5%;
}

.le-form-card .to {
    width: 35px;
    text-align: center;
}

.data-picker /deep/ .el-input.el-input--mini .el-input__inner {
    padding-left: 30px;
}

.le-matter .he-searchInput /deep/ .el-select--mini {
    width: 140px;

    .el-input__inner {
        width: 140px;
    }

    .el-input--suffix {
        width: 140px;
    }
}

.le-matter /deep/ .he-searchInput {
    width: 447px;
}

.he-select__width /deep/ .el-input--suffix {
    width: 160px;
}

.le-matter .el-form-item__content /deep/ .el-button--text {
    margin-left: 0;
    padding: 10px 8px;
    color: #623ceb;
}

.he-all__check {
    margin-right: 8px !important;
    margin-left: 24px;
}

.he-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F5F7FA;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    margin-top: 16px;
    padding: 0 20px;

    .he-goods {
        width: 45%;
        padding-left: 35px;
        opacity: 0.85;
    }

    .he-rating {
        width: 15%;
        opacity: 0.85;
    }

    .he-evaluation {
        width: 20%;
        opacity: 0.85;
    }

    .he-reply {
        width: 20%;
        opacity: 0.85;
    }
}

.he-body {
    .he-item__hidden {
        background-color: rgba(0, 0, 0, .05);
    }

    .he-item {
        margin-top: 16px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        position: relative;

        .he-item__header {
            width: 100%;
            height: 49px;
            line-height: 49px;
            background: #F3F5F7;
            border-radius: 4px 4px 0 0;
            padding-left: 24px;
            padding-right: 26px;

            .he-eye {
                width: 20px;
                height: 20px;
                margin-right: 17px;
                cursor: pointer;
                color: #bbbfc8;
            }

            .he-top {
                width: 18px;
                height: 18px;
                margin-right: 19px;

                cursor: pointer;
            }

            .he-top-0 {
                color: #bbbfc8;
            }

            .he-top-1 {
                color: rgba(251, 173, 21, 1);
            }

            .he-delete {
                width: 20px;
                height: 20px;
                cursor: pointer;
                color: #bbbfc8;
            }

            .he-label {
                font-size: 14px;
                font-weight: 500;
                color: #000000;
                opacity: 0.45;
            }

            .he-value {
                font-size: 14px;
                font-weight: 500;
                color: #000000;
                opacity: 0.85;
                margin-right: 33px;
            }

            .he-check {
                margin-right: 15px;
            }
        }

        .he-item__body {
            padding: 20px;

            .he-goods {
                width: 45%;
                padding-left: 34px;
                padding-right: 50px;

                .he-goods__img {
                    width: 80px;
                    height: 80px;
                }

                .he-goods__name {
                    font-size: 14px;
                    font-weight: 500;
                    color: #010101;
                    opacity: 0.85;
                    margin-left: 12px;
                }

                .he-goods__attr {
                    font-size: 12px;
                    font-weight: 500;
                    color: #010101;
                    opacity: 0.65;
                    margin-left: 12px;
                    margin-top: 5px;
                }
            }

            .he-rating {
                width: 15%;

                .he-rating__text {
                    font-size: 14px;
                    font-weight: 500;
                    color: #000000;
                    line-height: 22px;
                    opacity: 0.85;
                    margin-right: 12px;
                }
            }

            .he-evaluation {
                width: 20%;
                padding-right: 20px;

                .he-evaluation__text {
                    font-size: 14px;
                    font-weight: 500;
                    color: #000000;
                    line-height: 18px;
                    opacity: 0.85;
                }

                .he-evaluation__img {
                    > img {
                        margin-top: 8px;
                        width: 80px;
                        height: 80px;
                        border-radius: 8px;
                        margin-right: 8px;
                    }
                }
            }

            .he-reply {
                width: 20%;

                .he-reply__btn {
                    padding: 0;
                    font-size: 14px;
                    font-weight: 500;
                    color: #623ceb;
                    margin-top: 3px;
                }

                .he-reply__text {
                    font-size: 14px;
                    font-weight: 500;
                    color: #000000;
                    line-height: 18px;
                    opacity: 0.85;
                }
            }
        }
    }
}

.setBut {
    margin-left: 8px;
}

.he-footer {
    margin-top: 20px;
}
</style>
