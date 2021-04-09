<template>
    <input :type="type" ref="input" class="le-input" @input="handleInput" :placeholder="placeholder">
</template>
<script>
export default {
    name: "le-input",
    props: {
        placeholder: {
            type: String
        },
        modelValue: [String, Number],
        type: String
    },
    watch: {
        nativeInputValue() {
            this.setNativeInputValue();
        }
    },
    computed: {
        nativeInputValue() {
            return this.modelValue === null || this.modelValue === undefined ? '' : String(this.modelValue);
        },
    },
    mounted() {
        this.setNativeInputValue();
    },
    methods: {
        handleInput(event) {
            // 解决IE问题
            if (event.target.value === this.nativeInputValue) return;
            this.$emit('update:modelValue', event.target.value);
        },
        setNativeInputValue() {
            const input = this.getInput();
            if (!input) return;
            if (input.value === this.nativeInputValue) return;
            input.value = this.nativeInputValue;
        },
        getInput() {
            return this.$refs.input || this.$refs.textarea;
        }
    }
}
</script>
<style scoped>
.le-input {
    width: 320px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    padding-left: 12px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #262626;
    box-sizing: border-box;
}

.le-input:focus {
    outline: none;
}

.le-input::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #BFBFBF;
}

.le-input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #BFBFBF;
}

.le-input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #BFBFBF;
}

.le-input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #BFBFBF;
}
</style>
