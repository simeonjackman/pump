<template>
  <div class="mx-auto p-6 bg-white rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Workout from URL</h2>

    <div class="p-6">
        <ExerciseCard
        v-for="exercise in exercises"
        :key="exercise.name"
        :exercise="exercise"
        />
  </div>

    <div v-if="decodedConfig" class="p-4 bg-gray-50 rounded-lg border border-gray-200 break-words">
      <h4 class="font-semibold text-gray-700 mb-2">Workout Configuration</h4>
      <pre class="text-sm text-gray-800">{{ decodedConfig }}</pre>
    </div>

    <div v-else class="p-4 bg-red-50 rounded-lg border border-red-200 text-red-700 text-center">
      Could not show workout
    </div>
  </div>
</template>

<script setup>
import ExerciseCard from './ExerciseCard.vue'
import json from "../assets/exercises.json";
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const exercises = json.exercises;
console.log(exercises);


const route = useRoute()
const decodedConfig = ref(null);

onMounted(() => {
  try {
    // Get Route params
    const encodedConfig = route.query.workoutConfig;

    if (encodedConfig) {
      // Decode and parse JSON
      const jsonString = decodeURIComponent(encodedConfig);
      decodedConfig.value = JSON.parse(jsonString);
    }
  } catch (e) {
    decodedConfig.value = null;
  }

});


</script>

<style scoped>
pre {
  white-space: pre-wrap; /* Wrap long JSON strings */
  word-break: break-word;
}
</style>