const mongoose = require('mongoose');

const expenseItemSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        amount: { type: Number, required: true }
    }
)

const Expenses = mongoose.model('Expenses', expenseItemSchema)

module.exports = Expenses