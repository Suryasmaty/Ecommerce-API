const mongoose = require("mongoose");

// creating the product schema
const productSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
  },
  {
    versionKey: false,
  }
);

const autoIncrement = require("mongoose-auto-increment");

// Apply the auto-increment plugin to the product schema
productSchema.plugin(autoIncrement.plugin, {
  model: "Product",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});

// creating a new model called "Product"
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
