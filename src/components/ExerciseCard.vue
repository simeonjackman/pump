<template>
  <div
    class="exercise-card bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200 cursor-pointer"
    @click="showDetails = !showDetails"
  >
    <!-- Exercise Name -->
    <h3 class="text-xl font-bold mb-2 text-gray-800">{{ exercise.name }}</h3>
    <p class="mb-4 text-gray-700">{{ exercise.description }}</p>

    <!-- Collapsible Details -->
    <div v-show="showDetails" class="transition-all">
      <!-- Cardio vs Strength -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">
          Cardio vs Strength: {{ exercise.cardio_vs_strength }}
        </label>
        <div class="w-full bg-gray-200 rounded-full h-3 mb-1">
          <div
            class="bg-indigo-600 h-3 rounded-full"
            :style="{ width: exercise.cardio_vs_strength + '%' }"
          ></div>
        </div>
        <div class="flex justify-between text-sm text-gray-500">
          <span>Cardio</span>
          <span>Strength</span>
        </div>
      </div>

      <!-- Difficulty -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1"
          >Difficulty: {{ exercise.difficulty }}</label
        >
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div
            class="bg-green-500 h-3 rounded-full"
            :style="{ width: exercise.difficulty + '%' }"
          ></div>
        </div>
      </div>

      <!-- Muscle Group Usage -->
      <div>
        <label class="block text-gray-700 font-medium mb-2">Muscle Usage</label>
        <div
          v-for="(value, muscle) in exercise.muscle_usage"
          :key="muscle"
          class="mb-2"
        >
          <div
            class="flex justify-between mb-1 text-sm text-gray-600 capitalize"
          >
            <span>{{ muscle }}</span>
            <span>{{ value }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div
              class="bg-pink-500 h-3 rounded-full"
              :style="{ width: value + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  exercise: {
    type: Object,
    required: true,
  },
});

// Track whether details are shown
const showDetails = ref(false);
</script>

<style scoped>
div > div.bg-indigo-600,
div > div.bg-green-500,
div > div.bg-pink-500 {
  transition: width 0.5s ease;
}
</style>
