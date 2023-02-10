<template>
    <client-only>
        <div style="height:600px; width:800px">
    <l-map
        v-model="zoom"
        v-model:zoom="zoom"
        :center="[50.0411622,21.9985728]"
        :zoom-snap="0.25"
    >
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
    </l-map>
    
</div>
</client-only>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

const zoom = ref(2);
</script>

<style scoped>

</style>