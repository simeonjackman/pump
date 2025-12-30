<template>
  <div class="mx-auto p-1 lg:p-6 bg-white rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
      All Exercises
    </h2>
    <div class="p-1 lg:p-6" v-for="exercise in exercisesData">
      <ExerciseCard :exercise="exercise" :withDetails="true" />
    </div>
  </div>
</template>

<script setup>
import ExerciseCard from "./ExerciseCard.vue";
import exercisesData from "../assets/exercises.json";
</script>

<style scoped>
pre {
  white-space: pre-wrap; /* Wrap long JSON strings */
  word-break: break-word;
}
</style>
