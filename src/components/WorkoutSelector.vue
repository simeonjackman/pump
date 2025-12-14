<template>
  <div class="workout-selector max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Customize Your Workout</h2>

    <!-- Cardio vs Strength -->
    <div class="mb-6">
      <label class="block text-gray-700 font-semibold mb-2">
        Cardio vs Strength: <span class="font-bold">{{ cardioStrength }}</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        v-model="cardioStrength"
        class="w-full h-2 bg-gray-200 rounded-lg accent-green-700"
      />
      <div class="flex justify-between text-sm text-gray-500 mt-1">
        <span>Cardio</span>
        <span>Strength</span>
      </div>
    </div>

    <!-- Difficulty -->
    <div class="mb-6">
      <label class="block text-gray-700 font-semibold mb-2">
        Difficulty: <span class="font-bold">{{ difficulty }}</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        v-model="difficulty"
        class="w-full h-2 bg-gray-200 rounded-lg accent-green-700"
      />
    </div>

    <!-- Length -->
    <div class="mb-6">
      <label class="block text-gray-700 font-semibold mb-2">
        Length: <span class="font-bold">{{ length }} minutes</span>
      </label>
      <input
        type="range"
        min="20"
        max="120"
        v-model="length"
        class="w-full h-2 bg-gray-200 rounded-lg accent-green-700"
      />
    </div>

    <!-- Muscle Groups -->
    <div class="mb-6">
      <h3 class="text-gray-700 font-semibold mb-3 text-lg">
        Muscle Group Usage (Total: 300)
      </h3>
      <div v-for="(value, muscle) in muscles" :key="muscle" class="mb-4">
        <label class="block mb-1 capitalize text-gray-600 font-medium">
          {{ muscle }}: <span class="font-bold">{{ value }}</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          :value="value"
          @input="updateMuscle(muscle, $event.target.value)"
          class="w-full h-2 bg-gray-200 rounded-lg accent-green-700"
        />
      </div>
    </div>

    <button @click="generateEncodedURL" type="button" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer w-full bg-green-500">Build Workout</button>

    <!-- Output JSON -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 class="font-semibold text-gray-700 mb-2">Selected Configuration</h4>
      <pre class="text-sm text-gray-800">{{ workoutConfig }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const cardioStrength = ref(50); // 0 = cardio, 100 = strength
const difficulty = ref(50);
const length = ref(50);

// Initialize muscle group percentages (sum = 300)
const muscles = reactive({
  arms: 50,
  back: 50,
  abs: 50,
  legs: 50,
  chest: 50,
  glutes: 50
});

// Function to update a muscle while keeping the total 300
function updateMuscle(changedMuscle, newValue) {
  newValue = Math.round(Number(newValue));
  const oldValue = muscles[changedMuscle];
  const diff = newValue - oldValue;

  const otherMuscles = Object.keys(muscles).filter(m => m !== changedMuscle);
  let sumOthers = otherMuscles.reduce((sum, m) => sum + muscles[m], 0);

  if (sumOthers === 0) {
    // All others are zero, split remaining evenly
    const evenValue = Math.floor((300 - newValue) / otherMuscles.length);
    otherMuscles.forEach(m => muscles[m] = evenValue);
    muscles[changedMuscle] = newValue;
    return;
  }

  // Scale other muscles proportionally
  otherMuscles.forEach(m => {
    muscles[m] = Math.round(Math.max(0, muscles[m] - (muscles[m] / sumOthers) * diff));
  });

  // Correct rounding errors to ensure total = 300
  let total = Object.values(muscles).reduce((sum, val) => sum + val, 0);
  const correction = 300 - total;
  muscles[changedMuscle] += correction;
}

const workoutConfig = computed(() => ({
  cardio_vs_strength: cardioStrength.value,
  difficulty: difficulty.value,
  length: length.value,
  muscle_usage: { ...muscles },
}));

// Encoded JSON string
const encodedJSON = ref("");

// Function to encode JSON
function generateEncodedURL() {
  const jsonString = JSON.stringify(workoutConfig.value);
  const encoded = encodeURIComponent(jsonString);
  window.open(`/workout?config=${encoded}`, "_blank");
}
</script>

<style scoped>
input[type="range"] {
  cursor: pointer;
}
</style>
