export const DATABASE_CONNECTION = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'paywell',
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}'
    ],
    synchronize: true,
  };
  
  export const JWT_SECRET = 'Dominion1234';
  
  export const JWT_OPTIONS = {
    expiresIn: '1d',
  };
  