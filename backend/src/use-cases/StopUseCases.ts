import { UserRepository } from '../domain/interfaces/UserRepository';
import { ZtmService } from '../infrastructure/services/ZtmService';

export class StopUseCases {
  constructor(
    private userRepo: UserRepository,
    private ztmService: ZtmService
  ) {}

  async addStop(userId: string, stopId: number): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    
    if (!user.savedStops.includes(stopId)) {
      user.savedStops.push(stopId);
      await this.userRepo.updateStops(userId, user.savedStops);
    }
  }

  async removeStop(userId: string, stopId: number): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');

    user.savedStops = user.savedStops.filter(id => id !== stopId);
    await this.userRepo.updateStops(userId, user.savedStops);
  }

  async getUserDashboard(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');

    const allStops = await this.ztmService.getAllStops();

    const dashboardData = await Promise.all(user.savedStops.map(async (stopId) => {
      const stopInfo = allStops.find(s => s.stopId === stopId);
      const delays = await this.ztmService.getDelays(stopId);
      
      return {
        stopId,
        stopName: stopInfo ? stopInfo.stopDesc : `Przystanek ${stopId}`,
        delays: delays
      };
    }));

    return dashboardData;
  }

  async getAllAvailableStops() {
    return await this.ztmService.getAllStops();
  }
}