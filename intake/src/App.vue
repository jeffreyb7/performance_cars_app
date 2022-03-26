<script setup>
import AttrSidebar from './components/AttrSidebar.vue'
import MakeSidebar from './components/MakeSidebar.vue'
import BarChart from './components/BarChart.vue'
import { ref } from 'vue'
import axios from 'axios'

const ranks = ref({data: null})
const attributes = ref({data: null})
const selectedAttribute = ref({data: null})
const makes = ref({data: null})

function getAttributes() {
  axios({method: 'get', url: 'http://localhost:8000/attributes'})
    .then(function (response) {
      attributes.value = response.data
    })
}

function getRanksMakes(attribute) {
  selectedAttribute.value = {data: attribute}
  axios({method: 'get', url: 'http://localhost:8000/Makes'})
    .then(function (response) {
      makes.value = response.data
      console.log(makes.value)
    })
  axios({method: 'get', url: `http://localhost:8000/attributes/${attribute}`})
    .then(function (response) {
      ranks.value = response.data
      console.log(ranks.value)
    })
}

</script>

<template>
  <header>
    <h1>Find Performance, Tailored</h1>
    <div v-if="attributes.data == null" class="choices">
      <button class="button" type="button" @click="getAttributes">Explore</button>
    </div>
    <div v-if="attributes.data != null" class="sidebar" style="right:0;">
      <AttrSidebar :attributes="attributes" @getRanksMakes="getRanksMakes" />
    </div>
    <div v-if="makes.data != null" class="sidebar" style="left:0;">
      <MakeSidebar :makes="makes" />
    </div>
  </header>
  <div v-if="ranks.data != null" class="chart">
    <BarChart :data="ranks.data" :selection="selectedAttribute.data"/>
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
