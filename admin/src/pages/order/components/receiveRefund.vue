<template>
    <el-form label-width="120px" class="le-matter">
        <el-form-item label="售后类型">
            <span class="he-value">{{value.item.type === 0 ? '仅退款' : value.item.type === 1 ? '退货退款' : value.item.type === 2 ? '换货' : ''}}</span>
        </el-form-item>
        <el-form-item label="退款商品数">
            <span class="he-value">{{value.item.return_number}}</span>
        </el-form-item>
        <el-form-item label="退款金额">
            <span class="he-value">￥{{value.item.return_amount}}</span>
        </el-form-item>
        <el-form-item label="退货地址">
            <div class="he-address">
                <div v-for="(item, index) in list" :key="index" class="he-address__item">
                    <el-radio :style="radio === item.id?'background: rgba(98, 60, 235, 0.1);':''" v-model="radio" :label="item.id" border>({{item.name}} 收) {{item.province}}{{item.city}}{{item.district}}{{item.address}} </el-radio>
                </div>
            </div>
            <div class="he-address_add">
                <el-button class="address__add__but" title="使用新地址" width="524" module="order" top="30vh" key="insert_ddress" action="insertAddress" v-popup.insertAddress="{item:list}">
                    使用新地址
                </el-button>
                <span class="address__add__explain">
                    新添加的地址将被保存至退货地址
                </span>
            </div>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name: "receiveRefund",
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            radio: 1,
            list: []
        }
    },
    created() {
        this.getAddress();
    },
    watch: {

    },
    methods: {
        getAddress: function() {
            this.$heshop.option('get', { include: 'address' }).then(res => {
                if (res.length > 0) {
                    this.radio = res[0].id;
                    res.forEach(v => {
                        if (v.status === 1) {
                            this.radio = v.id;
                        }
                    })
                }
                this.list = res;
            }).catch(err => {
                console.error(err);
                this.$message.error(err.data.message);
            })
        },
        affirm: function(e) {
            let item = null;
            this.list.forEach(obj => {
                if (obj.id == this.radio) {
                    item = obj;
                }
            });
            this.$heshop.orderafter('put', { id: this.value.item.id, behavior: 'pass' }, { return_address: item }).then(res => {
                this.value.item.status = res.status;
                this.$message.success('同意成功');
                let { handleClose } = e;
                handleClose();
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        insertAddress: function() {
            if (this.list.length > 0) {
                this.radio = this.list[0].id;
            }
        }
    }
};
</script>
<style scoped lang="scss">
.he-value {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}

/deep/.el-form-item {
    margin-bottom: 6px !important;
}

.he-address {
    width: 460px;
    max-height: 150px;
    overflow: auto;
    margin-bottom: 8px;

    .he-address__item {
        margin-bottom: 8px
    }

}

.he-address_add {

    font-size: 12px !important;

    .address__add__but {
        font-weight: 600;
        color: #000000;
        opacity: 0.45;
        width: 108px;
        height: 32px;
        background: #FFFFFF;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
    }

    .address__add__explain {
        font-weight: 600;
        margin-left: 10px;
        color: #000000;
        opacity: 0.45;
    }


}

.el-radio {
    width: 100%
}
</style>