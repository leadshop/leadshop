<template>
    <view class="he-number-box">
        <view class="he-icon-minus" @touchstart.stop.prevent="btnTouchStart('minus')" @touchend.stop.prevent="clearTimer" :class="{ 'he-icon-disabled': disabled || inputVal <= min }"
              :style="{
				height: inputHeight + 'rpx'
			}">
            <view class="iconfont iconbtn_subtract"></view>
        </view>
        <input :disabled="disabledInput || disabled" :cursor-spacing="getCursorSpacing" :class="{ 'he-input-disabled': disabled }"
               v-model="inputVal" class="he-number-input" @blur="onBlur" @focus="onFocus"
               type="number" :style="{
				height: inputHeight + 'rpx',
				width: inputWidth + 'rpx'
			}" />
        <view class="he-icon-plus" @touchstart.stop.prevent="btnTouchStart('plus')" @touchend.stop.prevent="clearTimer" :class="{ 'he-icon-disabled': disabled || inputVal >= max }"
              :style="{
				height: inputHeight + 'rpx'
			}">
            <view class="iconfont iconbtn_add"></view>
        </view>
    </view>
</template>

<script>
export default {
    name: "he-number-box",
    props: {
        // 预显示的数字
        value: {
            type: Number,
            default: 1
        },
        // 最小值
        min: {
            type: Number,
            default: 0
        },
        // 最大值
        max: {
            type: Number,
            default: 99999
        },
        // 步进值，每次加或减的值
        step: {
            type: Number,
            default: 1
        },
        // 是否禁用加减操作
        disabled: {
            type: Boolean,
            default: false
        },
        // input宽度，单位rpx
        inputWidth: {
            type: [Number, String],
            default: 84
        },
        // input高度，单位rpx
        inputHeight: {
            type: [Number, String],
            default: 44
        },
        // index索引，用于列表中使用，让用户知道是哪个numberbox发生了变化，一般使用for循环出来的index值即可
        index: {
            type: [Number, String],
            default: ''
        },
        // 是否禁用输入框，与disabled作用于输入框时，为OR的关系，即想要禁用输入框，又可以加减的话
        // 设置disabled为false，disabledInput为true即可
        disabledInput: {
            type: Boolean,
            default: false
        },
        // 输入框于键盘之间的距离
        cursorSpacing: {
            type: [Number, String],
            default: 100
        },
        // 是否开启长按连续递增或递减
        longPress: {
            type: Boolean,
            default: true
        },
        // 开启长按触发后，每触发一次需要多久
        pressTime: {
            type: [Number, String],
            default: 250
        },
        // 是否只能输入大于或等于0的整数(正整数)
        positiveInteger: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        value(v1, v2) {
            if(!this.changeFromInner) {
                this.inputVal = v1;
                this.$nextTick(function(){
                    this.changeFromInner = false;
                })
            }
        },
        inputVal: {
            handler(v1, v2) {
                if (v1 == '') return;
                let value = 0;
                let tmp = this.number(v1);
                if (tmp && v1 >= this.min && v1 <= this.max) value = v1;
                else value = v2;
                if(this.positiveInteger) {
                    if(v1 < 0 || String(v1).indexOf('.') !== -1) {
                        value = v2;
                        this.$nextTick(() => {
                            this.inputVal = v2;
                        })
                    }
                }
                this.handleChange(value, 'change');
            }
        }
    },
    data() {
        return {
            inputVal: 1,
            timer: null,
            changeFromInner: false,
            innerChangeTimer: null,
        };
    },
    created() {
        this.inputVal = Number(this.value);
    },
    computed: {
        getCursorSpacing() {
            return Number(uni.upx2px(this.cursorSpacing));
        }
    },
    methods: {
        btnTouchStart(callback) {
            this[callback]();
            if (!this.longPress) return;
            clearInterval(this.timer);
            this.timer = null;
            this.timer = setInterval(() => {
                this[callback]();
            }, this.pressTime);
        },
        clearTimer() {
            this.$nextTick(() => {
                clearInterval(this.timer);
                this.timer = null;
            })
        },
        minus() {
            this.computeVal('minus');
        },
        plus() {
            this.computeVal('plus');
        },
        calcPlus(num1, num2) {
            let baseNum, baseNum1, baseNum2;
            try {
                baseNum1 = num1.toString().split('.')[1].length;
            } catch (e) {
                baseNum1 = 0;
            }
            try {
                baseNum2 = num2.toString().split('.')[1].length;
            } catch (e) {
                baseNum2 = 0;
            }
            baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
            let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2; //精度
            return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision);
        },
        calcMinus(num1, num2) {
            let baseNum, baseNum1, baseNum2;
            try {
                baseNum1 = num1.toString().split('.')[1].length;
            } catch (e) {
                baseNum1 = 0;
            }
            try {
                baseNum2 = num2.toString().split('.')[1].length;
            } catch (e) {
                baseNum2 = 0;
            }
            baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
            let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
            return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
        },
        computeVal(type) {
            try {
                if (!this.disabledInput) uni.hideKeyboard();
                if (this.disabled) return;
                let value = 0;
                // 减
                if (type === 'minus') {
                    value = this.calcMinus(this.inputVal, this.step);
                } else if (type === 'plus') {
                    value = this.calcPlus(this.inputVal, this.step);
                }
                value = +value;
                if (value < this.min || value > this.max) {
                    return;
                }
                this.inputVal = value;
                this.handleChange(value, type);
            } catch (e) {
                console.error(e);
            }
        },
        onBlur(event) {
            let val = 0;
            let value = event.detail.value;
            if (!/(^\d+$)/.test(value) || value[0] == 0) val = this.min;
            val = +value;
            if (val > this.max) {
                val = this.max;
            } else if (val < this.min) {
                val = this.min;
            }
            this.$nextTick(() => {
                this.inputVal = val;
            })
            this.handleChange(val, 'blur');
        },
        onFocus() {
            this.$emit('focus');
        },
        handleChange(value, type) {
            if (this.disabled) return;
            if(this.innerChangeTimer) {
                clearTimeout(this.innerChangeTimer);
                this.innerChangeTimer = null;
            }
            this.changeFromInner = true;
            this.innerChangeTimer = setTimeout(() => {
                this.changeFromInner = false;
            }, 150);
            this.$emit('input', Number(value));
            this.$emit(type, {
                value: Number(value),
                index: this.index
            })
        },
        number(value) {
            return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
        }
    }
};
</script>

<style  scoped>

.he-number-box {
    display: inline-flex;
    align-items: center;
}

.he-number-input {
    position: relative;
    text-align: center;
    padding: 0;
    margin: 0 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F5F5F5;
    border-radius: 4px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
}

.he-icon-plus,
.he-icon-minus {
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
}

.he-icon-plus {
    border-radius: 0 8px 8px 0;
}

.he-icon-minus {
    border-radius: 8px 0 0 8px;
}

.he-icon-disabled .iconfont{
    color: RGBA(229, 229, 229, 1);
}

.he-input-disabled {
    color: #c8c9cc !important;
    background-color: #f2f3f5 !important;
}

.iconfont {
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: RGBA(102, 102, 102, 1);
}
</style>
