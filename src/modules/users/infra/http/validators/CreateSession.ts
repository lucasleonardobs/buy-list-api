import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
});
