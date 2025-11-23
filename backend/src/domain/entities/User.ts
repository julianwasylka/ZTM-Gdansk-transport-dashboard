import bcrypt from 'bcryptjs';

export class Password {
  constructor(public value: string, private hashed: boolean = false) {}

  static async create(plainText: string): Promise<Password> {
    if (plainText.length < 4) throw new Error('Hasło za krótkie');
    const hash = await bcrypt.hash(plainText, 10);
    return new Password(hash, true);
  }

  static fromHash(hash: string): Password {
    return new Password(hash, true);
  }

  async compare(plainText: string): Promise<boolean> {
    return bcrypt.compare(plainText, this.value);
  }
}

export class Login {
  constructor(public value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Login nie może być pusty');
    }
  }

  static create(value: string): Login {
    return new Login(value);
  }

  equals(other: Login): boolean {
    return this.value === other.value;
  }
}

export class User {
  constructor(
    public id: string,
    public login: Login,
    public password: Password,
    public savedStops: number[] = [] // Tablica ID przystanków
  ) {}
}