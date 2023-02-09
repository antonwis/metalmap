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
const { data } = await useFetch("/api/bands");

</script>