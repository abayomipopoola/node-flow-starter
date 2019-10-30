// @flow

'use strict';

import * as http from 'http';
import Api from './Api';

// ErrnoError interface for use in onError
declare interface ErrnoError extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
}

const app: Api = new Api();
const port: string | number = !!process.env.PORT ? 
  parseInt(process.env.PORT, 10) : 
  5000;
const server: http.Server = http.createServer(app.express);

server.listen(port);
server.on('error', onError);
server.on('listening', onListen);

function onError(error: ErrnoError): void {
  if (error.syscall !== 'listen') throw error;
  let bind: string = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port.toString()}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires higher privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListen(): void {
  let addr: net$Socket$address = server.address();
  let bind: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}
