import { type DataSource } from 'typeorm';
import { type Request, type Response } from 'express';

import { Sprocket } from '../../../entity/sprocket.entity';

export const sprocketCreate = (db: DataSource) => async (req: Request, res: Response) => {
  const sprocket = db.getRepository(Sprocket).create(req.body);
  const results = await db.getRepository(Sprocket).save(sprocket);
  return res.status(201).send(results);
};

export default sprocketCreate;
