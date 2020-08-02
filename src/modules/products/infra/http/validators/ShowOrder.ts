import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
});
