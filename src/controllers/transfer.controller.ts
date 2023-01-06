import { pool } from '../utils/db.util';
import User from '../models/user.model';

export default class TransferController {
  static async transferFunds(senderId: number, recipientEmail: string, amount: number): Promise<void> {
    // Get recipient user from database
    const recipient = await User.getByEmail(recipientEmail);

    // Check if sender has sufficient funds
    const sender = await User.getById(senderId);
    if (sender.balance < amount) {
      throw new Error('Insufficient funds');
    }

    // Update sender and recipient balances
    await User.updateBalance(senderId, sender.balance - amount);
    await User.updateBalance(recipient.id, recipient.balance + amount);
  }
}
