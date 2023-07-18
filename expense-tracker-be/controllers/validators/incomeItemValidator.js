const Joi = require("joi");

const incomeItemValidators = {
  createIncomeItemSchema: Joi.object({
    userID: Joi.string().required(),
    date: Joi.date().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),
    amount: Joi.number().required(),
  }),
  
  deleteIncomeItemSchema: Joi.object({
    id: Joi.string().required(),
    userID: Joi.string().required(),
  }),
};

module.exports = incomeItemValidators;
