<template>
    <div :class="activeModal ? 'bandinfoActive' : 'bandinfoNotActive'">
    <div class="flex justify-between p-5 text-3xl text-gray-50 border-solid border-2">
      <h1 v-if="band">{{ band.name }}</h1>
      <button @click="close"><i>X</i> </button>
    </div>
    <div class="flex flex-col border-solid text-gray-50 m-5 p-5 w-max" v-if="band">
      <h1 class="text-2xl">Genre: {{ band.genre }}</h1>
      <h1 class="text-2xl">Status: {{ band.status }}</h1>
      <h1 class="text-2xl">Country: {{ band.country }}</h1>
      <button @click="fetchData">test</button>
      <h1 class="text-2xl">View on:
        <a :href="band.link" target="_blank">Metal-archives</a></h1>
    </div>

    </div>
</template>

<script setup>
import { getBandInfo } from '../controllers/bandController';

const props = defineProps(['band', 'activeModal'])
const emit = defineEmits(['modal-active'])

const logo = ref(null);
const photo = ref(null);
const formed = ref(null);
const yearsActive = ref(null);
const location = ref(null);
const loading = ref(false);
const albums = ref([]);

const test = (x) => {
  console.log(x.link);
}

const fetchData = async () => {
  const link = props.band.link;
  const info = await getBandInfo(link);
  return info;
}
/*
watch(() => (activeModal, band), value => {
  logo.value = null;
  photo.value = null;
  formed.value = null;
  yearsActive.value = null;
  location.value = null;
  albums.value = null;
  //fetchData().then()

})
*/

const close = () => {
      emit("modal-active");
    };


</script>

<style scoped>
.x {
  padding: 5px;
  display: flex;
  font-size: 30px;
  color: gray;
  border: solid;
}
.x > a {
  position: fixed;
  margin-right: 1vw;
  right: 0;
  align-content: center;
  font-size: 30px;
  color: white;
  opacity: 0.5;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.x > a:hover {
  opacity: 1;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.leftC {
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
}
.rightC {
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
}
.logo {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.logo > img {
  width: auto;
  max-height: 150px;
}
.discography {
  overflow: auto;
  max-height: 200px;
  color: gray;
  border: solid;
}
.discography > h1 {
  font-size: 20px;
}
.bandinfoActive {
  z-index: 2;
  position: fixed;
  top: 15%;
  right: 45vw;
  left: 35vw;
  width: 35%;
  height: auto;
  background: black;
  opacity: 0.9;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  -webkit-transform: translateY(0vw);
  transform: translateY(0vw);
}
.bandinfoNotActive {
  z-index: 2;
  position: fixed;
  top: 30%;
  right: 45vw;
  left: 35vw;
  width: 35%;
  height: auto;
  background: black;
  opacity: 0.9;
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
  -webkit-transform: translateY(-150vh);
  transform: translateY(-150vh);
}
.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #ffffff;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.loader:after {
  background: #000000;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>