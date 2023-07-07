import express, { type Express } from 'express';
import { type DataSource } from 'typeorm';

import sprocketFactories from './sprocketFactories';
import sprocketFactory from './sprocketFactory';

const sprocketFactoryRoutes = (app: Express, db: DataSource): void => {
  const router = express.Router();

  router.get('/', sprocketFactories(db));
  router.get('/:id', sprocketFactory(db));

  app.use('/api/v1/factories', router);
};

export default sprocketFactoryRoutes;
