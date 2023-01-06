import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'my_user',
  password: 'my_password',
  database: 'my_database'
});
