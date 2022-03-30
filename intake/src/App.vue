<script setup>
import AttrSidebar from './components/AttrSidebar.vue'
import MakeSidebar from './components/MakeSidebar.vue'
import BarChart from './components/BarChart.vue'
import { ref, watch } from 'vue'
import axios from 'axios'

const ranks = ref(null)
const inactiveRanks = ref(null)
const attributes = ref(null)
const selectedAttribute = ref(null)
const selectedMakes = ref(null)
const makes = ref(null)

function getAttributesMakes() {
  axios({method: 'get', url: 'http://localhost:8000/attributes'})
    .then(function (response) {
      attributes.value = response.data
    })
  axios({method: 'get', url: 'http://localhost:8000/Makes'})
    .then(function (response) {
      makes.value = response.data
    })
}

function getRanks(attribute) {
  selectedAttribute.value = {data: attribute}
  axios({method: 'get', url: `http://localhost:8000/attributes/${attribute}`})
    .then(function (response) {
      ranks.value = response.data
    })
}

function filterMakes(make) {
  if (!selectedMakes.value) {
    selectedMakes.value = []
    let newFilter = []
    newFilter.push(make)
    selectedMakes.value = newFilter
  } 
  else {
    if (selectedMakes.value.includes(make)) {
      selectedMakes.value = selectedMakes.value.filter(entry => entry != make)
      if (selectedMakes.value.length == 0) {selectedMakes.value = null}
    }
    else { 
      let newFilter = []
      newFilter.push(selectedMakes.value[0])
      newFilter.push(make)
      selectedMakes.value = newFilter
    }
  }
} 

// Modify ranks dataset and inactive ranks whenever make filter changes
watch(selectedMakes, (newMakeFilter) => {
  // Zip active models and values into dict
  let ranksZipped = {}
  for (let x = 0; x < ranks.value.data.models.length; x++) {
    ranksZipped[ranks.value.data.models[x]] = ranks.value.data.values[x]
  }
  // If filter was reset to null, transfer inactive values to active
  if (!newMakeFilter && inactiveRanks.value) {
    for (let entry in inactiveRanks.value) {
      ranksZipped[entry] = inactiveRanks.value[entry]
    }
    // Sort in ascending order by value
    let sortedRanks = sortRanks(ranksZipped)
    ranks.value = sortedRanks
  }
  // Whenever filter is changed, place all entries in inactive dict, then select filtered into active
  else {
    if (!inactiveRanks.value) { 
      inactiveRanks.value = {}
    }
    for (let entry in ranksZipped) {
      inactiveRanks.value[entry] = ranksZipped[entry]
    }
    ranksZipped = {}
    // Need to change logic here. When more than one filter, you are taking out models that apply to the second filter
    for (let x = 0; x < newMakeFilter.length; x++) {
      let testPattern = new RegExp(newMakeFilter[x])
      for (let entry in inactiveRanks.value) {
        let testResult = testPattern.test(entry)
        if (testResult) {
          ranksZipped[entry] = inactiveRanks.value[entry]
          delete inactiveRanks.value[entry]
        }
      }
    }
    let sortedFilter = sortRanks(ranksZipped)
    ranks.value = sortedFilter
  }
})

// Input dictionary to produce sorted ranks object
function sortRanks(ranks) {
  const sortedRanks = {data: {models:[], values:[]}}
  const allModels = Object.keys(ranks)
  const allValues = Object.values(ranks)
  while (allValues.length > 0) {
    let lowestValue = Math.min(...allValues)
    let testCrit = (element) => element == lowestValue
    let lowestIdx = allValues.findIndex(testCrit)
    let removedModel = allModels.splice(lowestIdx, 1)
    let removedValue = allValues.splice(lowestIdx, 1)
    sortedRanks.data.models.push(removedModel[0])
    sortedRanks.data.values.push(removedValue[0])
  }
  return sortedRanks
}

</script>

<template>
  <header>
    <h1>Find Performance, Tailored</h1>
    <div v-if="!attributes" class="choices">
      <button class="button" type="button" @click="getAttributesMakes">Explore</button>
    </div>
    <div v-if="attributes" class="sidebar" style="right:0;">
      <AttrSidebar :attributes="attributes" @getRanks="getRanks" />
    </div>
    <div v-if="ranks" class="sidebar" style="left:0;">
      <MakeSidebar :makes="makes" @filterMakes="filterMakes" />
    </div>
  </header>
  <div v-if="ranks" class="chart">
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
