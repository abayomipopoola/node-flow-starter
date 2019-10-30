// @flow

import express from 'express';
import bodyParser from 'body-parser';

export default class Api {
  express: express$Application<express$Request, express$Response>;

  // create the express instance, attach app-level middleware, attach routers
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // register middlewares
  middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  // connect resource routers
  routes(): void {
    this.express.use((req: express$Request, res: express$Response) => {
      res.json({ message: 'Node-Flow starter project!' });
    });
  }
}
