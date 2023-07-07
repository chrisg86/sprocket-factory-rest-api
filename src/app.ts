import dotenv from 'dotenv';
import express, { type Express } from 'express';

import db from './data-source';
import sprocketRoutes from './routes/v1/sprockets';
import sprocketFactoryRoutes from './routes/v1/sprocketFactory';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

db.initialize()
  .then(() => {
    console.log('[DB] initialized!');
  })
  .catch((err) => {
    console.error('[DB] Unable to initialize', err);
  });

// Initializing routes
sprocketRoutes(app, db);
sprocketFactoryRoutes(app, db);

export default app;
