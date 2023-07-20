const express = require("express");
const router = express.Router();
const travelExpensesControllers = require("../controllers/travel_item_controller");
const authMiddleware = require("../middlewares/auth_middleware");

router.get("/displayAll", authMiddleware, travelExpensesControllers.listRecords);
router.post("/insertExpense", authMiddleware, travelExpensesControllers.createRecord);
router.post("/update/:recordID", authMiddleware,travelExpensesControllers.updateRecord);
router.get("/displayOne/:recordID",authMiddleware, travelExpensesControllers.getRecord);
router.post("/delete/:recordID", authMiddleware,travelExpensesControllers.deleteRecord);

//get trip names
router.get("/displayTrip/:tripName",authMiddleware, travelExpensesControllers.getTripRecord);
router.get("/displayTrips/",authMiddleware, travelExpensesControllers.listTrips);

// Get currencies of trip (will take from the first record if there are more than 1 expense)
router.get("/displayTrip/:tripName/currencies",authMiddleware, travelExpensesControllers.getCCY);




module.exports = router;

