import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from './utils/constants';

createConnection(DATABASE_CONNECTION).then(async (connection) => {
  console.log('Connected to database');
}).catch((error) => console.log(error));
