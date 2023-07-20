const express = require("express");
const router = express.Router();
const incomesControllers = require("../controllers/income_item_controller");
const authMiddleware = require("../middlewares/auth_middleware");

router.get("/", authMiddleware, incomesControllers.listIncomes);

router.post("/", authMiddleware, incomesControllers.createIncome);

router.post("/delete", authMiddleware, incomesControllers.deleteIncome);

router.post("/update/:recordID", authMiddleware, incomesControllers.updateIncome);

module.exports = router;
