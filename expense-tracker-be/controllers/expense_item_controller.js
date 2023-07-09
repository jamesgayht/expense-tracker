const jwt = require("jsonwebtoken")
const expenseItemModel = require('../models/ExpenseItemModel')

const expensesControllers = {
    // listing all expense records
    listRecords: async (req, res) => {
        const expenses = await expenseItemModel.find()
        res.json(expenses)
    },

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
    },

    // updating expense record within the app
    updateRecord: async (req, res) => {
        const data = req.body
        let record = null

        // getting expense record from MongoDB. If it does not eist, return error code 404
        try {
            record = await expenseItemModel.findById(req.params.recordID)
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return res.json()
        }

        if (!record) {
            res.statusCode = 404
            return res.json()
        }

        try {
            await expenseItemModel.updateOne(
                { _id: req.params.itemID },
                {
                    date: data.date,
                    name: data.name,
                    category: data.category,
                    amount: data.amount,
                }, // check how to update timestamp - is it part of the function parameters?
            )
        } catch (err) {
            res.statusCode = 500
            return res.json()
        }
        res.json(
            { msg: "expense item updated successfully" }
        )
    },

    // calling an expense record for display
    getRecord: async (req, res) => {
        const recordID = req.params.recordID
        let expenseRecord = null

        try {
            expenseRecord = await expenseItemModel.findById(recordID)
        } catch (err) {
            res.statusCode = 500
            return res.json()
        }

        // if expense record does not exist, return response 404
        if (!expenseRecord) {
            console.log("Expense record does not exist")
            res.status = 404
            return res.json()
        }

        return res.json(expenseRecord)
    },

    // delete expense record
    deleteRecord: async (req, res) => {
        const data = req.body

        let expenseRecord = null

        try {
            expenseRecord = await expenseItemModel.findById(req.params.recordID)
        } catch (err) {
            res.statusCode = 500
            return res.json()
        }

        if (!expenseRecord) {
            res.statusCode = 404
            return res.json()
        }

        try {
            await expenseItemModel.deleteOne(
                { _id: req.params.recordID },
            )
        } catch (err) {
            res.statusCode = 500
            return res.json()
        }
        res.json({ msg: "expense item deleted successfully" })
    }
}

module.exports = expensesControllers