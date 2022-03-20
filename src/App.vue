<script setup>
import Sidebar from './components/Sidebar.vue'
import BarChart from './components/BarChart.vue'
import { ref } from 'vue'

const make = ref(false)
const attribute = ref(false)
const cars = ref({model:["Subaru_outback", "Subaru_brz", "Subaru_sti", "Subaru_wrx"], attribute: [200, 250, 325, 300]})
const screen_width = ref(window.innerWidth)

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
    <div class="chart">
        <BarChart :data="cars" :screen_width="screen_width" />
    </div>
  </body>
</template>

<style>

#app {
  margin: 0 auto;
  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
  margin: 0 auto;
  width: 100%;
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

.chart {
  margin: 0 auto;
  width: 80%;
}

</style>
