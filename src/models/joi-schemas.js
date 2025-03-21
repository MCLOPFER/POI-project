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


export const PointSpec = {
  name: Joi.string().required(),
  country: Joi.string().required(),
  description: Joi.string().allow("").optional()

};

export const CommentSpec = {
  comment: Joi.string().required()
};

// export const ImageSpec = {
//   image: Joi.
// }

export const PointDetailSpec = {
  description: Joi.string().optional(),
  categories: Joi.string().optional()
};