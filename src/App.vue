<script setup>
import Sidebar from './components/Sidebar.vue'
import BarChart from './components/BarChart.vue'
import { ref } from 'vue'

const make = ref(false)
const attribute = ref(false)
const cars = ref({data:[{"model": "Subaru_outback", "hp": 200}, {"model": "Subaru_brz", "hp": 250}, {"model": "Subaru_sti", "hp": 325}]})

</script>

<template>
  <header>
    <h1>Is it fast?</h1>
    <div class="choices">
      <button class="button" type="button" @click="make = !make">Make</button>
      <button class="button" type="button" @click="attribute = !attribute">Attribute</button>
    </div>
    <div v-if="make" class="sidebar" style="left:0;">
      <Sidebar />
    </div>
    <div v-if="attribute" class="sidebar" style="right:0;">
      <Sidebar />
    </div>
  </header>
  <body>
    <div>
        <BarChart :data="cars.data" />
    </div>
  </body>
</template>

<style>

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
}

button {
  background-color: white;
  border: 2px #00008B solid;
  color: #00008B;
  font-size: 24px;
  margin: 20px;
  text-align: center;
  width: 25%;
}

button:hover {
  background-color: #DAA520
}

.sidebar {
  width: 10%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

</style>
