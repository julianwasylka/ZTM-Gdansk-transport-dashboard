import { Response } from 'express';
import { StopUseCases } from '../../use-cases/StopUseCases';
import { AuthRequest } from '../middleware/auth';

export class StopController {
  constructor(private stopUseCases: StopUseCases) {}

  async getDashboard(req: AuthRequest, res: Response) {
    try {
      const data = await this.stopUseCases.getUserDashboard(req.user!.id);
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllStops(req: AuthRequest, res: Response) {
    try {
      const stops = await this.stopUseCases.getAllAvailableStops();
      res.json(stops);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async addStop(req: AuthRequest, res: Response) {
    try {
      await this.stopUseCases.addStop(req.user!.id, req.body.stopId);
      res.send('Stop added');
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async removeStop(req: AuthRequest, res: Response) {
    try {
      await this.stopUseCases.removeStop(req.user!.id, parseInt(req.params.id));
      res.send('Stop removed');
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}