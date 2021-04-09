<template>
    <view class="list-sort flex justify-around align-center" :data-theme="theme">
        <view class="he-item he-text" @tap="setActive('sort')" :class="key === 'sort' ? 'he-item-1' : 'he-item-0'">综合</view>
        <view class="he-item he-text" @tap="setActive('sales')" :class="key === 'sales' ? 'he-item-1' : 'he-item-0'">销量</view>
        <view class="he-item flex align-center" @tap="setActive('price')" :class="key === 'price' ? 'he-item-1' : 'he-item-0'">
            <view class="he-text">价格</view>
            <view class="flex flex-direction">
                <text class="iconfont he-price iconproductlist_rank_first" :class="key === 'price' && sort === 'ASC' ? 'he-icon' : 'he-default-icon'"></text>
                <text class="iconfont he-price iconproductlist_rank_second" :class="key === 'price' && sort === 'DESC' ? 'he-icon' : 'he-default-icon'"></text>
            </view>
        </view>
        <view class="he-item he-text" @tap="setActive('id')" :class="key === 'id' ? 'he-item-1' : 'he-item-0'">最新</view>
    </view>
</template>

<script>
export default {
    name: "list-sort",
    data() {
        return {
            key: 'sort',
            sort: 'DESC'
        }
    },
    methods: {
        setActive: function (data) {
            this.key = data;
            if (data === 'price') {
                if (this.sort === 'ASC') {
                    this.sort = 'DESC';
                } else {
                    this.sort = 'ASC';
                }
            } else {
                this.sort = 'DESC';
            }
            this.$emit('sort', {
                key: this.key,
                value: this.sort
            });
        }
    }
}
</script>

<style scoped lang="scss">
.list-sort {
    height: 70px;
    width: 100%;
    background-color: #FFFFFF;
    padding-bottom: 20px;
}
.he-item-0.he-text {
    color: #353535;
}
.he-item-1.he-text {
    @include font_color('font_color');
}
.he-item-1 .he-text {
    @include font_color('font_color');
}
.he-price-1 {
    color: #E60B30;
}
.he-text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
}
.he-price {
    width: 18px;
    height: 18px;
    font-size: 18px;
    margin-left: 4px;
}
.he-default-icon {
    color: #CCCCCC;
}
.he-icon {
    @include font_color('font_color');
}
</style>