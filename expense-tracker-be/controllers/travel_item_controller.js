const jwt = require("jsonwebtoken");
const travelExpenseItemModel = require("../models/TravelExpenseItemModel");
const travelExpenseItemValidator = require("./validators/travelExpenseItemValidator");

const travelExpensesControllers = {
  // listing all expense records
  listRecords: async (req, res) => {
    const userID = res.locals.authUserID;
    console.log(">>> current user's userID: ", userID);

    try {
      const expenses = await travelExpenseItemModel.find({ userID: userID });
      return res.status(200).json(expenses);
    } catch (error) {
      console.error(">>> error getting expenses: ", error);
      return res
        .status(400)
        .json({ msg: "An error occured, please try again" });
    }
  },
  listTrips: async (req, res) => {
    const userID = res.locals.authUserID;
    console.log(">>> current user's userID: ", userID);
  
    try {
      const trips = await travelExpenseItemModel.find({ userID: userID }).distinct("trip");
      return res.status(200).json(trips);
    } catch (error) {
      console.error(">>> error getting trips: ", error);
      return res.status(400).json({ msg: "An error occurred, please try again" });
    }
  },

  // creating an expense record within the app
  createRecord: async (req, res) => {
    const userID = res.locals.authUserID;
    console.log(">>> current user's userID: ", userID);

    const expenseInput = { ...req.body, userID: userID };

    // validate expense data
    const validationResult =
    travelExpenseItemValidator.createExpenseItemSchema.validate(expenseInput);

    if (validationResult.error)
      return res.status(400).json({ msg: validationResult.error }); //weird that this doesn't allow us to input today's date

    try {
      const baseAmount = expenseInput.amount * expenseInput.fx;

      const expenseRecord = await travelExpenseItemModel.create({
        date: expenseInput.date,
        name: expenseInput.name,
        category: expenseInput.category,
        amount: expenseInput.amount,
        userID: expenseInput.userID,
        fx: expenseInput.fx,
        ccy: expenseInput.ccy,
        trip: expenseInput.trip,
        baseCCY: expenseInput.baseCCY,
        baseAmount: baseAmount,
      });
      res.statusCode = 201;
      res.json({
        msg: "expense item created successfully",
      });
    } catch (error) {
      console.error(">>> error creating expense: ", error);
      return res
        .status(400)
        .json({ msg: "An error occured, please try again" });
    }
  },

  // updating expense record within the app
  updateRecord: async (req, res) => {
    const data = req.body;
    let record = null;
    let baseAmount;

    // getting expense record from MongoDB. If it does not exist, return error code 404
    try {
      record = await travelExpenseItemModel.findById(req.params.recordID);
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json({msg:"try again"});
    }

    if (!record) {
      res.statusCode = 404;
      return res.json({msg:"record not found"});
    }

    // Validate the amount and fx values as user might not always be updating both fx and amount
    if (isNaN(data.amount)) {
      baseAmount = parseFloat(record.amount) * parseFloat(data.fx)
    } else if (isNaN(data.fx)){
      baseAmount = parseFloat(data.amount) * parseFloat(record.fx)
    } else if (isNaN(data.amount) && (isNan(data.fx))) {
      baseAmount = parseFloat(record.amount) * parseFloat(record.fx);
    } else {
      baseAmount = parseFloat(data.amount) * parseFloat(data.fx);
    }

    try {
      await travelExpenseItemModel.updateOne(
        { _id: req.params.recordID },
        {
          date: data.date,
          name: data.name,
          category: data.category,
          amount: data.amount,
          fx: data.fx,
          ccy: data.ccy,
          trip: data.trip,
          baseAmount: baseAmount,
        } 
      );
    } catch (err) {
      res.statusCode = 500;
      return res.json({msg: "Internal Server Error"});
    }
    res.json({ msg: "expense item updated successfully" });
  },

  // calling an expense record for display
  getRecord: async (req, res) => {
    const recordID = req.params.recordID;
    let expenseRecord = null;

    try {
      expenseRecord = await travelExpenseItemModel.findById(recordID);
    } catch (err) {
      res.statusCode = 500;
      return res.json();
    }

    // if expense record does not exist, return response 404
    if (!expenseRecord) {
      console.log("Expense record does not exist");
      res.status = 404;
      return res.json();
    }

    return res.json(expenseRecord);
  },

  getTripRecord: async(req,res) => {
    const tripRecordName =req.params.tripName
    let tripRecord = null

    try {
      const tripRecord = await travelExpenseItemModel.find({trip:tripRecordName});
      res.status(200).json(tripRecord);
    } catch (error) {
      res.statusCode=500
      res.json({ msg: "An error occurred" });
    }

    if (!tripRecord){
      res.statusCode=404
      return res.json()
    }
  },

  getCCY: async (req, res) => {
    const tripName = req.params.tripName;

    try {
      const expenses = await travelExpenseItemModel.find({ trip: tripName });
  
      if (!expenses || expenses.length === 0) {
        return res.status(404).json({ msg: "Trip not found" });
      }
  
      const baseCCY = expenses[0].baseCCY;
      const ccy = expenses[0].ccy;
      const fx = expenses[0].fx;
  
      return res.status(200).json({ ccy, baseCCY, fx });
    } catch (error) {
      console.error(">>> error getting ccy and fx: ", error);
      return res.status(500).json({ msg: "An error occurred" });
    }
  },

  // delete expense record
  deleteRecord: async (req, res) => {
    // const data = req.body;
    let expenseRecord = null;

    try {
      expenseRecord = await travelExpenseItemModel.findById(req.params.recordID);
    } catch (err) {
      res.statusCode = 500;
      return res.json();
    }

    if (!expenseRecord) {
      res.statusCode = 404;
      return res.json();
    }

    try {
      await travelExpenseItemModel.deleteOne({ _id: req.params.recordID });
    } catch (err) {
      res.statusCode = 500;
      return res.json();
    }
    res.json({ msg: "expense item deleted successfully" });
  },
};

module.exports = travelExpensesControllers;
