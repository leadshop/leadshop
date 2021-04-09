<template>
    <div class="he-empty__popup"></div>
</template>

<script>
export default {
    name: "he-empty__popup",
    props: {
        value: {
            type: [Object, Array, Number]
        }
    },
    methods: {
        affirm(e) {
            let { handleClose } = e;
            handleClose();
        }
    }
};
</script>
