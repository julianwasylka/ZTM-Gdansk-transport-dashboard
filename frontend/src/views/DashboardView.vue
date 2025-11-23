<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useStops } from '@/composables/useStops';
import { VueGoodTable } from 'vue-good-table-next';
import StopSelector from '@/components/StopSelector.vue';

const authStore = useAuthStore();
const { dashboardData, stops, fetchDashboard, fetchAllStops, addStop, removeStop, loading } = useStops();

const columns = [
  { label: 'Linia', field: 'routeId' },
  { label: 'Kierunek', field: 'headsign' },
  { label: 'Czas', field: 'estimatedTime' },
  { label: 'Opóźnienie (s)', field: 'delayInSeconds', html: true }
];

onMounted(async () => {
  console.log("dziala");
  await fetchAllStops();
  await fetchDashboard();
});

const handleAdd = async (stopId: number) => {
  await addStop(stopId);
};
</script>

<template>
  <div class="min-h-screen p-6">
    <div class="flex justify-between items-center mb-8 bg-white p-4 rounded shadow">
      <h1 class="text-xl font-bold">Witaj, {{ authStore.userLogin }}!</h1>
      <button @click="authStore.logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Wyloguj</button>
    </div>

    <StopSelector :stops="stops" @add="handleAdd" />

    <div v-if="loading" class="text-center text-gray-500">Ładowanie danych...</div>
    
    <div v-else class="grid gap-8">
      <div v-for="item in dashboardData" :key="item.stopId" class="bg-white p-4 rounded shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold">{{ item.stopName }}</h2>
          <button @click="removeStop(item.stopId)" class="text-red-500 text-sm hover:underline">Usuń przystanek</button>
        </div>

        <vue-good-table 
          :columns="columns" 
          :rows="item.delays" 
          styleClass="vgt-table striped"
          :pagination-options="{ enabled: true, perPage: 5 }"
        >
          <template #table-row="props">
            <span v-if="props.column.field == 'delayInSeconds'" v-color-delay="props.row.delayInSeconds">
              {{ props.row.delayInSeconds }}s
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>