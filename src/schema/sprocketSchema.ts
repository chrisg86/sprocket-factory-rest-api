import Joi from 'joi';

const REQUIRED_INTEGER = Joi.number().integer().required();
const OPTIONAL_INTEGER = Joi.number().integer().optional();

const sprocketFields = ['teeth', 'pitch_diameter', 'outside_diameter', 'pitch'];

type SprocketCreateSchema = Record<string, Joi.NumberSchema<number>>;
export const SprocketCreate = Joi.object().keys(
  sprocketFields.reduce((acc: SprocketCreateSchema, val) => {
    acc[val] = REQUIRED_INTEGER;
    return acc;
  }, {})
);

export const SprocketUpdate = SprocketCreate;

export const SprocketUpdatePartial = Joi.object().keys(
  sprocketFields.reduce((acc: SprocketCreateSchema, val) => {
    acc[val] = OPTIONAL_INTEGER;
    return acc;
  }, {})
);

const sprocketSchema = {
  SprocketCreate,
  SprocketUpdate,
  SprocketUpdatePartial,
};

export default sprocketSchema;
