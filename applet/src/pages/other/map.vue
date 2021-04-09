<template>
    <map id="map" class="he-map he-page-content"></map>
</template>

<script>
export default {
    name: "map",
    onLoad() {
        this.createMap();
    },
    methods: {
        createMap: function() {
            uni.createMapContext('map', this);
        }
    }
}
</script>
