const userRouter = require("./user");
const productRouter = require("./product");
const router = (app) => {
  app.use("/user", userRouter);
  app.use("/product", productRouter);
};

module.exports = router;
