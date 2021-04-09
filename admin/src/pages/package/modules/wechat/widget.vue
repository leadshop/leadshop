<template>
    <Widget :index="index" type="wechat">
        <Element  :facade="facade" :content="content" ></Element>
    </Widget>
</template>
<script type="text/javascript">
import Widget from '@/components/widget.vue'
import Element from './element.vue'
export default {
    components: {
        Widget,
        Element
    },
    props: {
        index: {
            type: [Number, String]
        },
        facade: {
            type: [Object, Array]
        },
        content: {
            type: [Object, Array]
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>