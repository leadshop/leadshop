<template>
    <div class="itemWarp flex_mid" @click='changePage'>
        <span v-show='!bol'>
            <slot name='iconPath'></slot>
        </span>
        <span v-show='bol'>
            <slot name='selectedIconPath'></slot>
        </span>
        <span v-text='text' :style="{color:color}"></span>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'Item',
    props: {
        text: {
            type: String
        },
        page: {
            type: String
        },
        color: {
            type: String,
            default: "#666666"
        },
        sel: {
            type: String,
            default: 'skin'
        }
    },
    computed: {
        bol: function() {
            if (this.sel == this.page) {
                return true;
            }
            return false;
        }
    },
    methods: {
        changePage: function() {

        }
    }
}
</script>
<style type="text/css">
.itemWarp {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 50px;
}

.itemWarp span {
    font-size: 12px;
    color: #666666,
}
</style>