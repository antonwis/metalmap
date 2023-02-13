<template>
    <div :class="active ? 'active' : 'inactive'">
    <div class="head">
        <a @click="close"><i>X</i></a>
        <h2>{{ country }}</h2>
    </div>
    <div class="block">
        <p>Number of bands: {{  }}</p>
    </div>

    </div>
</template>

<script setup>
import { getBandsInCountry } from '~~/controllers/bandController';

const props = defineProps(['country'])
const { data } = await getBandsInCountry(props.country)
console.log(data);

</script>

<style scoped>
.active {
    position: fixed;
  height: 100vh;
  width: 20vw;
  opacity: 0.8;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: black;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-transform: translateX(0vw);
  transform: translateX(0vw);
  overflow: auto;
}
.inactive {
    position: fixed;
  height: 100vh;
  width: 25vw;
  opacity: 0.8;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: black;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-transform: translateX(-25vw);
  transform: translateX(-25vw);
  overflow: auto;
}
</style>