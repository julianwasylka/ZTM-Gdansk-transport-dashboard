import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../domain/interfaces/UserRepository';
import { User, Login, Password } from '../domain/entities/User';

export class AuthUseCases {
  constructor(private userRepo: UserRepository) {}

  async register(loginStr: string, plainPass: string): Promise<void> {
    const existing = await this.userRepo.findByLogin(loginStr);
    if (existing) throw new Error('Użytkownik już istnieje');

    const login = new Login(loginStr);
    const password = await Password.create(plainPass);
    const newUser = new User('', login, password);
    await this.userRepo.create(newUser);
  }

  async login(loginStr: string, plainPass: string): Promise<string> {
    const user = await this.userRepo.findByLogin(loginStr);
    if (!user) throw new Error('Błędny login lub hasło');

    const isValid = await user.password.compare(plainPass);
    if (!isValid) throw new Error('Błędny login lub hasło');

    const token = jwt.sign(
      { id: user.id, login: user.login.value },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '2h' }
    );
    return token;
  }
}