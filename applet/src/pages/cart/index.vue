<template>
    <view class="he-page-content">
        <view v-if="cartLoading" class="flex align-center justify-center he-loading-require">
            <he-loading mode="flower"></he-loading>
        </view>
        <cart-empty v-if="!isLoading && list.length === 0 && failure.length === 0"></cart-empty>
        <template v-else-if="!isLoading && (list.length > 0 || failure.length > 0)">
            <view class="cart-list" :data-theme="theme">
                <view class="he-top flex">
                    <view class="flex-sub flex align-center">
                        <text class="iconfont iconshoppingcart_shopname"></text>
                        <text class="he-shop-name">{{ storeSetting.name }}</text>
                    </view>
                    <view class="he-button" @click="setEdit">{{ isEdit ? '完成' : '编辑' }}</view>
                </view>
                <view class="he-body">
                    <cart-item v-for="(item, index) in list" :options="options"
                               :custom-style="actionStyle"
                               @select="setRadio(index, 'list')"
                               @number="(obj) => {setNumber(obj, 'list')}"
                               :show="item.show"
                               :item="item"
                               @openShopping="(obj) => {openShopping(obj, 'list')}"
                               @click="delItem(item, index, 'list')" @open="(key) => {open(key, 'list')}"
                               :index="index" :key="item.id"></cart-item>
                    <template v-if="failure.length">
                        <view class="he-failure-text">以下商品暂时无法购买</view>
                        <cart-item v-for="(item, index) in failure" :options="options"
                                   :custom-style="actionStyle"
                                   :item="item"
                                   :show="item.show"
                                   :isEdit="isEdit"
                                   @openShopping="(obj) => {openShopping(obj, 'failure')}"
                                   @number="(obj) => {setNumber(obj, 'failure')}"
                                   @select="setRadio(index, 'failure')"
                                   @click="delItem(item, index, 'failure')" @open="(key) => {open(key, 'failure')}"
                                   :index="index" :key="item.id"></cart-item>
                    </template>
                </view>
                <view class="he-bottom"></view>
            </view>
            <cart-settlement @setAll="setAll" :total="total" :select="select" v-model="all" :is-edit="isEdit"
                             @submit="submit" @del="del"></cart-settlement>
            <he-cart shopping-type="join" :goods="detail" @put="setParam" :select.sync="selectObj"
                     :show.sync="shopping"></he-cart>
        </template>
        <he-toast v-model="isLoading">
            <view class="he-loading flex flex-direction align-center">
                <image class="he-loading__image" :src="ipAddress + '/cart-image-loading.gif'"></image>
                <text>加载中...</text>
            </view>
        </he-toast>
    </view>
</template>

<script>
import cartSettlement from "./components/cart-settlement.vue";
import cartEmpty from "./components/cart-empty.vue";
import heToast from "../../components/he-toast.vue";
import heCart from "../../components/he-cart.vue";
import cartItem from "./components/cart-item.vue";
import heLoading from "../../components/he-loading";

export default {
    name: "index",
    components: {
        cartSettlement,
        cartEmpty,
        heToast,
        heCart,
        cartItem,
        heLoading,
    },
    data() {
        return {
            list: [],
            failure: [],
            all: false,
            isLoading: false,
            total: 0,
            select: [],
            isEdit: false,
            isFirst: false,
            options: [
                {
                    text: '删除',
                    style: {}
                }
            ],
            selectObj: {},
            shopping: false,
            detail: {
                param: {},
            },
            key: '',
            cartLoading: false
        }
    },
    computed: {
        isLogin: function () {
            return this.$store.state.apply.is_login;
        },
        actionStyle: function () {
            return {
                borderRadius: '16rpx',
                marginBottom: '16rpx',
                overflow: 'hidden'
            }
        }
    },
    methods: {
        getList: function () {
            let _this = this;
            return new Promise(function (resolve) {
                _this.$heshop.cart('get').then(function (res) {
                    _this.isLoading = false;
                    res.normal.forEach(function (item) {
                        item.show = false;
                        item.is_select = false;
                    });
                    _this.list = res.normal;
                    res.failure.forEach(function (item) {
                        item.show = false;
                        item.is_select = false;
                    });
                    _this.failure = res.failure;
                    resolve(res);
                }).catch(function (err) {
                    console.error(err);
                    _this.$toError();
                });
            })
        },
        submit: function () {
            let data = [];
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].is_select) data.push(this.list[i]);
            }
            uni.navigateTo({
                url: '/pages/order/submit?data=' + JSON.stringify(data)
            });
        },
        del: function () {
            let data = [];
            for (let i = 0; i < this.failure.length; i++) {
                if (this.failure[i].is_select) data.push(this.failure[i].id);
            }
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].is_select) data.push(this.list[i].id);
            }
            let _this = this;
            this.$heshop.cart('delete', data).then(function () {
                for (let i = 0; i < _this.list.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (_this.list[i].id === data[j]) {
                            _this.$delete(_this.list, i);
                        }
                    }
                }
                for (let i = 0; i < _this.failure.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (_this.failure[i].id === data[j]) {
                            _this.$delete(_this.failure, i);
                        }
                    }
                }
            }).catch(function (err) {
                console.error(err);
                _this.$toError();
            });
        },
        delItem: function (item, index, key) {
            let _this = this;
            this.$heshop.cart('delete', [item.id]).then(function () {
                _this.$delete(_this[key], index);
            }).catch(function (err) {
                console.error(err);
                _this.$toError();
            });
        },
        open: function (index, key) {
            this[key][index].show = true;
            this[key].map((val, idx) => {
                if (index != idx) this[key][idx].show = false;
            });
        },
        setRadio: function (index, key) {
            this[key][index].is_select = !this[key][index].is_select;
        },
        setNumber: function (obj, key) {
            this[key][obj.index].goods_number = obj.value;
            this.$heshop.cart('put', this[key][obj.index].id, {
                goods_number: obj.value,
                goods_param: this[key][obj.index].goods_param
            }).then(function () {
            }).catch(function (err) {
                console.error(err);
                _this.$toError();
            });
        },
        setParam: function (item) {
            let _this = this;
            this.$heshop.cart('put', item.cart_id, {
                goods_param: item.param_value,
                goods_number: item.goods_number
            }).then(function (res) {
                for (let i = 0; i < _this[_this.key].length; i++) {
                    if (_this[_this.key][i].id === res.id) {
                        _this[_this.key][i].show_goods_param = res.show_goods_param;
                        _this[_this.key][i].goods_param = res.goods_param;
                        _this[_this.key][i].goods_number = res.goods_number;
                    }
                }
                if (item.cart_id !== res.id) {
                    for (let i = 0; i < _this[_this.key].length; i++) {
                        if (_this[_this.key][i].id === item.cart_id) {
                            _this[_this.key].splice(i, 1);
                        }
                    }
                }
            }).catch(function (err) {
                console.error(err);
                _this.$toError();
            });
        },
        openShopping: function (item, key) {
            this.cartLoading = true;
            let _this = this;
            this.key = key;
            this.$heshop.goods('get', item.goods_id, {
                type: 'param'
            }).then(function (res) {
                _this.shopping = true;
                _this.detail = res;
                _this.detail.cart_id = item.id;
                _this.cartLoading = false;
                for (let i = 0; i < res.param.goods_data.length; i++) {
                    if (res.param.goods_data[i].param_value === item.goods_param) {
                        _this.selectObj = res.param.goods_data[i];
                        _this.selectObj.goods_number = item.goods_number;
                    }
                }
            }).catch(function (err) {
                console.error(err);
                _this.$toError();
            });
        },
        setEdit: function () {
            this.isEdit = !this.isEdit;
            for (let i = 0; i < this.failure.length; i++) {
                this.failure[i].is_select = false;
            }
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].is_select = false;
            }
        },
        setAll: function (bool) {
            if (this.isEdit) {
                for (let i = 0; i < this.failure.length; i++) {
                    this.failure[i].is_select = bool;
                }
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].is_select = bool;
                }
            } else {
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].is_select = bool;
                }
            }
        }
    },
    onLoad() {
        let _this = this;
        if (!this.isLogin) {
            uni.navigateTo({url: '/pages/user/login'});
            _this.isFirst = true;
        } else {
            this.isLoading = true;
            this.getList().then(function () {
                _this.isFirst = true;
            });
        }
    },
    watch: {
        list: {
            handler(newVal) {
                let all = 0;
                let data = [];
                this.total = 0;
                for (let i = 0; i < newVal.length; i++) {
                    if (newVal[i].is_select === true) {
                        let price = +newVal[i].price;
                        data.push(newVal[i]);
                        all += price * +newVal[i].goods_number;
                    }
                }
                this.select = data;
                this.total = all;
            },
            deep: true
        },
        "$store.state.cart.cart_add": {
            handler(val) {
                let _this = this;
                if (val) {
                    this.getList().then(function () {
                        _this.$store.commit('cart/setCartAdd', false);
                    });
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.he-loading {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
}

.he-loading__image {
    width: 96px;
    height: 96px;
    margin: 52px 0 42px 0;
}

.cart-list {
    width: 750px;
}

.he-top {
    height: 88px;
}

.he-body {
    padding: 0 20px 0 20px;
}

.he-button {
    width: 88px;
    text-align: center;
    line-height: 88px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}

.iconshoppingcart_shopname {
    font-size: 40px;
    color: #666666;
    margin-left: 20px;
}

.he-shop-name {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-left: 12px;
}

.he-failure-text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-bottom: 27px;
    margin-top: 27px;
}

.he-bottom {
    height: 96px;
}

.he-loading-require {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
}
</style>
