<template>
    <div :class="activeModal ? 'bandinfoActive' : 'bandinfoNotActive'" class="flex flex-col border-solid border-gray-700 border-2">
    <div class="flex justify-between p-5 text-3xl text-gray-50 border-b-gray-700 border-solid border-b-2">
      <h1 v-if="band">{{ band.name }}</h1>
      <button @click="close" class="italic">X</button>
    </div>
    <div class="flex text-gray-50 m-1 overflow-auto" v-if="band">
      <div class="w-1/2 flex flex-col pl-1">
        <div class="text-base py-1">
      <h1 class="text-gray-400">Genre: <span class="text-white">{{ band.genre }}</span></h1>
      <h1 class="text-gray-400">Status: <span class="text-white">{{ band.status }}</span></h1>
      <h1 class="text-gray-400">Country: <span class="text-white">{{ band.country }}</span></h1>
      <h1 class="text-gray-400">Location: <span class="text-white">{{ location }}</span></h1>
      <h1 class="text-gray-400">Formed: <span class="text-white">{{ formed }}</span></h1>
      <h1 class="text-gray-400">Years active: <span class="text-white">{{ yearsActive }}</span></h1>
      <h1 class="text-gray-400">View on:
        <a :href="band.link" target="_blank" class="text-red-500">Metal-archives</a></h1>
      </div>
      <div class="pt-1">
        <h1 class="text-lg text-gray-400">Discography:</h1>
          <table class="text-left text-sm">
            <thead class="">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody class="">
              <tr v-for="album in albums" :key="album.index">
                <td>
                  <a :href="album.link" target="_blank" class="text-red-500">{{ album.name }}</a>
                </td>
                <td>{{ album.type }}</td>
                <td>{{ album.year }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div class="w-1/2 flex flex-col items-center overflow-auto border-dotted border-l-2 border-gray-700">
      <div v-if="loading" class="loader">Loading...</div>
    <img v-if="logo !== null" id="logo" class="p-1" :src="logo" alt="Band logo" @load="toggleLoading">
      <img v-if="photo !== null" id="photo" class="p-1" :src="photo" alt="Band photo" @load="toggleLoading">
    </div>
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

const resetValues = () => {
  logo.value = null;
  photo.value = null;
  formed.value = null;
  yearsActive.value = null;
  location.value = null;
  albums.value = null;
}

const fetchData = async () => {
  const link = props.band.link;
  resetValues();
  const info = await getBandInfo(link);
  if (info) {
  info.logo !== undefined ? (logo.value = info.logo) : (logo.value = "/img/no-image-1.png");
  info.photo !== undefined ? (photo.value = info.photo) : (photo.value = "/img/no-image-1.png");
  info.formYear  !== undefined ? (formed.value = info.formYear) : (formed.value = null);
  info.yearsActive !== undefined ? (yearsActive.value = info.yearsActive) : (yearsActive.value = null);
  info.location !== undefined ? (location.value = info.location) : (location.value = null);
  info.albums !== undefined ? (albums.value = info.albums) : (albums.value = null);
  }
}

  const toggleLoading = () => {
    loading.value = false;
  }

  watch(() => (props.activeModal, props.band),
    value => {
    if(value) {
      fetchData();
    }
    loading.value = true;
   
  });

const close = () => {
      emit("modal-active");
    };


</script>

<style scoped>

button {
  position: fixed;
  margin-right: 1vw;
  right: 0;
  align-content: center;
  font-size: 40px;
  color: white;
  opacity: 0.5;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
button:hover {
  opacity: 1;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

img {
  width: auto;
}
img#logo {
  max-height: 150px;
}
img#photo {
  max-height: 300px;
}
table {
  display: flex;
  flex-flow: column;
  height: 225px;
  width: 100%;
}
table thead {
  flex: 0 0 auto;
  width: calc(100% - 0.9em);
}
table tbody {
  flex: 1 1 auto;
  display: block;
  overflow-y: auto;
}
table tbody tr {
  width: 100%;
}
table thead, table tbody tr {
  display: table;
  table-layout: fixed;
}

.bandinfoActive {
  z-index: 2;
  position: fixed;
  top: 15%;
  right: 45vw;
  left: 35vw;
  width: 50%;
  height: 60%;
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
  width: 0;
  height: 0;
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
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #000;
  border-radius: 400em;
}

::-webkit-scrollbar-thumb {
  background: rgb(55 65 81);
  height: 15px;
  border-radius: 400em;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(20 83 45);
}

</style>