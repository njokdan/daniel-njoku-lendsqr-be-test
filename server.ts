import app from './app';
import { normalizePort, onError, onListening } from './utils/server.util';

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = app.listen(port);

server.on('error', onError(server));
server.on('listening', onListening(server));
