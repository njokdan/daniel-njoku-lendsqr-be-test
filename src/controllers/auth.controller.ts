import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../models/user.model';

const SALT_ROUNDS = 10;

export default class AuthController {
  static async register(email: string, password: string): Promise<void> {
    // Hash password
    const hashedPassword = await hash(password, SALT_ROUNDS);

    // Insert new user into database
    await User.insert(email, hashedPassword, 0);
  }

  static async login(email: string, password: string): Promise<string> {
    // Get user from database
    const user = await User.getByEmail(email);

    // Compare hashed password
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }

    // Sign and return JWT
    return sign({ email }, JWT_SECRET, JWT_OPTIONS);
  }
}
