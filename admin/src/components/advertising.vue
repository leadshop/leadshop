<template>
    <div class="advertising">
        <div class="advertising-item-1" v-if="size==1">
            <el-image fit="cover" :src="adverArray[0].url" v-if="adverArray[0] && adverArray[0].url"></el-image>
            <div class="advertising-item-tips" v-else> <span>尺寸不限</span></div>
        </div>
        <div class="advertising-item-2" v-if="size==2">
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="0">
                <div class="advertising-item-image">
                    <el-image fit="cover" :src="adverArray[0].url" v-if="adverArray[0] && adverArray[0].url"></el-image>
                    <div class="advertising-item-tips" v-else><span>宽375像素高度不限</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="1">
                <div class="advertising-item-image">
                    <el-image fit="cover" :src="adverArray[1].url" v-if="adverArray[1] && adverArray[1].url"></el-image>
                    <div class="advertising-item-tips" v-else><span>宽375像素高度不限</span></div>
                </div>
            </label>
        </div>
        <div class="advertising-item-3" v-if="size==3">
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="0">
                <div class="advertising-item-image">
                    <el-image fit="cover" :src="adverArray[0].url" v-if="adverArray[0] && adverArray[0].url"></el-image>
                    <div class="advertising-item-tips" v-else><span>宽250像素高度不限</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="1">
                <div class="advertising-item-image">
                    <el-image fit="cover" :src="adverArray[1].url" v-if="adverArray[1].url && adverArray[1].url"></el-image>
                    <div class="advertising-item-tips" v-else><span>宽250像素高度不限</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="2">
                <div class="advertising-item-image">
                    <el-image fit="cover" :src="adverArray[2].url" v-if="adverArray[2] && adverArray[2].url"></el-image>
                    <div class="advertising-item-tips" v-else><span>宽250像素高度不限</span></div>
                </div>
            </label>
        </div>
        <div class="advertising-item-4" v-if="size==4">
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="0">
                <div class="advertising-item-image" :style="{
                'width': '162px',
                'height': '162px',
                'top':0,
                'left':0
            }">
                    <el-image fit="cover" :src="adverArray[0].url" v-if="adverArray[0] && adverArray[0].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>375X375像素或同比例</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="1">
                <div class="advertising-item-image" :style="{
                'width': '162px',
                'height': '81px',
                'top':0,
                'left':'161px',
            }">
                    <el-image fit="cover" :src="adverArray[1].url" v-if="adverArray[1].url && adverArray[1].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>375X188像素或同比例</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="2">
                <div class="advertising-item-image" :style="{
                'width': '162px',
                'height': '82px',
                'top':'80px',
                'left':'161px',
            }">
                    <el-image fit="cover" :src="adverArray[2].url" v-if="adverArray[2] && adverArray[2].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>375X188像素或同比例</span></div>
                </div>
            </label>
        </div>
        <div class="advertising-item-5" v-if="size==5">
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="0">
                <div class="advertising-item-image">
                    <el-image fit="cover" :src="adverArray[0].url" v-if="adverArray[0] && adverArray[0].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>宽188像素高度不限</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="1">
                <div class="advertising-item-image">
                    <el-image fit="cover" :src="adverArray[1].url" v-if="adverArray[1].url && adverArray[1].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>宽188像素高度不限</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="2">
                <div class="advertising-item-image">
                    <el-image fit="cover" :src="adverArray[2].url" v-if="adverArray[2] && adverArray[2].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>宽188像素高度不限</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="3">
                <div class="advertising-item-image">
                    <el-image fit="cover" :src="adverArray[3].url" v-if="adverArray[3] && adverArray[3].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>宽188像素高度不限</span></div>
                </div>
            </label>
        </div>
        <div class="advertising-item-4" v-if="size==6">
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="0">
                <div class="advertising-item-image" :style="{
                'width': '162px',
                'height': '81px',
                'top':0,
                'left':0
            }">
                    <el-image fit="cover" :src="adverArray[0].url" v-if="adverArray[0] && adverArray[0].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>375X375像素或同比例</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="1">
                <div class="advertising-item-image" :style="{
             'width': '162px',
                'height': '82px',
                'top':'80px',
                'left':0
            }">
                    <el-image fit="cover" :src="adverArray[1].url" v-if="adverArray[1].url && adverArray[1].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>375X375像素或同比例</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="2">
                <div class="advertising-item-image" :style="{
                'width': '162px',
                'height': '81px',
                'top':0,
                'left':'161px',
            }">
                    <el-image fit="cover" :src="adverArray[2].url" v-if="adverArray[2] && adverArray[2].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>375X188像素或同比例</span></div>
                </div>
            </label>
            <label class="advertising-item-label">
                <input class="advertising-item-radio" type="radio" v-model="active" name="advertising" :value="3">
                <div class="advertising-item-image" :style="{
                'width': '162px',
                'height': '82px',
                'top':'80px',
                'left':'161px',
            }">
                    <el-image fit="cover" :src="adverArray[3].url" v-if="adverArray[3] && adverArray[3].url"></el-image>
                    <div class="advertising-item-tips" v-else> <span>375X188像素或同比例</span></div>
                </div>
            </label>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        value: {
            type: [String, Number, Array],
            default: ''
        },
        size: {
            type: [String, Number],
            default: 5
        },
        data: {
            type: Array,
        }
    },
    data() {
        return {
            active: 0
        }
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        size(value) {
            this.active = 0;
        },
        active(value) {
            this.$emit('active', value);
        }
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        adverArray: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import './advertising.less';
</style>