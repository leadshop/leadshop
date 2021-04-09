<template>
    <view class="he-toast" :style="[style]" @touchmove.stop.prevent="() => {}" v-if="visibleSync">
        <view class="he-toast__box" :class="showDrawer ? 'he-drawer-content-visible' : ''">
            <slot></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "he-toast",
    props: {
        zIndex: {
            type: [Number, String],
            default: ''
        },
        popup: {
            type: Boolean,
            default: true
        },
        // 遮罩打开或收起的动画过渡时间，单位ms
        duration: {
            type: [String, Number],
            default: 250
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visibleSync: false,
            showDrawer: false,
            closeFromInner: false, // value的值改变，是发生在内部还是外部
        }
    },
    mounted() {
        // 组件渲染完成时，检查value是否为true，如果是，弹出popup
        this.value && this.open();
    },
    methods: {
        close() {
            // 标记关闭是内部发生的，否则修改了value值，导致watch中对value检测，导致再执行一遍close
            // 造成@close事件触发两次
            this.closeFromInner = true;
            this.change('showDrawer', 'visibleSync', false);
        },
        open() {
            this.change('visibleSync', 'showDrawer', true);
        },
        // 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
        // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
        change(param1, param2, status) {
            // 如果this.popup为false，意味着为picker，actionsheet等组件调用了popup组件
            if (this.popup == true) {
                this.$emit('input', status);
            }
            this[param1] = status;
            if(status) {
                // #ifdef H5 || MP
                this.timer = setTimeout(() => {
                    this[param2] = status;
                    this.$emit(status ? 'open' : 'close');
                }, 50);
                // #endif
                // #ifndef H5 || MP
                this.$nextTick(() => {
                    this[param2] = status;
                    this.$emit(status ? 'open' : 'close');
                })
                // #endif
            } else {
                this.timer = setTimeout(() => {
                    this[param2] = status;
                    this.$emit(status ? 'open' : 'close');
                }, this.duration);
            }
        }
    },
    computed: {
        style() {
            let style = {};
            style.zIndex = this.uZindex;
            return style;
        },
        uZindex() {
            return this.zIndex ? this.zIndex : this.$zIndex.popup;
        }
    },
    watch: {
        value(val) {
            if (val) {
                this.open();
            } else if(!this.closeFromInner) {
                this.close();
            }
            this.closeFromInner = false;
        }
    },
}
</script>

<style scoped>
.he-toast {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.he-toast__box {
    width: 256px;
    height: 256px;
    background-color: rgba(0,0,0, 0.5);
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
}
.he-drawer-content-visible.he-toast__box {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
}
.he-drawer-content-visible {
    transform: translate3D(0, 0, 0) translate(-50%, -50%) !important;
}
</style>