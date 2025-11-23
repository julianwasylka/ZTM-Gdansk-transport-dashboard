import mongoose, { Schema, Document } from 'mongoose';
import { UserRepository } from '../../domain/interfaces/UserRepository';
import { User, Login, Password } from '../../domain/entities/User';

interface UserDoc extends Document {
  login: string;
  passwordHash: string;
  savedStops: number[];
}

const UserSchema = new Schema<UserDoc>({
  login: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  savedStops: { type: [Number], default: [] }
});

const UserModel = mongoose.model<UserDoc>('User', UserSchema);

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create({
      login: user.login.value,
      passwordHash: user.password.value,
      savedStops: user.savedStops
    });
    // Mapowanie z db na domene
    return new User(
        created._id.toString(), 
        new Login(created.login), 
        Password.fromHash(created.passwordHash), 
        created.savedStops);
  }

  async findByLogin(loginStr: string): Promise<User | null> {
    const doc = await UserModel.findOne({ login: loginStr });
    if (!doc) return null;
    
    return new User(
        doc._id.toString(), 
        new Login(doc.login),
        Password.fromHash(doc.passwordHash), 
        doc.savedStops
    );
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    if (!doc) return null;
    return new User(
        doc._id.toString(),
        new Login(doc.login), 
        Password.fromHash(doc.passwordHash), 
        doc.savedStops);
  }

  async updateStops(userId: string, stops: number[]): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { savedStops: stops });
  }
}