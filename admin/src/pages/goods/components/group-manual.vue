<template>
    <div class="group-manual">
        <img class="group-manual__img" src="../image/group-manual.png" alt="">
    </div>
</template>

<script>
export default {
    name: "group-manual",
    methods: {
        affirm(e) {
            let {handleClose} = e;
            handleClose();
        }
    }
}
</script>

<style scoped>
.group-manual {
    height: 480px;
    overflow-y: auto;
}

.group-manual__img {
    width: 600px;
}
</style>