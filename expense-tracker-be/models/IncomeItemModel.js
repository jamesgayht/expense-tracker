const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeItemSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Incomes = mongoose.model("Incomes", incomeItemSchema);

module.exports = Incomes;
