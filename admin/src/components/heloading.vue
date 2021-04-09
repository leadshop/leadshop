<template>
    <div class="modal-bg" v-show="value.show">
        <div class="modal-container">
            <div class="modal-header" @click="hideModal">
                <he-icon class="close-icon" type="le-icon-fork"></he-icon>
            </div>
            <div class="modal-main">
                <img v-if="value.type === 1" class="modal-image" src="./image/loading.gif" alt="">
                <img v-if="value.type === 2" class="modal-image" src="./image/success.png" alt="">
                <img v-if="value.type === 3" class="modal-image" src="./image/error.png" alt="">
                <img v-if="value.type === 4" class="modal-image" src="./image/loading2.gif" alt="">
                <div class="model-content">
                    <span v-if="value.type === 1">内容生成中，请稍后...</span>
                    <span v-if="value.type === 2 && page">内容已生成，即将跳转下载页面({{number}})</span>
                    <span v-if="value.type === 2 && !page">内容已生成</span>
                    <span v-if="value.type === 3">内容生成失败，请重试</span>
                </div>
                <he-link v-if="value.type === 2 && path && page" :href="`${path}/${page}`">
                    <span class="modal-link" v-if="value.type === 2 && path && page" @click="clearTime">点击这里直接跳转</span>
                </he-link>
                <div v-if="value.type === 3" class="modal-botton" @click="submit">重新生成</div>
            </div>
            <!-- <div class="modal-footer">
                <el-button round @click="hideModal">取消</el-button>
                <el-button type="primary" round @click="submit">确认</el-button>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'modal',
    props: {
        value: {
            type: Object
        },
        path: {
            type: String
        },
        page: {
            type: String
        }
    },
    data() {
        return {
            number: 3,
            timer: null
        }
    },
    mounted() {

    },
    methods: {
        hideModal() {
            clearInterval(this.timer);
            this.value.show = false;
        },

        submit() {
            this.$emit('submit')
        },
        clearTime() {
            clearInterval(this.timer);
        }

    },
    watch: {
        'value.type': {
            handler(newVal) {
                if (newVal === 2) {
                    this.number = 3;
                    this.timer = setInterval(() => {
                        this.number--;
                        if (this.number <= 0) {
                            clearInterval(this.timer);
                            this.$router.push(this.page);
                        }
                    }, 1000);
                }
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
}

.modal-container {
    width: 340px;
    height: 320px;
    background: #fff;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.close-icon {
    position: absolute;
    right: -32px;
    top: -4px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;

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
    margin-top: 72px;
    text-align: center;

    .modal-image {
        width: 120px;
        height: 120px;
        margin: 0 auto;
    }

    .model-content {
        display: block;
        margin: 24px 0 12px 0;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        line-height: 20px;
        opacity: 0.85;

    }

    .modal-link {
        font-size: 14px;
        font-weight: 400;
        color: #623ceb;
        line-height: 20px;
        opacity: 0.85;
    }

    .modal-botton {
        width: 96px;
        height: 32px;
        line-height: 32px;
        background: #623CEB;
        border-radius: 4px;
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
        cursor: pointer;
    }
}
</style>