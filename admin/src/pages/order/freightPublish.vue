<template>
    <div class="le-matter">
        <div class="le-header">
            <span class="le-header__left" @click="router">运费模板</span>
            <i class="el-icon-arrow-right"></i>
            <span class="le-header__right">{{ ruleForm.id ? '编辑模板' : '新建模板' }}</span>
        </div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="176px" :rules="rules" @submit.native.prevent>
            <div class="le-form-card">
                <el-form-item label="运费模板名称" prop="name">
                    <el-input v-model="ruleForm.name" maxlength="8" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="计费方式" prop="type">
                    <el-radio v-model="ruleForm.type" :label="1">按件数</el-radio>
                    <el-radio v-model="ruleForm.type" :label="2">按重量</el-radio>
                </el-form-item>
                <el-form-item label="运费规则" prop="freight_rules">
                    <el-table :data="ruleForm.freight_rules">
                        <el-table-column label="配送区域">
                            <template slot-scope="scope">
                                <span style="font-size: 14px;" :key="item.id"
                                      v-for="(item, index) in scope.row.area">{{ index !== 0 ? '，' : '' }}{{ item.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div style="display: flex;align-items: center;">
                                    <el-button type="text" title="选择配送区域" :id="scope.$index + '_edit'"
                                               class="he-class__button-new" module="order" width="801" action="setItem"
                                               v-popup.setDistrict="{index: scope.$index, select: scope.row.area}">
                                        编辑
                                    </el-button>
                                    <span style="background: #623CEB;height: 14px;width: 1px;"></span>
                                    <popconfirm width="328px" @confirm="deleteItem({index:scope.$index})"
                                                title="确定删除该配送区域吗？">
                                        <el-button class="he-class__button-new" type="text">删除</el-button>
                                    </popconfirm>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="ruleForm.type ===1?'首件':'首重(KG)'" width="130">
                            <template slot-scope="scope">
                                <el-input @keyup.native="scope.row.first.number = floatNum(scope.row.first.number)"
                                          v-model="scope.row.first.number"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="运费（元）" width="130">
                            <template slot-scope="scope">
                                <el-input @keyup.native="scope.row.first.price = floatPrice(scope.row.first.price)"
                                          v-model="scope.row.first.price"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column :label="ruleForm.type ===1 ? '续件':'续重(KG)'" width="130">
                            <template slot-scope="scope">
                                <el-input
                                    @keyup.native="scope.row.continue.number = floatNum(scope.row.continue.number)"
                                    v-model="scope.row.continue.number"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="续费（元）" width="130">
                            <template slot-scope="scope">
                                <el-input
                                    @keyup.native="scope.row.continue.price = floatPrice(scope.row.continue.price)"
                                    v-model="scope.row.continue.price"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="he-button" action="setDistrict" title="选择配送区域" width="801"
                         v-popup.setDistrict="{select: selectDistrict}" module="order">新增配送区域
                    </div>
                </el-form-item>
            </div>
        </el-form>
        <div class="le-cardpin">
            <el-button @click="$router.back();">取消</el-button>
            <el-button @click="save" type="primary">保存</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
import popconfirm from "@/components/popconfirm.vue";
import floatNum from "@/lib/function/floatNum";

export default {
    components: {
        popconfirm
    },
    name: 'freightPublish',
    data() {
        return {
            ruleForm: {
                id: null,
                name: '',
                type: 1,
                freight_rules: []
            },
            rules: {
                name: [
                    {required: true, message: '请输入模板名称', trigger: 'blur'}
                ],
                type: [
                    {required: true, message: '请选择计算方式', trigger: 'change'}
                ],
                freight_rules: [
                    {required: true, message: '请添加运费规则', trigger: 'change'}
                ]
            },
            catObject: {
                cat: [],
                result: null
            },
            selectDistrict: []
        };
    },
    async mounted() {
        let id = this.$heshop.utils.getQueryVariable('id');
        if (id)
            this.getDetail(parseInt(id));
    },
    methods: {
        save() {
            this.$refs.ruleForm.validateField('freight_rules');
            this.$refs.ruleForm.validate(check => {
                if (check) {
                    let arr = this.ruleForm.freight_rules;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].continue.number === '' || arr[i].continue.price === '' || arr[i].first.price === '' || arr[i].first.number === '') {
                            this.$message.warning('运费规则不能为空');
                            return;
                        }
                    }
                    if (this.ruleForm.id) {
                        this.$heshop.freighttemplate('put', parseInt(this.ruleForm.id), this.ruleForm).then(() => {
                            this.$message.success('编辑成功');
                            this.$router.back();
                        }).catch(err => {
                            if (err.data[0]) {
                                err.data.forEach(v => {
                                    this.$message.error(v.message);
                                });
                            } else {
                                this.$message.error(err.data.message);
                            }
                        });
                    } else {
                        this.$heshop.freighttemplate('post', this.ruleForm).then(() => {
                            this.$message.success('添加成功');
                            this.$router.back();
                        }).catch(err => {
                            if (err.data[0]) {
                                err.data.forEach(v => {
                                    this.$message.error(v.message);
                                });
                            } else {
                                this.$message.error(err.data.message);
                            }
                        });
                    }
                }

            })


        },
        deleteTag() {
            this.catObject.result = null;
        },
        getDetail(id) {
            this.$heshop.freighttemplate('get', id).then(res => {
                this.ruleForm = res;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        setDistrict(e) {
            this.ruleForm.freight_rules.push({
                area: e.select,
                continue: {
                    number: 0,
                    price: 0,
                },
                first: {
                    number: 0,
                    price: 0,
                }
            });
            this.selectDistrict = [];
        },
        setItem(e) {
            this.$set(this.ruleForm.freight_rules[e.index], 'area', e.select);
        },
        deleteItem(e) {
            this.$delete(this.ruleForm.freight_rules, e.index);
        },
        router: function () {
            this.$router.back();
        },
        floatPrice(value) {
            return floatNum(value);
        },
        floatNum: function (val) {
            if (this.ruleForm.type === 1) {
                return val.replace(/[^0-9]/g, '');
            } else {
                return floatNum(val);
            }
        }
    }
};
</script>
<style lang="less" scoped="true">
.le-header {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    margin-bottom: 24px;

    .el-icon-arrow-right {
        margin: 0 10px;
    }

    .le-header__left {
        color: #262626;
        cursor: pointer;
    }

    .le-header__right {
        color: #8C8C8C;
    }
}

.le-form-card {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 24px;
}

.he-link {
    font-weight: bold;
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    color: #303133;
    text-decoration: none;
    cursor: pointer;
}

.he-tips {
    font-size: 12px;
    font-weight: 500;
    color: #000000;
    opacity: 0.45;
    margin: 0;
}

.he-link {
    font-size: 12px;
    font-weight: 500;
    color: #623CEB;
    margin-left: 8px;
    opacity: 1;
}

.he-button {
    width: 132px;
    height: 32px;
    border: 1px solid #623CEB;
    border-radius: 4px;
    color: #623CEB;
    margin: 16px 0 16px 0;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
}

.el-table .el-input.el-input--mini {
    width: 100px;
}

/deep/ .le-form-card .he-class__button-new {
    font-size: 14px;
    padding: 10px;
    color: #623CEB;
}
</style>
