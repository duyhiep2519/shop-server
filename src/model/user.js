const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
      minLength: 3,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      minLength: 6,
    },
    password: {
      type: "string",
      minLength: 6,
      required: true,
    },
    role: {
      type: "string",
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
  },
  {
    timeStamp: true,
  }
);

userSchema.pre("save", async function (req, res, next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
