<template>
  <div class="mx-auto p-1 lg:p-6 bg-white rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
      Your Workout
    </h2>
    <p class="mb-4 text-gray-700 text-center">
      Click on a exercise to see more information.
    </p>

    <div class="p-1 lg:p-6" v-if="generatedWorkout">
      <FormatCard :format="generatedWorkout.formats" />
      <ExerciseCard
        v-for="exercise in generatedWorkout.exercises"
        :key="exercise.name"
        :exercise="exercise"
      />
    </div>

    <!-- <div class="p-1 lg:p-6">
      <FormatCard :format="formats[1]" />
      <ExerciseCard :exercise="exercises[0]" />
      <FormatCard :format="formats[0]" />
      <ExerciseCard :exercise="exercises[2]" />
    </div> -->

    <div
      v-if="decodedConfig"
      class="p-4 bg-gray-50 rounded-lg border border-gray-200 break-words"
    >
      <h4 class="font-semibold text-gray-700 mb-2">Workout Configuration</h4>
      <pre class="text-sm text-gray-800">{{ decodedConfig }}</pre>
    </div>

    <div
      v-else
      class="p-4 bg-red-50 rounded-lg border border-red-200 text-red-700 text-center"
    >
      Could not show workout
    </div>
  </div>
</template>

<script setup>
import ExerciseCard from "./ExerciseCard.vue";
import { Workout } from "../workout.js";
import { useRoute } from "vue-router";
import FormatCard from "./FormatCard.vue";

const route = useRoute();
// Get Route params
const encodedConfig = route.query.workoutConfig;
let decodedConfig = {};

if (encodedConfig) {
  // Decode and parse JSON
  const jsonString = decodeURIComponent(encodedConfig);
  decodedConfig = JSON.parse(jsonString);
  console.log(decodedConfig);
}

const workout = new Workout(decodedConfig);

const generatedWorkout = workout.workoutSelector();
console.log(generatedWorkout);
</script>

<style scoped>
pre {
  white-space: pre-wrap; /* Wrap long JSON strings */
  word-break: break-word;
}
</style>
