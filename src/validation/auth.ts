import {
  Joi,
} from '../config';

const email = Joi.string()
  .email()
  .min(6)
  .max(256)
  .trim()
  .lowercase();

const login = Joi.string()
  .min(6)
  .max(256)
  .trim()
  .required();

const password = Joi.string()
  .min(6)
  .max(256)
  .trim()
  .required();

export const loginSchema = Joi.object({
  login,
  password,
});

export const registerSchema = Joi.object({
  login,
  password,
  email,
});
