import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    unitPrice: Joi.number().required(),
    category: Joi.string().required(),
  },
});
