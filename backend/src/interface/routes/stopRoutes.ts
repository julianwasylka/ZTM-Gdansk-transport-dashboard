import { Router } from 'express';
import { StopController } from '../controllers/StopController';
import { verifyToken } from '../middleware/auth';

export const createStopRouter = (controller: StopController) => {
  const router = Router();

  // chronione routes
  router.get('/stops', verifyToken, (req: any, res: any) => controller.getAllStops(req, res));
  router.get('/dashboard', verifyToken, (req: any, res: any) => controller.getDashboard(req, res));
  router.post('/stops', verifyToken, (req: any, res: any) => controller.addStop(req, res));
  router.delete('/stops/:id', verifyToken, (req: any, res: any) => controller.removeStop(req, res));

  return router;
};