<script setup>
  import { computed } from 'vue'
  import * as d3 from 'd3'
    
  const props = defineProps(['data'])

  const width = 1264
  const height = 500
  const margin = {top: 20, right: 30, bottom: 55, left: 70 };

  const x_positions = computed(() => {
    const names = []
    for (let x in props.data) {
      names.push(props.data[x].model);
    };
    console.log(names);
    const x_scale = d3.scaleBand().domain(names).range([margin.left, width - margin.right]).padding(0.1);
    const bar_positions = new Object();
    names.forEach(name => bar_positions[name] = x_scale(name)); 
    return bar_positions
  })
       

</script>
<template>
  <svg id="cars_bar" viewbox="0,0,1264,500" :width="width" :height="height">
    <template v-for="(entry, index) in data">
      <rect class="bar" :x="x_positions[entry.model]" y="100" width="100" :height="entry.hp"></rect>
    </template>
  </svg>
  <p>{{ x_positions }}</p>
</template>
