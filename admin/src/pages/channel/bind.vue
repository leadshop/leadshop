<template>
    <div class="le-matter">
        <div class="he-title">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="he-link-text">
                <el-breadcrumb-item class="he-link">
                    <he-link href="channel/index">
                        渠道管理
                    </he-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <template v-if="platform === 'wechat'">
                <div class="he-header">
                    <div>
                        <span class="he-title-1">绑定微信公众号 打通店铺和微信</span>
                        <span class="he-title-2">还没有公众号，现在去注册></span>
                    </div>
                    <div class="he-title-3">一个店铺只能绑定一个公众号，绑定后即可在这里管理你的公众号，在公众号自动回复/自定义菜单等功能中结合商品销售进行推广</div>
                </div>
                <div class="he-body">
                    <div class="he-title-4">不同类型的公众号功能不尽相同，我们提供的功能也不相同</div>
                    <el-table :data="tableData" style="width: 760px" :row-class-name="tableRowClassName">
                        <el-table-column prop="name" width="180">
                        </el-table-column>
                        <el-table-column label="普通订阅号" width="180">
                            <template slot-scope="scope">
                                <he-icon v-if="scope.row.regularSubscription" class="he-icon" type="le-icon-tick" size="10px"></he-icon>
                            </template>
                        </el-table-column>
                        <el-table-column label="认证订阅号">
                            <template slot-scope="scope">
                                <he-icon v-if="scope.row.certifiedSubscription" class="he-icon" type="le-icon-tick" size="10px"></he-icon>
                            </template>
                        </el-table-column>
                        <el-table-column label="普通服务号">
                            <template slot-scope="scope">
                                <he-icon v-if="scope.row.generalService" class="he-icon" type="le-icon-tick" size="10px"></he-icon>
                            </template>
                        </el-table-column>
                        <el-table-column label="认证服务号">
                            <template slot-scope="scope">
                                <he-icon v-if="scope.row.certificationServices" class="he-icon" type="le-icon-tick" size="10px"></he-icon>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="he-footer">
<!--                    <el-button type="primary">授权绑定</el-button>-->
                    <he-link href="channel/manualBinding" :query="{platform: 'wechat'}">
                        <el-button type="primary" plain>手动绑定</el-button>
                    </he-link>
                </div>
            </template>
            <template v-if="platform === 'applets'">
                <div class="he-applets_header flex align-center">
                    <span class="he-applets__sign"></span>
                    <span class="he-applets__title">填写小程序信息</span>
                </div>
                <el-form label-width="180px" :rules="rules" :model="form" ref="bind">
                    <el-form-item label="小程序名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入小程序名称"></el-input>
                    </el-form-item>
                    <el-form-item label="AppID" prop="AppID">
                        <el-input v-model="form.AppID" placeholder="请输入AppID"></el-input>
                    </el-form-item>
                    <el-form-item label="AppSecret" prop="AppSecret">
                        <el-input v-model="form.AppSecret" placeholder="请输入AppSecret"></el-input>
                    </el-form-item>
                    <el-form-item label="原始ID">
                        <el-input v-model="form.oldID" placeholder="请输入原始ID"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <div class="le-cardpin">
                <el-button type="primary" @click="save('bind')">保存</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: "bind",
    data() {
        return {
            title: '',
            tableData: [
                {
                    name: "消息自动回复",
                    regularSubscription: true,
                    certifiedSubscription: true,
                    generalService: true,
                    certificationServices: true
                },
                {
                    name: "自定义菜单",
                    regularSubscription: false,
                    certifiedSubscription: true,
                    generalService: true,
                    certificationServices: true
                },
                {
                    name: "群发/定时群发",
                    regularSubscription: false,
                    certifiedSubscription: true,
                    generalService: false,
                    certificationServices: true
                },
                {
                    name: "高级客户管理",
                    regularSubscription: false,
                    certifiedSubscription: false,
                    generalService: false,
                    certificationServices: true
                },
                {
                    name: "参数二维码",
                    regularSubscription: false,
                    certifiedSubscription: false,
                    generalService: false,
                    certificationServices: true
                },
                {
                    name: "模板消息",
                    regularSubscription: false,
                    certifiedSubscription: false,
                    generalService: false,
                    certificationServices: true
                }
            ],
            platform: '',
            rules: {
                name: [
                    { required: true, message: '请输入小程序名称', trigger: 'blur' },
                ],
                AppID: [
                    { required: true, message: '请输入AppID', trigger: 'blur' },
                ],
                AppSecret: [
                    { required: true, message: '请输入AppSecret', trigger: 'blur' },
                ]
            },
            form: {
                name: '',
                AppID: '',
                AppSecret: '',
                oldID: ''
            }
        }
    },
    mounted() {
        let platform = this.$heshop.utils.getQueryVariable('platform');
        this.platform = platform;
        switch (platform) {
            case "applets":
                this.title = "绑定微信小程序";
                break;
            case "wechat":
                this.title = "绑定公众号";
                break;
        }

        this.getConfig();
    },
    methods: {
        getConfig: function() {
            this.$heshop.appconfig('get').then(res => {
                this.form = res.apply.weapp
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        save: function(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$heshop.appconfig('post', {
                            behavior: 'save',
                            key: 'apply_weapp'
                        },
                        this.form
                    ).then(res => {
                        this.$notify({
                            title: '保存成功',
                            message: '公众号手动绑定成功。',
                            type: 'success'
                        });
                    }).catch(err => {
                        console.error(err)
                        this.$message.error(err.data.message);
                    });
                }
            });
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'warning-row';
            } else if (rowIndex === 5) {
                return 'warning-row';
            }
            return '';
        }
    }
};
</script>
<style scoped>
.he-title {
    margin-bottom: 24px;
}

/deep/ .el-card__body {
    padding: 32px;
}

.he-header {
    border-bottom: 1px solid #DCDFE6;
}

.he-title-1 {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}

.he-title-2 {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #623CEB;
    margin-left: 20px;
    cursor: pointer;
}

.he-title-3 {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.65;
    margin-bottom: 23px;
    margin-top: 10px;
}

.he-title-4 {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.45;
    margin-top: 24px;
    margin-bottom: 19px;
}

/deep/.warning-row {
    background: #F7F8FA;
}

/deep/.el-table tr {
    height: 44px;
}

/deep/ .el-table thead th {
    background-color: rgba(59, 180, 48, 1) !important;
    color: #FFFFFF;
}

.he-footer {
    margin-top: 20px;
}

.he-icon {
    color: rgba(59, 180, 48, 1);
}

.he-applets_header {
    margin-bottom: 20px;
}

.he-applets__title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
    margin-left: 12px;
}

.he-applets__sign {
    display: inline-block;
    width: 4px;
    height: 16px;
    background: #623CEB;
}

.flex {
    display: flex;
}

.align-center {
    align-items: center;
}
</style>
