import { pool } from '../utils/db.util';

export default class User {
  id: number;
  email: string;
  password: string;
  balance: number;

  constructor(id: number, email: string, password: string, balance: number) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.balance = balance;
  }

  static async insert(id: number, email: string, password: string, balance: number): Promise<User> {
    await pool.query('INSERT INTO users()VALUES("","","")');
  }

  static async getById(id: number): Promise<User> {
    let [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return new User(rows[0].id, rows[0].email, rows[0].password, rows[0].balance);
  }

  static async getByEmail(email: string): Promise<User> {
    let [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return new User(rows[0].id, rows[0].email, rows[0].password, rows[0].balance);
  }

  static async updateBalance(id: number, balance: number): Promise<void> {
    await pool.query('UPDATE users SET balance = ? WHERE id = ?', [balance, id]);
  }
}
