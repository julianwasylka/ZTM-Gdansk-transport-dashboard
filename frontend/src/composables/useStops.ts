import { ref } from 'vue';
import { api } from '@/api';

export function useStops() {
  const stops = ref<any[]>([]);
  const dashboardData = ref<any[]>([]);
  const loading = ref(false);

  const fetchAllStops = async () => {
    try {
      const res = await api.get('/stops');
      stops.value = res.data;
    } catch (e) { console.error(e); }
  };

  const fetchDashboard = async () => {
    loading.value = true;
    try {
      const res = await api.get('/dashboard');
      dashboardData.value = res.data;
    } catch (e) { console.error(e); } 
    finally { loading.value = false; }
  };

  const addStop = async (stopId: number) => {
    await api.post('/stops', { stopId });
    await fetchDashboard();
  };

  const removeStop = async (stopId: number) => {
    await api.delete(`/stops/${stopId}`);
    await fetchDashboard();
  };

  return { stops, dashboardData, loading, fetchAllStops, fetchDashboard, addStop, removeStop };
}