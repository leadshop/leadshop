<template>
    <he-popup mode="bottom" v-model="showModal" :borderRadius="16">
        <view class="he-select-address" :data-theme="theme">
            <view class="he-header">
                <text class="he-header__title">所在地址</text>
                <text class="iconfont iconpopup_close fr" @click="showModal = false;"></text>
            </view>
            <view class="he-body flex align-center">
                <view class="he-body__item" @click="active = 0" :class="active === 0 ? 'he-body__item-1' : 'he-body__item-0'">{{province}}</view>
                <view class="he-body__item" v-if="provinceIndex !== -1"
                      @click="active = 1" :class="active === 1 ? 'he-body__item-1' : 'he-body__item-0'">{{city}}</view>
                <view class="he-body__item" v-if="cityIndex !== -1"
                      @click="active = 2" :class="active === 2 ? 'he-body__item-1' : 'he-body__item-0'">{{district}}</view>
            </view>
            <view class="he-footer">
                <template v-if="list.length > 0">
                    <scroll-view class="he-scroll-view" scroll-y>
                        <view class="he-scroll-item"
                              v-if="active === 0"
                              @click="() => {setActive('provinceIndex', index)}"
                              :class="provinceIndex === index ? 'he-scroll-item-1' : 'he-scroll-item-0'"
                              v-for="(item, index) in list"
                              :key="index">{{item.name}}</view>
                        <template v-if="provinceIndex !== -1">
                            <view class="he-scroll-item"
                                  v-if="active === 1"
                                  @click="() => {setActive('cityIndex', index)}"
                                  :class="cityIndex === index ? 'he-scroll-item-1' : 'he-scroll-item-0'"
                                  v-for="(item, index) in list[provinceIndex].list"
                                  :key="index">{{item.name}}</view>
                           <template v-if="cityIndex !== -1">
                               <view class="he-scroll-item"
                                     v-if="active === 2"
                                     @click="() => {setActive('districtIndex', index)}"
                                     :class="districtIndex === index ? 'he-scroll-item-1' : 'he-scroll-item-0'"
                                     v-for="(item, index) in list[provinceIndex].list[cityIndex].list"
                                     :key="index">{{item.name}}</view>
                           </template>
                        </template>
                    </scroll-view>
                </template>
            </view>
        </view>
    </he-popup>
</template>

<script>
import hePopup from "./he-popup.vue";
import {mapActions, mapGetters} from "vuex";
export default {
    name: "he-select-address",
    components: {
        hePopup
    },
    props: {
        value: {
            type: Boolean
        },
        select: {
            type: Object,
            default: function() {
                return {
                    province: '',
                    city: '',
                    district: ''
                }
            }
        }
    },
    data() {
        return {
            active: 0,
            province:'请选择',
            city:'请选择',
            district:'请选择',
            provinceIndex: -1,
            cityIndex: -1,
            districtIndex: -1
        }
    },
    computed: {
        showModal: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        },
        ...mapGetters('setting', {
            list: "addressJson"
        })
    },
    created() {
        this.getAddressJson();
    },
    methods: {
        ...mapActions({
            getAddressJson: 'setting/getAddress'
        }),
        setActive: function(key, index) {
            this[key] = index;
            if (key === 'provinceIndex') {
                this.active = 1;
                this.province = this.list[index].name;
                this.city = '请选择';
                this.district = '请选择';
                this.cityIndex = -1;
                this.districtIndex = -1;
            } else if (key === 'cityIndex') {
                this.active = 2;
                this.city = this.list[this.provinceIndex].list[index].name;
            } else {
                this.district = this.list[this.provinceIndex].list[this.cityIndex].list[index].name;
                this.showModal = false;
                this.$emit('select', [{index: this.provinceIndex, name: this.province}, {index: this.cityIndex, name: this.city}, {index: index, name: this.district}]);
            }
        }
    },
    watch: {
        select: {
            handler(newVal) {
                let { province, city, district } = newVal;
                for (let i = 0;i< this.list.length; i++) {
                    if (this.list[i].name === province) {
                        this.provinceIndex = i;
                        this.province = this.list[i].name;
                        this.active = 0;
                    }
                }
                if (this.list.length > 0 && this.provinceIndex > -1) {
                    for (let i = 0;i < this.list[this.provinceIndex].list.length ; i++) {
                        let name = this.list[this.provinceIndex].list[i].name
                        if ( name=== city) {
                            this.cityIndex = i;
                            this.city = name;
                            this.active = 1;
                        }
                    }
                    if (this.cityIndex > -1) {
                        for (let i = 0;i < this.list[this.provinceIndex].list[this.cityIndex].list.length ; i++) {
                            let name = this.list[this.provinceIndex].list[this.cityIndex].list[i].name;
                            if ( name=== district) {
                                this.districtIndex = i;
                                this.district = name;
                                this.active = 2;
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.he-select-address {
    height: 63vh;
    padding: 0 32px;
}
.he-header {
    height: 56px;
    line-height: 56px;
    text-align: center;
    margin-top: 16px;
}
.iconpopup_close {
    font-size: 28px;
    width: 28px;
    height: 28px;
    line-height: 1;
    color: #9D9D9D;
    margin-top: 18px;
}
.he-header__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.he-body {
    border-bottom:1px solid #E5E5E5;
    padding: 0 8px;
    margin-top: 32px;
}
.he-body__item {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-right: 57px;
    padding: 15px 0;
}
.he-body__item-0 {
    border-bottom: 4px solid transparent;
}
.he-body__item-1 {
    border-bottom-style: solid;
    border-bottom-width: 4px;
    @include border_color('border_color');
}
.he-footer {
    height: calc(63vh - 160px);
}
.he-footer .he-scroll-view {
    height: calc(63vh - 160px);
    padding-top: 16px;
}
.he-scroll-item {
    height: 72px;
    line-height: 72px;
    font-size: 26px;
    font-family: PingFang SC;
}
.he-scroll-item-1 {
    font-weight: bold;
    @include font_color('font_color');
}
.he-scroll-item-0 {
    font-weight: 500;
    color: #222222;
}
</style>
