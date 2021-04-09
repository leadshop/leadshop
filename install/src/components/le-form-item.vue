<template>
    <div class="le-form-item ">
        <div class="flex">
            <div class="le-form-item__label" :class="required ? 'le-item__required' : ''">{{label}}</div>
            <slot></slot>
        </div>
        <div v-if="tips" class="le-form-item__tips">{{tips}}</div>
    </div>
</template>

<script>
export default {
    name: "le-form-item",
    props: {
        label: {
            type: String
        },
        required: {
            type: Boolean,
            default: undefined
        },
        tips: {
            type: String
        }
    }
}
</script>

<style scoped>
.le-form-item {
    margin-bottom: 20px;
}
.le-form-item__label {
    width: 196px;
    line-height: 40px;
    text-align: right;
    padding-right: 16px;
    box-sizing: border-box;
}
.le-form-item__label.le-item__required:before {
    content: '*';
    color: #F5212D;
}
.le-form-item__tips {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #BFBFBF;
    padding-left: 196px;
    margin-top: 5px;
}
</style>
