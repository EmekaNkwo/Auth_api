const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Routes
const authRoute = require("./routes/auth");

dotenv.config();

//connecting to db

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB Connected");
    }
  }
);

//Middlewares
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server Running"));
