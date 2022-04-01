<script setup>

const props = defineProps(['makes', 'selectedMakes'])
const emit = defineEmits(['filterMakes'])

</script>

<template>
  <button v-for="make in props.makes.data.Makes" :class="[props.selectedMakes.some((element) => element == make) ? 'makeSelected' : '']" @click="$emit('filterMakes', make)">{{ make }}</button>
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

button.makeSelected {
  background-color: #DAA520;
}

button:hover.makeSelected {
  background-color: white;
}

</style>
