const Product = require("../models/product");

// API to list products
module.exports.listProducts = function (req, res) {
  Product.find({}, function (err, foundProducts) {
    if (err) {
      res.status(500).send(err);
    } else {
      const products = foundProducts.map((product) => {
        return {
          id: product.id,
          name: product.name,
          quantity: product.quantity,
        };
      });
      res.status(200).json({ products });
    }
  });
};

// API to add products to the database
module.exports.createProduct = function (req, res) {
  const newProduct = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
  });

  newProduct.save(function (err, savedProduct) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({
        data: {
          product: {
            id: savedProduct.id,
            name: savedProduct.name,
            quantity: savedProduct.quantity,
          },
        },
      });
    }
  });
};

// API to delete products
module.exports.deleteProduct = function (req, res) {
  const productId = req.params.id; // Change the parameter name here
  Product.deleteOne({ id: productId }, function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({
        data: {
          message: "Product deleted",
        },
      });
    }
  });
};

// API to update quantity of a product (can be incremented or decremented)
module.exports.updateQuantity = function (req, res) {
  const productId = req.params.id;
  const number = parseInt(req.query.number);

  // Find the product using the ID
  Product.updateOne(
    { id: productId }, // Update based on your custom id field
    { $inc: { quantity: number } }, // Increment the quantity
    { new: true },
    function (err, updatedProduct) {
      if (err) {
        console.error("Error updating product quantity:", err);
        res.status(500).send(err);
      } else {
        res.status(200).json({
          data: {
            product: {
              id: updatedProduct.id,
              name: updatedProduct.name,
              quantity: updatedProduct.quantity,
            },
            message: "Updated successfully",
          },
        });
      }
    }
  );
};

/*
module.exports.updateQuantity = function (req, res) {
  const productId = req.params.id;
  const number = parseInt(req.query.number);

  // Find the product using the ID
  Product.findById(productId, function (err, foundProduct) {
    if (err) {
      console.error("Error finding product by ID:", err);
      res.status(500).send(err);
    } else {
      // Update the product's quantity
      const newQty = foundProduct.quantity + number;

      // Update the product's quantity
      Product.findByIdAndUpdate(
        productId,
        { quantity: newQty },
        { new: true },
        function (err, updatedProduct) {
          if (err) {
            console.error("Error updating product quantity:", err);
            res.status(500).send(err);
          } else {
            res.status(200).json({
              data: {
                product: {
                  id: updatedProduct.id,
                  name: updatedProduct.name,
                  quantity: updatedProduct.quantity,
                },
                message: "Updated successfully",
              },
            });
          }
        }
      );
    }
  });
};
*/
