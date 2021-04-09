<template>
    <div class="modal-bg" v-show="show">
        <div class="modal-container">
            <div class="modal-header">
            </div>
            <div class="modal-main">
                <img class="modal-image" src="./image/loading2.gif" alt="">
                <div class="model-content">
                    <span>模板启用中，请稍后...</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'modal',
    props: {
        show: {
            type: [Boolean, Object]
        }
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    },
    watch: {

    },
}
</script>
<style lang="scss" scoped>
.modal-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,.8);
    z-index: 10;
}

.modal-container {
    //width: 479px;
    //height: 235px;
    //background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}


.modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 57px;
    border-top: 1px solid #ddd;
}

.modal-footer button {
    width: 100px;
}

.modal-main {
    margin-top: 64px;
    text-align: center;

    .modal-image {
        width: 60px;
        height: 60px;
        margin: 0 auto;
    }

    .model-content {

        font-size: 14px;
        font-weight: 500;
        color: #8C8C8C;
        line-height: 22px;

    }
}
</style>