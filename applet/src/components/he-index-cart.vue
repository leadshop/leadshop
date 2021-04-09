<template>
    <he-cart :show.sync="isShopping" :goods="goods" shopping-type="cart"></he-cart>
</template>

<script>
import heCart from "./he-cart.vue";

export default {
    name: "he-index-cart",
    data() {
        return {
            isShopping: false,
            goods: {}
        }
    },
    props: {
        goodsId: [Number]
    },
    components: {
        heCart
    },
    watch: {
        goodsId: {
            handler(val) {
                val&&this.shopping(val);
            }
        },
        isShopping: function (val) {
            if (!val) this.$emit('update:goodsId', null);
        }
    },
    methods: {
        shopping: function(id) {
            let _this = this;
            this.$heshop.goods('get', id).then(function(res) {
                if (!res.hasOwnProperty('empty_status')) {
                    _this.goods = res;
                    _this.isShopping = true;
                }
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        }
    }
}
</script>