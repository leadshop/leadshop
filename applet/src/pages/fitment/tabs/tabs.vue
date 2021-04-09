<template>
    <view class="tabs">
        <view class="tabs-header" :class="{'active':active}">
            <checkbox-group @change="checkboxChange">
                <label class="tabs-header-icon" v-if="is_arrow">
                    <checkbox class="tabs-header-checkbox" value="cb" />
                    <text class="iconfont" :class="{'iconarrow-down':!active,'iconarrow-top':active}"></text>
                </label>
            </checkbox-group>
            <view class="tabs-header-active" v-if="active">
                分类切换
            </view>
            <radio-group @change="radioChange" class="tabs-header-list" :class="{'tab-active':active}">
                <label ref="imgBox" class="tabs-header-item" v-for="(item,index) in content.data" :key="index">
                    <radio class="tabs-header-radio" :value="`${index}`"></radio>
                    <view class="tabs-header-title" :class="{'active':index === select}">{{item.title}}</view>
                </label>
            </radio-group>
        </view>
        <view class="tabs-content" :class="{'tabs-content-active':active}">
            <template v-for="(item,index) in content.data">
                <view class="tabs-content-item" v-show="select===index" :key="index">
                    <Goods :facade="facade" :content="getContent(item)"></Goods>
                </view>
            </template>
        </view>
    </view>
</template>
<script type="text/javascript">
import Goods from '../goods/goods.vue'
export default {
    components: {
        Goods
    },
    props: {
        facade: {
            type: [Object, Array]
        },
        content: {
            type: [Object, Array]
        }
    },
    data() {
        return {
            is_arrow: false,
            active: false,
            select: 0
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        goodsContent() {
            if (this.content.data.length > 0) {
                let data = this.content.data[this.select];
                return {
                    ...data,
                    'is_title': this.content.is_title,
                    'is_price': this.content.is_price,
                    'is_button': this.content.is_button
                }
            }
            return {
                'type': 1,
                'goods': [],
                'group': {},
                'is_title': this.content.is_title,
                'is_price': this.content.is_price,
                'is_button': this.content.is_button
            }
        }
    },
    /**
     * 页面渲染前
     * @return {[type]} [description]
     */
    created() {

    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {

    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.getImgBox();
    },
    methods: {
        getContent(data) {
            return {
                ...data,
                'is_title': this.content.is_title,
                'is_price': this.content.is_price,
                'is_button': this.content.is_button
            }
        },
        getImgBox() {
            let win = uni.getSystemInfoSync();
            let w = 0;
            this.is_arrow = false;
            let view = uni.createSelectorQuery().in(this).selectAll(".tabs-header-item").boundingClientRect(data => {
                for (let index in data) {
                    let item = data[index];
                    w += item.width;
                    if (w > win.screenWidth - 100) {
                        this.is_arrow = true;
                    }
                }
            }).exec();
        },
        radioChange(evt) {
            this.select = parseInt(evt.target.value)
        },
        checkboxChange(evt) {
            this.active = evt.target.value.length > 0;
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>