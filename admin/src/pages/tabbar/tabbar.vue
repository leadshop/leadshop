<template>
    <div class="tabberWarp" :style="{background:background}">
        <div class="warp" :style="{background:background}">
            <Item :text='item.text' :color="color" :page='item.page' @change='getVal' v-for='(item,index) in tabbarDes' :key="index">
                <img :src="item.iconPath" slot='iconPath' v-if="type == 2">
                <img :src="item.selectedIconPath" slot='selectedIconPath' v-if="type == 2">
            </Item>
        </div>
    </div>
</template>
<script type="text/javascript">
import Item from './item.vue'
export default {
    components: {
        Item
    },
    props: {
        tabbarDes: {
            type: [Object, Array]
        },
        type: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            default: "#666666"
        },
        background: {
            type: String,
            default: "#FFFFFF"
        },
    },
    data: function() {
        return {
            selected: 'skin2'
        }
    },
    methods: {
        getVal: function(res) {
            this.selected = res;
        }
    }
}
</script>
<style type="text/css">
.warp {
    width: 100%;
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 0;
}

.warp img {
    width: 20px;
    height: 20px;
}

.tabberWarp img {
    margin-top: 10px;
    margin-bottom: 5px;
}

.tabberWarp {
    position: absolute;
    bottom: 0;
    left: -2px;
    width: 100%;
    padding-bottom: 5px;

    border: 2px solid #623CEB;
}
</style>