const mongoose = require('mongoose');
const Schema = mongoose.Schema

const expenseItemSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        amount: { type: Number, required: true },
        userID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Expenses = mongoose.model('Expenses', expenseItemSchema)

module.exports = Expenses