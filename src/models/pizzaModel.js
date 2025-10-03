const Joi = require("joi");

const pizzaSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required().min(1).max(100),
  size: Joi.string().valid("small", "medium", "large").required(),
  ingredients: Joi.array().items(Joi.string().min(1).max(50)).required(),
  price: Joi.number().required().min(1)
}).unknown(false); // Disallow unknown fields

module.exports = {
  pizzaSchema
};
