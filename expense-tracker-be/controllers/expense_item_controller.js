const jwt = require("jsonwebtoken")
const expenseItemModel = require('../models/ExpenseItemModel')

const controllers = {
    // creating an expense record within the app
    createRecord: async (req, res) => {
        const expenseInput = req.body

        const expenseRecord = await expenseItemModel.create({
            date: expenseInput.date,
            name: expenseInput.name,
            category: expenseInput.category,
            amount: expenseInput.amount
        })

        res.statusCode = 201
        res.json({
            msg: "expense item created successfully"
        })
    }
}