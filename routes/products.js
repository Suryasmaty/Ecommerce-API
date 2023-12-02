// products.js
const express = require("express");
const router = express.Router();

// initializing products controller
const productsController = require("../controllers/products_controller");

// to get all the products
router.get("/", productsController.listProducts);

// to create a product
router.post("/create", productsController.createProduct);

// to delete a product using it's ID
router.delete("/:id", productsController.deleteProduct); // Change the parameter name here

// to update the quantity of a product
router.post("/:id/update_quantity/", productsController.updateQuantity); // Change the parameter name here

module.exports = router;
