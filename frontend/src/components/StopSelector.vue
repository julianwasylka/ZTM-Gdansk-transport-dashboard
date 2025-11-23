<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  stops: any[]
}>();

const emit = defineEmits(['add']);

const selectedStopId = ref<number | null>(null);

const handleAdd = () => {
  if (selectedStopId.value) {
    emit('add', selectedStopId.value); 
    selectedStopId.value = null;     
  }
};
</script>

<template>
  <div class="mb-8 bg-white p-4 rounded shadow flex gap-4">
    <select v-model="selectedStopId" class="border p-2 rounded flex-grow">
      <option :value="null">-- Wybierz przystanek --</option>
      <option v-for="stop in stops" :key="stop.stopId" :value="stop.stopId">
        {{ stop.stopName }} ({{ stop.stopId }})
      </option>
    </select>
    <button @click="handleAdd" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
      Dodaj
    </button>
  </div>
</template>