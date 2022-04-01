<script setup>

const props = defineProps(['attributes', 'selectedAttribute'])
const emit = defineEmits(['getRanks'])
</script>

<template>
  <button v-for="attr in props.attributes.data.Attributes" :class="[attr == props.selectedAttribute ? 'attrSelected' : '']" @click="$emit('getRanks', attr)">{{ attr }}</button>
</template>

<style scoped>

button {
  background-color: white;
  border: 2px #00008B solid;
  color: #00008B;
  display: block;
  font-size: 12px;
  margin: auto;
  text-align: center;
  width: 100%;
}

button:hover {
  background-color: #DAA520;
}

button.attrSelected {
  background-color: #DAA520;
} 

button:hover.attrSelected {
  background-color: white;
}


</style>
