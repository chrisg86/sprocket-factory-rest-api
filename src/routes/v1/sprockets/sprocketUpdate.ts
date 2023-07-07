import { type DataSource } from 'typeorm';
import { type Request, type Response } from 'express';

import { Sprocket } from '../../../entity/sprocket.entity';
import { errorEnvelope } from '../../../response/error';

export const sprocketUpdate = (db: DataSource) => async (req: Request, res: Response) => {
  const num = Number(req.params.id);
  if (isNaN(num)) {
    return res.status(400).send(errorEnvelope({ message: 'Invalid sprocket id' }));
  }

  const sprocket = await db.getRepository(Sprocket).findOneBy({
    id: num,
  });

  if (sprocket === null) {
    return res.status(404).send(errorEnvelope({ message: 'Sprocket not found' }));
  }

  db.getRepository(Sprocket).merge(sprocket, req.body);
  const results = await db.getRepository(Sprocket).save(sprocket);
  return res.send(results);
};

export default sprocketUpdate;
