<template>
  <div
    class="text-center format-card bg-white shadow-md rounded-tl-xl rounded-tr-xl p-6 border border-gray-200 cursor-pointer"
    @click="showDetails = !showDetails"
  >
    <!-- Exercise Name -->
    <h3 class="text-xl font-bold text-gray-800">
      {{ format.type }}: {{ format.rounds }} x {{ format.reps }}
    </h3>

    <!-- Collapsible Details -->
    <div v-show="showDetails" class="transition-all">
      <p class="text-gray-700">
        {{ format.rounds }} rounds of {{ format.type }}.
        {{ format.description }} with a break of {{ format.break }} seconds
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
