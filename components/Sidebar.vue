<template>
    <div :class="active ? 'active' : 'inactive'">
      <div class="topcontainer">
    <div class="flex">
      <div class="w-3/4 pt-2 pl-2 pb-2">
        <h1 class=" text-4xl text-white text-left">{{ country }}</h1>
        <p class="text-lg text-white">Population: {{ population }}</p>
        <p class="text-lg text-white">Number of bands: {{ bandlist.length }}</p>
      </div>
      <div class="w-1/4 text-end pr-4 pt-2 text-4xl">
        <button @click="close" class="italic">X</button>
      </div>
      </div>
    <div class="search pr-5 py-2 border-dotted border-t-2 border-gray-700">
        <input
          v-model="searchStr"
          class="input m-1 text-left pl-1 border-solid border-2 border-gray-700 bg-gray-700 text-white"
          type="text"
          placeholder="Search for bands"
          @input="delaySearch"
        />
    </div>
  </div>
  <div class="listcontainer">
    <div v-bind="containerProps" class="h-[750px]" id="bandlist" v-if="!state.haettu">
      <div v-bind="wrapperProps">
      <BandItem
      v-for="{index, data} in list"
        :key="index"
        :band="data"
        @pass-details="openDetails"
      />
    </div>
  </div>
  <div v-bind="filterContainerProps" class="h-[750px]" id="filteredlist" v-if="state.haettu">
      <div v-bind="filterWrapperProps">
      <BandItem
      v-for="{index, data} in filteredlist"
        :key="index"
        :band="data"
        @pass-details="openDetails"
      />
    </div>
  </div>
  </div>
    </div>
</template>

<script setup>
import { getBandsInCountry, queryBands } from '../controllers/bandController';

const props = defineProps(['active', 'population', 'country'])
const emit = defineEmits(['side-active', 'open-details'])

const bandlist = ref([])
const filteredBandList = ref([])
const selectedCountry = ref(props.country)
const searchStr = ref("");


const { list, containerProps, wrapperProps } = useVirtualList(bandlist, {
  itemHeight: 32
});
const { list: filteredlist, containerProps: filterContainerProps, wrapperProps: filterWrapperProps } = useVirtualList(filteredBandList, {
  itemHeight: 32
});
watch(
  () => props.country, async (country) => {
    try {
      searchStr.value = "";
      selectedCountry.value = country;
    const bands = await getBandsInCountry(selectedCountry.value);
      bandlist.value = bands.value;
      state.haettu = false;
      document.getElementById("bandlist").scrollTo(0,0);
  
    }catch(e) {
      console.log(e)
    }
  }
  );
  

const state = reactive({
  haettu: false
});

const search = async () => {
      state.haettu = searchStr.value.length > 0 ? true : false;
      const filters = {country: selectedCountry.value, name: searchStr.value};
      const { data } = await queryBands(filters);
      filteredBandList.value = data.value;
      document.getElementById("filteredlist").scrollTo(0,0);
    }



const close = () => {
  emit("side-active");
};
const openDetails = (x) => {
  emit("open-details", x);
}

const debounce = (fn, delay) => {
  let timeout
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
const delaySearch = debounce(search, 500);
</script>

<style scoped>
.topcontainer {
  min-height: 176px;

}
.listcontainer {
  max-height: 750px;

}

.active {
    position: fixed;
  height: 100%;
  width: 350px;
  opacity: 0.8;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: black;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-transform: translateX(0vw);
  transform: translateX(0vw);
  overflow: hidden;
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
  overflow: hidden;
}
.head {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  text-align: center;
  color: white;
  opacity: 0.9;
}
button {
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
.search {
  width: 100%;
}
input {
  width: 100%;
  height: 32px;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #0f0f0f;
  
}

::-webkit-scrollbar-thumb {
  background: rgb(55 65 81);
  height: 30px;
  border-radius:400em;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(20 83 45);
}

</style>