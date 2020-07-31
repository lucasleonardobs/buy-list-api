import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    quantity: Joi.number().required(),
    total_cost: Joi.number().required(),
    product_id: Joi.number().required(),
    user_id: Joi.string().uuid().required(),
  },
});
