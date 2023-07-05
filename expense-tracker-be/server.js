const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();
const cors = require("cors");

// handle cors pre-flight requests
app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors());

// test route to check if server works 
app.get("/api/test", (req, res) => {
  res.json("server works!");
});

// LISTENER
mongoose
  .connect(`mongodb://localhost:27017/expense-tracker`)
  // .connect(
  //   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  // )
  .then(() => {
    console.log("DB connected");

    // boot up app
    app.listen(port, () => {
      console.log("Expense tracker running on port: ", port);
    });
  })
  .catch((err) => {
    console.log("err when connecting: " + err);
  });
