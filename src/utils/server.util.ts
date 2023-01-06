import { Server } from 'http';

export const normalizePort = (val: string) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

export const onError = (server: Server) => {
  return (error: NodeJS.ErrnoException) => {
    const port = server.address().port;
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
};

export const onListening = (server: Server) => {
  return () => {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  };
};
