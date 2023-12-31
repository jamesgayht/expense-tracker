const incomeItemModel = require("../models/IncomeItemModel");
const incomeItemValidator = require("./validators/incomeItemValidator");

const incomesController = {
  listIncomes: async (req, res) => {
    const userID = res.locals.authUserID;

    try {
      const incomes = await incomeItemModel.find({ userID: userID });
      return res.status(200).json(incomes);
    } catch (error) {
      console.error(">>> error getting incomes: ", error);
      return res
        .status(400)
        .json({ msg: "An error occured, please try again" });
    }
  },

  // creating an income record within the app
  createIncome: async (req, res) => {
    const userID = res.locals.authUserID;

    const incomeInput = { ...req.body, userID: userID };

    // validate income data
    const validationResult =
      incomeItemValidator.createIncomeItemSchema.validate(incomeInput);

    if (validationResult.error)
      return res.status(400).json({ msg: validationResult.error });

    try {
      const incomeRecord = await incomeItemModel.create({
        date: incomeInput.date,
        name: incomeInput.name,
        category: incomeInput.category,
        amount: incomeInput.amount,
        userID: incomeInput.userID,
      });
      res.statusCode = 201;
      res.json({
        msg: "income item created successfully",
      });
    } catch (error) {
      console.error(">>> error creating income: ", error);
      return res
        .status(400)
        .json({ msg: "An error occured, please try again" });
    }
  },

  deleteIncome: async (req, res) => {
    const userID = res.locals.authUserID;

    const incomeInput = { ...req.body, userID: userID };

    // validate income data
    const validationResult =
      incomeItemValidator.deleteIncomeItemSchema.validate(incomeInput);

    if (validationResult.error)
      return res.status(400).json({ msg: validationResult.error });

    try {
      await incomeItemModel.deleteOne({ _id: req.body.id });
      res.statusCode = 200;
      res.json({
        msg: "income item deleted",
      });
    } catch (error) {
      console.info(">>> error deleting income: ", error);
      return res
        .status(400)
        .json({ msg: "An error occured, please try again" });
    }
  },

  updateIncome: async (req, res) => {
    const userID = res.locals.authUserID;
    const data = req.body;
    let record = null;

    const incomeInput = { ...req.body, userID: userID };

    const validationResult =
      incomeItemValidator.createIncomeItemSchema.validate(incomeInput);

    if (validationResult.error)
      return res.status(400).json({ msg: validationResult.error });

    try {
      record = await incomeItemModel.findById(req.params.recordID);
    } catch (error) {
      console.error(">>> update income error: ", error);
      return res
        .status(400)
        .json({ msg: "An error occured, please try again" });
    }

    if (!record) {
      res.statusCode = 404;
      return res.json({ msg: "record not found" });
    }

    try {
      await incomeItemModel.updateOne(
        {
          _id: req.params.recordID,
        },
        {
          date: data.date,
          name: data.name,
          category: data.category,
          amount: data.amount,
        }
      );
      return res.status(200).json({ msg: "Income updated successfully" });
    } catch (error) {
      console.error(">>> update income error: ", error);
      return res
        .status(400)
        .json({ msg: "An error occured, please try again" });
    }
  },
};

module.exports = incomesController;
