<template>
    <view class="separate" :style="{
        paddingTop: facade.margin+'px',
        paddingBottom: facade.margin+'px'
    }">
        <view :style="{ 
                borderTopWidth: '1px' ,
                borderTopStyle:content.style,
                borderTopColor: facade.fill_color
            }">
        </view>
    </view>
</template>
<script type="text/javascript">
export default {
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
