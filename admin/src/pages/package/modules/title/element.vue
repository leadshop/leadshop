<template>
    <div class="title" :style="{ 
                'padding-top': facade.margin + 'px',
                'padding-bottom': facade.margin + 'px',
            }">
        <div class="title-style1" v-if="content.style == 1" :style="{color: facade.title_color}">
            <div class="title-content">
                {{content.title}}
            </div>
        </div>
        <div class="title-style2" v-if="content.style == 2" :style="{color: facade.title_color}">
            <div class="title-content">
                {{content.title}}
            </div>
            <div class="title-decorate">◇</div>
        </div>
        <div class="title-style3" v-if="content.style == 3">
            <div class="title-content" :style="{
                'color': facade.title_color,
                'font-size': facade.title_font_size+'px'
            }">
                {{content.title}}
            </div>
            <div class="title-more" :style="{
                'color': facade.more_color
            }" v-if="content.is_more">
                {{content.moretitle}} <i class="le-icon le-icon-arrow-right"></i>
            </div>
            <div class="title-subtitle" :style="{
                'color': facade.subtitle_color,
                'font-size': facade.subtitle_font_size+'px'
            }">
                {{content.subtitle}}
            </div>
        </div>
    </div>
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
<style lang="less" scoped>
@import './element.less';
</style>