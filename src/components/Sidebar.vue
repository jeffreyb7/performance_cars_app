<script setup>
import { ref } from 'vue'
const sidebarItems = ref(['Subaru', 'Nissan'])
</script>

<template>
  <button v-for="item in sidebarItems">{{ item }}</button>
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
  background-color: #DAA520
}

</style>
