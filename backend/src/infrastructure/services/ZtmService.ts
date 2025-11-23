import axios from 'axios';
import { Stop } from '../../domain/entities/Stop';

export class ZtmService {
  private stopsCache: Stop[] | null = null;
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

  async getAllStops(): Promise<Stop[]> {
    const now = Date.now();
    
    if (this.stopsCache && (now - this.lastFetch < this.CACHE_DURATION)) {
      return this.stopsCache;
    }

    console.log('Pobieranie stops.json z ZTM...');
    try {
      const response = await axios.get('https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json', { timeout: 4000 });
      
      const data = response.data;
      let stopsArray: any[] = [];

      if (data.stops && Array.isArray(data.stops)) {
        stopsArray = data.stops;
      } else {
        const keys = Object.keys(data);
        if (keys.length > 0) {
            const firstKey = keys[0];
            const nested = data[firstKey];
            if (nested && nested.stops && Array.isArray(nested.stops)) {
                stopsArray = nested.stops;
            }
        }
      }

      if (!Array.isArray(stopsArray)) {
          console.error("Nie udało się znaleźć tablicy 'stops' w odpowiedzi ZTM", data);
          throw new Error("Błędna struktura danych ZTM");
      }

      this.stopsCache = stopsArray.map((s: any) => ({
        stopId: s.stopId,
        stopName: s.stopName || s.stopDesc, 
        stopDesc: s.stopDesc || ''
      }));
      
      this.lastFetch = now;
      console.log(`Załadowano ${this.stopsCache.length} przystanków.`);
      return this.stopsCache;

    } catch (error) {
      console.error("Błąd podczas pobierania przystanków:", error);
      throw error;
    }
  }

  async getDelays(stopId: number) {
    try {
      // inny endpoint niz w instrukcji
      const response = await axios.get(`https://ckan2.multimediagdansk.pl/departures?stopId=${stopId}`, { timeout: 4000 });
      return response.data.departures || [];
    } catch (e) {
      console.error(`Błąd pobierania odjazdów dla ${stopId}:`, e);
      return [];
    }
  }
}