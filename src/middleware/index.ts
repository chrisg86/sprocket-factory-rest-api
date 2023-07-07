import { type NextFunction, type Request, type Response } from 'express';
import type Joi from 'joi';
import { isNil } from 'lodash';

import { validationEnvelope } from '../response/error';

export const validate =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (!isNil(error)) {
      const validation = error.details.map((err) => err.message);
      res.status(400).send(validationEnvelope(validation));
    } else {
      next();
    }
  };

export default validate;
