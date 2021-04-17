const express = require("express");
const http = require("http");
const env = require("dotenv");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./route/index");

env.config();

//connect db

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err.message));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use("/uploads", express.static("uploads"));

router(app);

server.listen(process.env.PORT, (req, res) =>
  console.log(`Server is running at port ${process.env.PORT}`)
);
