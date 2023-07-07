import { type DataSource } from 'typeorm';
import { type Request, type Response } from 'express';

import { errorEnvelope } from '../../../response/error';
import { SprocketFactory } from '../../../entity/sprocketFactory.entity';
import { type SprocketFactoryResponse } from '../../../types';

export const sprocketFactory = (db: DataSource) => async (req: Request, res: Response) => {
  const num = Number(req.params.id);
  if (isNaN(num)) {
    return res.status(400).send(errorEnvelope({ message: 'Invalid factory id' }));
  }

  const results = await db.getRepository(SprocketFactory).find({
    where: [{ factory_id: num }],
    order: {
      timestamp: 'ASC',
    },
  });

  if (results.length !== 0) {
    const data: SprocketFactoryResponse = {
      factory: {
        chart_data: {
          sprocket_production_actual: results.map((f) => f.production_actual),
          sprocket_production_goal: results.map((f) => f.production_goal),
          time: results.map((f) => f.timestamp),
        },
      },
    };

    return res.send(data);
  }

  return res.send(errorEnvelope({ message: 'Sprocket Factory not found' })).status(404);
};

export default sprocketFactory;
