import express, { type Express } from 'express';
import { type DataSource } from 'typeorm';

import {
  SprocketCreate,
  SprocketUpdate,
  SprocketUpdatePartial,
} from '../../../schema/sprocketSchema';

import sprocketCreate from './sprocketCreate';
import validate from '../../../middleware';
import sprocket from './sprocket';
import sprocketUpdate from './sprocketUpdate';

const sprockets = (app: Express, db: DataSource): void => {
  const router = express.Router();

  router.post('/', validate(SprocketCreate), sprocketCreate(db));
  router.get('/:id', sprocket(db));
  router.put('/:id', validate(SprocketUpdate), sprocketUpdate(db));
  router.patch('/:id', validate(SprocketUpdatePartial), sprocketUpdate(db));

  app.use('/api/v1/sprockets', router);
};

export default sprockets;
