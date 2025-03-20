import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};


export const PointDetailSpec = {
  name: Joi.string().required(),
  longitude: Joi.string().optional(),
  latitude: Joi.string().optional(),
  description: Joi.string().optional(),
  categories: Joi.string().optional()
};

export const PointSpec = {
  name: Joi.string().required(),
  latitude: Joi.string().optional(),
  longitude: Joi.string().optional(),
  description: Joi.string().optional(),
};