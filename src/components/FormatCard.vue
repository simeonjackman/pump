<template>
  <div
    class="text-center format-card bg-white shadow-md rounded-bl-xl rounded-br-xl p-6 border border-gray-200 cursor-pointer"
    @click="showDetails = !showDetails"
  >
    <!-- Exercise Name -->
    <div class="xl:flex justify-between">
      <p class="text-xl font-bold text-gray-800">
        {{ format.type }}: {{ format.rounds }} x {{ format.reps }}
      </p>
      <span> {{ format.break }}s break between sets </span>
    </div>

    <!-- Collapsible Details -->
    <div v-show="showDetails" class="transition-all">
      <p class="text-gray-700">
        {{ format.rounds }} rounds of {{ format.type }}.
        {{ format.description }}
        between rounds.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  format: {
    type: Object,
    required: true,
  },
});

// Track whether details are shown
const showDetails = ref(false);
</script>
