<template>
    <div class="search" :style="{ 
                'padding-top': facade.high_style/2 + 'px' ,
                'padding-bottom': facade.high_style/2 + 'px' ,
                'background-color':facade.background_color,
            }">
        <div class="search-content" :class="{'angle':facade.border_style==2}" :style="{ 
                textAlign: facade.text_align ,
                color: facade.text_color ,
                'background-color':facade.border_color,
            }">
            <i class="le-icon le-icon-search" :style="{ 
                color: facade.icon_color ,
            }"></i><span>{{content.text||'请输入关键字搜索'}}</span>
        </div>
    </div>
</template>
<script type="text/javascript">
// import empty from './empty.vue'
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
<style lang="less" scoped>
@import './element.less';
</style>