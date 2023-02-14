<template>
    <div class="containerlol" @click="sendDetails">
      <div class="textcontainer">
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
  .containerlol {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    width: auto;
    height: auto; /* Tätä voi muokkailla sitte mielensä mukaan vaikka "10 tai 15vh" näyttää auto:llakin ihan jees*/
    margin-top: 1vh;
    margin-left: 1vw;
    margin-right: 1vw;
    border: solid;
    border-radius: 2px;
    cursor: pointer;
    opacity: 0.5;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    text-overflow: ellipsis;
  }
  .containerlol:hover {
    opacity: 1;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .imagecontainer {
    display: flex;
    height: 100%;
    overflow: hidden;
  }
  .textcontainer {
    font-size: 20px;
    color: white;
  }
  </style>