import { type DataSource } from 'typeorm';
import { type Request, type Response } from 'express';

import { Sprocket } from '../../../entity/sprocket.entity';
import { errorEnvelope } from '../../../response/error';

export const sprocket = (db: DataSource) => async (req: Request, res: Response) => {
  const num = Number(req.params.id);
  if (isNaN(num)) {
    return res.status(400).send(errorEnvelope({ message: 'Invalid sprocket id' }));
  }

  const results = await db.getRepository(Sprocket).findOneBy({
    id: num,
  });

  return results === null
    ? res.status(404).send(errorEnvelope({ message: 'Sprocket not found' }))
    : res.send(results);
};

export default sprocket;
