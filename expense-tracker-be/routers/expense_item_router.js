const express = require("express");
const router = express.Router();
const expensesControllers = require("../controllers/expense_item_controller");
const authMiddleware = require("../middlewares/auth_middleware");

router.get("/displayAll", expensesControllers.listRecords);
router.post("/insertExpense", expensesControllers.createRecord);
router.post("/update/:recordID", expensesControllers.updateRecord);
router.get("/displayOne/:recordID", expensesControllers.getRecord);
router.post("/delete/:recordID", expensesControllers.deleteRecord);
router.get("/displayAll", authMiddleware, expensesControllers.listRecords);

router.post("/insertExpense", authMiddleware, expensesControllers.createRecord);

router.post(
  "/update/:recordID",
  authMiddleware,
  expensesControllers.updateRecord
);

router.get(
  "/displayOne/:recordID",
  authMiddleware,
  expensesControllers.getRecord
);

module.exports = router;
