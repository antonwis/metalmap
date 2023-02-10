<template>
    <div>
      <p>Metal Map</p>
      <div>
        <ul>
          <li v-for="band in data">{{ band }}</li>
        </ul>
      </div>
    </div>
  </template>

  <script setup>
  import { getBands, getBandsInCountry, queryBands } from "../controllers/bandController"
//const { data } = await useFetch("/api/bands/genre/Industrial")
const { data } = await queryBands({country: "I"});

</script>