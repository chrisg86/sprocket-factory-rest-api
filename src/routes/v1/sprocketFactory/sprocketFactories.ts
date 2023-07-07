import { type DataSource } from 'typeorm';
import { type Request, type Response } from 'express';
import { groupBy } from 'lodash';

import { SprocketFactory } from '../../../entity/sprocketFactory.entity';
import { type SprocketFactoryResponse } from '../../../types';

export const sprocketFactories = (db: DataSource) => async (req: Request, res: Response) => {
  const results = await db.getRepository(SprocketFactory).find({
    order: {
      id: 'ASC',
      timestamp: 'ASC',
    },
  });

  const data: SprocketFactoryResponse[] = Object.values(groupBy(results, 'factory_id')).map(
    (item) => ({
      factory: {
        chart_data: {
          sprocket_production_actual: item.map((f) => f.production_actual),
          sprocket_production_goal: item.map((f) => f.production_goal),
          time: item.map((f) => f.timestamp),
        },
      },
    })
  );

  return res.send({ factories: data });
};

export default sprocketFactories;
