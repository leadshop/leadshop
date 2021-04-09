<template>
    <div class="cover-img-mask" @drop="drop" @dragover.prevent :draggable="false" data-type="forbid">
        <span>释放鼠标将组建添加到此处</span>
    </div>
</template>
<script type="text/javascript">
export default {
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        coms() {
            return this.$store.state.pages.coms;
        }
    },
    methods: {
        drop($event) {
            this.$store.dispatch('pages/pushPagesComs');
        }
    }
};
</script>
<style type="text/css" scoped="true">
.cover-img-mask {
    min-height: 40px;
    border: 1px dashed #623CEB;
    background: rgba(98, 60, 235, 0.05);
    -webkit-transition: .3s linear;
    transition: .3s linear;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 14px;
    color: #cccccc;
    margin-left: -1px;

}

.cover-img-mask span {
    font-size: 14px;
    font-weight: 400;
    color: #623CEB;
    line-height: 12px;
}

.cover-img-mask i {
    font-size: 18px;
}
</style>