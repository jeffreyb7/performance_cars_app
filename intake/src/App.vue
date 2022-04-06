<script setup>
import AttrSidebar from './components/AttrSidebar.vue'
import MakeSidebar from './components/MakeSidebar.vue'
import BarChart from './components/BarChart.vue'
import { computed, ref } from 'vue'
import axios from 'axios'

// Scores for each model for selected attribute:
// {data: {models: [<str>, <str>,...], values: [<int>, <int>,...]}}
const rawScores = ref(null)
// Dictionary with list of attributes: {data: {Attributes: [<str>, <str>,...]}}
const rawAttributes = ref(null)
// List of all makes
const rawMakes = ref(null)
// Single dictionary entry of selected attribute: {data: attribute}
const selectedAttribute = ref(null)
// List of makes that user has chosen
const selectedMakes = ref([])

// Computed property for scores filtered by make
const selectedScores = computed(() => {
  //If no scores data exists yet, return null
  if (!rawScores.value) {
    return null
  }
  // If filter was reset to null, set selected scores to raw scores
  else if (selectedMakes.value.length == 0 && rawScores.value) {
    return rawScores.value
  }
  // Whenever filter changes, select active scores
  else {
    // Zip all models and values into dict
    let newScores = {}
    let scoresZipped = {}
    for (let x = 0; x < rawScores.value.data.models.length; x++) {
      scoresZipped[rawScores.value.data.models[x]] = rawScores.value.data.values[x]
    }
    for (let x = 0; x < selectedMakes.value.length; x++) {
      let testPattern = new RegExp(selectedMakes.value[x])
      for (let entry in scoresZipped) {
        let testResult = testPattern.test(entry)
        if (testResult) {
          newScores[entry] = scoresZipped[entry]
        }
      }
    }
    let newScoresSorted = {data: {models: [], values: []}}
    const allModels = Object.keys(newScores)
    const allValues = Object.values(newScores)
    while (allValues.length > 0) {
      let lowestValue = Math.min(...allValues)
      let testCrit = (element) => element == lowestValue
      let lowestIdx = allValues.findIndex(testCrit)
      let removedModel = allModels.splice(lowestIdx, 1)
      let removedValue = allValues.splice(lowestIdx, 1)
      newScoresSorted.data.models.push(removedModel[0])
      newScoresSorted.data.values.push(removedValue[0])
    }
    return newScoresSorted 
  }
})  


// API requests to get list of attributes and list of makes
function getAttributesMakes() {
  // Get attributes
  axios({method: 'get', url: 'http://localhost:8000/attributes'})
    .then(function (response) {
      rawAttributes.value = response.data
    })
  // Get makes
  axios({method: 'get', url: 'http://localhost:8000/Makes'})
    .then(function (response) {
      rawMakes.value = response.data
    })
}

// API request to get vehicle scores for selected attribute
function getRanks(attribute) {
  selectedAttribute.value = attribute
  axios({method: 'get', url: `http://localhost:8000/attributes/${attribute}`})
    .then(function (response) {
      rawScores.value = response.data
    })
}

// Update selected makes based on user selections
function filterMakes(make) {
  if (selectedMakes.value.length == 0) {
    selectedMakes.value.push(make)
  } 
  else {
    if (selectedMakes.value.includes(make)) {
      selectedMakes.value = selectedMakes.value.filter(entry => entry != make)
    }
    else { 
      selectedMakes.value.push(make)
    }
  }
} 

</script>

<template>
  <header>
    <h1>Find Performance, Tailored</h1>
    <div v-if="!rawAttributes" class="choices">
      <button class="button" type="button" @click="getAttributesMakes">Explore</button>
    </div>
    <div v-if="!selectedScores" class="stockImage">
      <img src="/landing.jpg"> 
    </div>
    <div v-if="rawAttributes" class="sidebar" style="right:0;">
      <AttrSidebar :attributes="rawAttributes" :selectedAttribute="selectedAttribute" @getRanks="getRanks" />
    </div>
    <div v-if="selectedScores" class="sidebar" style="left:0;">
      <MakeSidebar :makes="rawMakes" :selectedMakes="selectedMakes" @filterMakes="filterMakes" />
    </div>
  </header>
  <div v-if="selectedScores" class="chart">
    <BarChart :data="selectedScores.data" :selection="selectedAttribute"/>
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
  background-color: #DAA520;
}

.sidebar {
  background-color: #A9A9A9;
  width: 10%;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.stockImage {
  margin: 0 auto;
  width: 100%;
}

img {
  width: 100%;
}

.chart {
  margin: 0 auto;
  overflow: scroll;
  width: 80%;
}

</style>
