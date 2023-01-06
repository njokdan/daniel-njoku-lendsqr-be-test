import User from '../models/user.model';
import { verifyJWT } from '../utils/jwt.util';
import { JWT_SECRET } from '../utils/constants';

export default class WalletController {
  static async getBalance(token: string): Promise<number> {
    // Verify JWT
    const { email } = verifyJWT(token, JWT_SECRET);

    // Get user from database
    const user = await User.getByEmail(email);
    return user.balance;
  }

  static async depositFunds(amount: number, token: string): Promise<void> {
    // Verify JWT
    const { email } = verifyJWT(token, JWT_SECRET);

    // Get user from database and update balance
    const user = await User.getByEmail(email);
    await User.updateBalance(user.id, user.balance + amount);
  }

  static async withdrawFunds(amount: number, token: string): Promise<boolean> {
    // Verify JWT
    const { email } = verifyJWT(token, JWT_SECRET);

    // Get user from database
    const user = await User.getByEmail(email);

    // Check if sufficient funds
    if (user.balance < amount) {
      return false;
    }

    // Update balance
    await User.updateBalance(user.id, user.balance - amount);
    return true;
  }
}
``
