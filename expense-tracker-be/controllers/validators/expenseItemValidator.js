const Joi = require("joi");

const expenseItemValidators = {
  createExpenseItemSchema: Joi.object({
    userID: Joi.string().required(),
    date: Joi.date().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

module.exports = expenseItemValidators;
