const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelExpenseItemSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    fx:{type:Number, required:true},
    ccy:{type:String, required:true},
    baseCCY: {type:String, required:true},
    trip:{type:String, required:true},
    baseAmount: {type: Number},
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

// Pre-save hook to calculate baseAmount before saving
travelExpenseItemSchema.pre("save", function (next) {
  if (this.isModified("amount") || this.isModified("fx")) {
    this.baseAmount = this.amount * this.fx;
  }
  next();
});


const TravelExpenses = mongoose.model("TravelExpenses", travelExpenseItemSchema);

module.exports = TravelExpenses;
