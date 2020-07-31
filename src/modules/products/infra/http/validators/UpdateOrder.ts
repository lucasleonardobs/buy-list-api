import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    quantity: Joi.number(),
    total_cost: Joi.number(),
    product_id: Joi.number(),
  },
});
