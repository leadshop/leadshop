<template>
    <view class="blank" :style="{ 
                height: facade.height + 'px',
                backgroundColor: facade.background_color
            }">
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
    }
};
</script>