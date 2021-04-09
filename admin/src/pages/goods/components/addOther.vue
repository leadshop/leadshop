<template>
    <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="每人限购">
            <div style="margin-bottom: 5px">
                <el-switch v-model="value.limit_buy_status" :active-value="1" :inactive-value="0"></el-switch>
            </div>
            <el-input v-model="value.limit_buy_value" v-if="value.limit_buy_status === 1" class="le-limit"
                      :maxlength="7" @input="(val)=>{value.limit_buy_value = val.replace(/[^\d]/g, '')}">
                <el-select v-model="value.limit_buy_type" slot="prepend" placeholder="请选择">
                    <el-option label="每天" value="day"></el-option>
                    <el-option label="每周" value="week"></el-option>
                    <el-option label="每月" value="month"></el-option>
                    <el-option label="永久" value="all"></el-option>
                </el-select>
                <template slot="append">件</template>
            </el-input>
        </el-form-item>
        <el-form-item label="起购量">
            <el-input v-model="value.min_number" @input="(val)=>{value.min_number = val.replace(/[^\d]/g, '')}"
                      :maxlength="7">
                <template slot="append">件</template>
            </el-input>
            <p class="he-tips" style="margin: 7px 0 0 0;">商品库存低于起购数时，买家无法下单购买</p>
        </el-form-item>
        <el-form-item label="商品服务">
            <el-tag type="info"
                    class="le-cat__footer-tag"
                    size="medium"
                    closable
                    @close="deleteTag(item, index)"
                    v-for="(item, index) in form.serviceObject.select"
                    :key="index"
            >
                {{ item.title }}
            </el-tag>
            <el-button type="primary" plain
                       class="he-class__button"
                       title="选择服务"
                       width="392"
                       height="456"
                       v-popup.selectService="form.serviceObject"
                       module="goods">选择服务
            </el-button>
            <he-link href="goods/servicePublish" target="_blank">
                <el-button type="text" class="he-class__button-new">
                    新建服务
                </el-button>
            </he-link>
            <span style="color: #623ceb">|</span>
            <el-button type="text" class="he-class__button-new" @click="getList">
                刷新
            </el-button>
        </el-form-item>
        <el-form-item label="上架设置">
            <el-radio-group v-model="value.is_sale">
                <el-radio :label="1">立即上架</el-radio>
                <el-radio :label="0">暂不上架</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                serviceObject: {
                    list: [],
                    select: [],
                    search: ''
                }
            },
            list: [],
            select: []
        }
    },
    async mounted() {
        setTimeout(() => {
            this.getList();
        }, 800);
    },
    methods: {
        getList() {
            this.$heshop.option('get', {module: 'goods', include: 'service'}).then(res => {
                this.form.serviceObject.select = [];
                let services = this.value.services;
                for (let i = 0; i < res.length; i++) {
                    res[i].check = false;
                    for (let j = 0; j < services.length; j++) {
                        if (res[i].id === services[j]) {
                            res[i].check = true;
                            this.form.serviceObject.select.push(res[i]);
                        }
                    }
                }
                this.form.serviceObject.list = res;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        deleteTag: function (item, index) {
            this.form.serviceObject.list.forEach(obj => {
                if (obj.id === item.id) {
                    obj.check = false;
                }
            })
            this.form.serviceObject.select.splice(index, 1);
        }
    },
    watch: {
        'form.serviceObject.select': {
            handler: function (newVal) {
                this.value.services = [];
                newVal.forEach(item => {
                    this.value.services.push(item.id);
                });
            },
            immediate: true
        }
    }
};
</script>

<style scoped lang="scss">
.le-limit {
    width: 250px;

    /deep/ .el-input-group__prepend {
        .el-input {
            width: 90px;
        }
    }
}

/deep/ .el-input-group__prepend {
    background-color: #ffffff;
}

/deep/ .el-input-group--append.el-input-group--prepend {
    width: 220px;
}

.he-tips {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.45;
    margin: 0;
}

</style>
