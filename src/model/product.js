const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  type: {
    type: "string",
  },
  description: {
    type: "string",
    required: true,
  },
  price: {
    type: "number",
    required: true,
  },
  sale: {
    type: "number",
  },
  image: {
    type: "string",
  },
});

module.exports = mongoose.model("product", productSchema);
