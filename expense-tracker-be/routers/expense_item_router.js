const express = require('express')
const router = express.Router()
const expenseItemController = require('../controllers/expense_item_controller');
const expensesControllers = require('../controllers/expense_item_controller');

router.get("/displayAll", expensesControllers.listRecords);
router.post("/insertExpense", expensesControllers.createRecord);
router.post("/update/:recordID", expensesControllers.updateRecord);
router.get("/displayOne/:recordID", expensesControllers.getRecord);
router.post("/delete/:recordID", expensesControllers.deleteRecord)

module.exports = router;