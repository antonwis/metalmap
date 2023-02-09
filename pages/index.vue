<template>
    <div>
      <p>Metal Map</p>
      <div>{{ data }}</div>
    </div>
  </template>

  <script setup>
const { data } = await useFetch('/api/bands');

</script>