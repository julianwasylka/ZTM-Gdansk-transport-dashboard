import { Request, Response } from 'express';
import { AuthUseCases } from '../../use-cases/AuthUseCases';

export class AuthController {
  constructor(private authUseCases: AuthUseCases) {}

  async register(req: Request, res: Response) {
    try {
      await this.authUseCases.register(req.body.login, req.body.password);
      res.status(201).send('User registered');
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await this.authUseCases.login(req.body.login, req.body.password);
      res.json({ token });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}