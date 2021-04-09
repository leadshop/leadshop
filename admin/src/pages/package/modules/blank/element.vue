<template>
    <div class="blank" :style="{ 
                height: facade.height + 'px',
                backgroundColor: facade.background_color
            }">
    </div>
</template>
<script type="text/javascript">
import pointer from '@/components/pointer.vue'

export default {
    components: {
        pointer
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

        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        margin() {
            if (this.facade.chamfer_style == 1) {
                return 0;
            } else {
                return 10;
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>