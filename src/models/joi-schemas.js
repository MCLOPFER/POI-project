import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const CommentSpec = Joi.object()
  .keys({
    comment: Joi.string().required().example("comment2"),
    pointid: IdSpec,
  })
  .label("Comment");

  export const CommentSpecPlus = CommentSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("CommentPlus");

  export const CommentArraySpec = Joi.array().items(CommentSpecPlus).label("CommentArray");

  export const UpdatePointSpec = {
    description: Joi.string().allow("").optional()
  };
  export const PointSpec = Joi.object()
    .keys({
      name: Joi.string().required().example("Millennium Forest"),
      description: Joi.string().required().example("This is a Millennium forest consisting of about 90 ha. The wood used to be semi-mature conifer woodland. There are 6 ha of oak woodlands over 100 years old. In recent years the park has been replanted with sessile oak, ash, birch, cherry and spindle as part of the Millennium forest project. Other flora to look out for are the bluebells that grow under the oak woodland. Proximity to Kilkenny means that the area is very popular with local towns people for walking. Coill an Fhailtaigh is a Millennium Forest."),
      userid: IdSpec,
      comments: CommentArraySpec,
    })
    .label("Point");
  
  export const PointSpecPlus = PointSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("PointPlus");
  
  export const PointArraySpec = Joi.array().items(PointSpecPlus).label("PointArray");
  