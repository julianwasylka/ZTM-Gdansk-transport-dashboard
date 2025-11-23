import { User } from "../entities/User";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByLogin(login: string): Promise<User | null>;
  updateStops(userId: string, stops: number[]): Promise<void>;
  findById(id: string): Promise<User | null>;
}