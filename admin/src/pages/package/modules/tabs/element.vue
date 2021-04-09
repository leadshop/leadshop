<template>
    <div class="tabs">
        <div class="tabs-header" :class="{'active':active}">
            <label class="tabs-header-icon" v-if="is_arrow">
                <input class="tabs-header-checkbox" type="checkbox" :value="true" v-model="active">
                <i class="le-icon le-icon-arrow-down" :class="{'le-icon-arrow-down':!active,'le-icon-arrow-top':active}"></i>
            </label>
            <div class="tabs-header-active" v-if="active">
                分类切换
            </div>
            <label ref="imgBox" class="tabs-header-item" v-for="(item,index) in content.data" :key="index">
                <input class="tabs-header-radio" type="radio" :value="index" v-model="select">
                <div class="tabs-header-title">{{item.title}}</div>
            </label>
        </div>
        <div class="tabs-content">
            <div class="tabs-content-item">
                <Goods :facade="facade" :content="goodsContent"></Goods>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Goods from '../goods/element.vue'
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
            this.getImgBox();
            if (this.content.data.length > 0) {
                let data = this.content.data[0];
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
    methods: {
        getImgBox() {
            this.is_arrow = false;
            if (this.$refs.imgBox && this.$refs.imgBox[1]) {
                let w = 0;
                for (let index in this.$refs.imgBox) {
                    let el = this.$refs.imgBox[index];
                    if (el.offsetWidth) {
                        w += el.offsetWidth;
                        if (w > 265) {
                            this.is_arrow = true;
                        }
                    }
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>