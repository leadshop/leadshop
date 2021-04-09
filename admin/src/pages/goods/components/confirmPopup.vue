<template>
    <div class="le-confirmpopup">
        {{value.text}}
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: function() {
                return {
                    text: '提示内容',
                    type: 0, // 0 - 单个删除
                }
            }
        }
    },
    name: "confirmPopup",
    methods: {
        affirm(e) {
            let { handleClose } = e;
            switch (this.value.type) {
                case 0:
                    for (let i = 0; i < this.value.list.length; i++) {
                        if ( this.value.list[i].id === this.value.id) {
                            this.$delete(this.value.list, i);
                        }
                    }
                    this.$emit('input', this.value);
                    break;
            }
            handleClose();
        }
    }
}
</script>

<style scoped>
    .le-confirmpopup {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        line-height: 20px;
        opacity: 0.85;
        text-align: center;
        margin-bottom: 12px;
    }
</style>
