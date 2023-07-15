const express = require("express");
const router = express.Router();
const travelExpensesControllers = require("../controllers/travel_item_controller");
const authMiddleware = require("../middlewares/auth_middleware");

router.get("/displayAll", authMiddleware, travelExpensesControllers.listRecords);
router.post("/insertExpense", authMiddleware, travelExpensesControllers.createRecord);
router.post("/update/:recordID", authMiddleware,travelExpensesControllers.updateRecord);
router.get("/displayOne/:recordID",authMiddleware, travelExpensesControllers.getRecord);
router.post("/delete/:recordID", authMiddleware,travelExpensesControllers.deleteRecord);

module.exports = router;

