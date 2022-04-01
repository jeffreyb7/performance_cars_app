<script setup>
import { computed } from 'vue'
import * as d3 from 'd3'
  
const props = defineProps(['data', 'selection'])
const height = 500
const margin = {top: 20, right: 30, bottom: 55, left: 70 };

const width = computed(() => {
  return props.data.models.length * 200
});

// Make data into json where key is the model and value is the attribute
const merged_data = computed(() => {
  const data_obj = {};
  for (let x = 0; x < props.data.models.length; x++) {
    data_obj[props.data.models[x]] = props.data.values[x]
  };
  return data_obj
});

// Compute the x-position of each bar for the bar chart
// Output is json of model: x-value
// Also includes additional bandwidth key used for bar width
const x_positions = computed(() => {
  const x_scale = d3.scaleBand().domain(props.data.models).range([margin.left, width.value - margin.right]).padding(0.4);
  const bar_x = {};
  props.data.models.forEach(model => bar_x[model] = x_scale(model));
  bar_x["bandwidth"] = x_scale.bandwidth(); 
  return bar_x;
})
     
// Compute the y-position of each bar for the bar chart
// Output is json of attribute: y-value  
const y_positions = computed(() => {
  const y_scale = d3.scaleLinear().domain([0, d3.max(props.data.values)]).range([height - margin.bottom, margin.top]);
  const bar_y = {};
  bar_y["pos"] = {};
  bar_y["height"] = {};
  props.data.values.forEach(value => bar_y.pos[value] = y_scale(value));
  props.data.values.forEach(value => bar_y.height[value] = height - margin.bottom - y_scale(value));
  return bar_y;
})

// Custom directive to make the y-axis g-elements
const vYaxis = {
  mounted(el) {
    d3.select(el).call(d3.axisLeft(d3.scaleLinear().domain([0, d3.max(props.data.values)]).range([height - margin.bottom, margin.top])))
  },
  updated(el) {
    d3.select(el).call(d3.axisLeft(d3.scaleLinear().domain([0, d3.max(props.data.values)]).range([height - margin.bottom, margin.top])))
  }
}

// Custom directive to make the x-axis g-elements
const vXaxis = {
  mounted(el) {
    d3.select(el).call(d3.axisBottom(d3.scaleBand().domain(props.data.models).range([margin.left, width.value - margin.right]).padding(0.4)))
  },
  updated(el) {
    d3.select(el).call(d3.axisBottom(d3.scaleBand().domain(props.data.models).range([margin.left, width.value - margin.right]).padding(0.4)))
  }
}

</script>
<template>
  <h2>{{ selection }}</h2>
  <svg id="cars_bar" :width="width" :height="height">
    <template v-for="(value, key, index) in merged_data">
      <rect class="bar" :x="x_positions[key]" :y="y_positions.pos[value]" :width="x_positions.bandwidth" :height="y_positions.height[value]"></rect>
        <text class="bar_text" :x="x_positions[key] + 2" :y="y_positions.pos[value] + 20">{{ value }}</text>
    </template>
    <g v-Xaxis :transform="`translate(0,${height - margin.bottom})`"></g>
    <g v-Yaxis :transform="`translate(${margin.left},0)`"></g>
  </svg>
</template>

<style>

h2 {
  text-align: center;
}

.bar {
  fill: #00008B;
}

.bar:hover {
  fill: #6495ED;
}

.bar_text {
  visibility: hidden;
  font-weight: bold;
  font-size: 25px;
 }

.bar:hover + .bar_text {
  visibility: visible;
}


</style>
