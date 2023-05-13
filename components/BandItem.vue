<template>
    <div class="flex flex-col items-center w-auto h-8 m-1 cursor-pointer border-solid border-green-900 border-2 border-opacity-50 hover:opacity-25"
        @click="sendDetails">
      <div class="text-lg text-white overflow-hidden">
        <h1>{{ band.name }}</h1>
      </div>
    </div>
  </template>
  
  <script setup>

const props = defineProps(['band'])
const emit = defineEmits(['pass-details'])

const sendDetails = () => {
        const x = props.band;
        emit('pass-details', x);
  };
  </script>
  
  <style scoped>
  </style>