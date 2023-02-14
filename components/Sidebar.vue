<template>
    <div :class="active ? 'active' : 'inactive'">
    <div class="head">
        <a @click="close"><i>X</i></a>
        <h2>{{ country }}</h2>
        <p>Population: {{ population }}</p>
        <p>Number of bands: {{ bandlist.length }}</p>
      </div>
      <div class="block">
    </div>
    <div class="search">
      <p class="control has-icons-left">
        <input
          v-model="searchStr"
          class="input"
          type="text"
          placeholder="Search"
          @input="delaySearch"
        />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
    <div class="banditems" v-if="!state.haettu">
      <BandItem
        v-for="band in bandlist"
        :key="band.id"
        :band="band"
        @pass-details="openDetails"
      />
    </div>
    <div class="banditems" v-if="state.haettu">
      <BandItem
        v-for="band in filteredBandList"
        :key="band.id"
        :band="band"
        @pass-details="openDetails"
      />
    </div>

    </div>
</template>

<script setup>
import { getBandsInCountry, queryBands } from '../controllers/bandController';

const props = defineProps(['active', 'population', 'country'])
const emit = defineEmits(['side-active', 'open-details'])

//const { data } = await getBandsInCountry(props.country)
const bandlist = ref("")
const filteredBandList = ref("")
const selectedCountry = ref(props.country)
const searchStr = ref("");

watch(
  () => props.country, async (country) => {
    console.log("country changed" + country);
    searchStr.value = "";
    selectedCountry.value = country;
    const bands = await getBandsInCountry(selectedCountry.value);
    //console.log(bands.value)
    bandlist.value = bands.value;
    state.haettu = false;
  }
)

const state = reactive({
  haettu: false
});

const search = async () => {
      state.haettu = searchStr.value.length > 0 ? true : false;
      const filters = {country: selectedCountry.value, name: searchStr.value};
      const { data } = await queryBands(filters);
      console.log(data.value)
      filteredBandList.value = data.value;
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
.head {
  display: flex;
  flex-direction: column;
  font-size: 30px;
  text-align: center;
  color: white;
  opacity: 0.9;
}
.head a {
  font-size: 35px;
  text-align: right;
  margin-right: 1vw;
  color: white;
  opacity: 0.5;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.head a:hover {
  opacity: 1;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.block {
  text-align: center;
}
.search {
  margin-top: 2vh;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-bottom: 2vh;
}
</style>