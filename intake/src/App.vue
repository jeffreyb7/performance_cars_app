<script setup>
import AttrSidebar from './components/AttrSidebar.vue'
import MakeSidebar from './components/MakeSidebar.vue'
import BarChart from './components/BarChart.vue'
import { ref } from 'vue'
import axios from 'axios'


const explore = ref(false)
const showMakes = ref(false)
const makes = ref(['BMW', 'Mercedes', 'Nissan', 'Subaru'])
const cars = ref({model:["Subaru_outback", "Subaru_brz", "Subaru_sti", "Subaru_wrx"], attribute: [200, 250, 325, 300]})
const attributes = ref(['Horsepower', 'Price', 'MPG Low', 'MPG High', 'Curb Weight', 'Manual'])

function testAPI() {
  axios({method: 'get', url: 'http://localhost:8000/attributes'})
    .then(function (response) {
      console.log(response);
    });
};

</script>

<template>
  <header>
    <h1>Is it fast?</h1>
    <div v-if="!explore" class="choices">
      <button class="button" type="button" @click="explore = !explore">Explore</button>
      <button class="button" type="button" @click="testAPI()">Test</button>
    </div>
    <div v-if="explore" class="sidebar" style="right:0;">
      <AttrSidebar :attributes="attributes" @show-makes.once="showMakes=!showMakes"/>
    </div>
    <div v-if="showMakes" class="sidebar" style="left:0;">
      <MakeSidebar :makes="makes" />
    </div>
  </header>
  <div class="chart">
    <BarChart :data="cars" />
  </div>
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
  overflow: scroll;
  width: 80%;
}

</style>
