<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1></h1>

<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <div class="text-xl font-large text-black">{{ msg }}</div>
    <p class="text-gray-500">Hi there!</p>
</div>
</template>