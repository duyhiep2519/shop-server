const Product = require("../model/product");

class ProductController {
  //get list product

  getList(req, res, next) {
    Product.find()
      .then((product) => res.status(200).json({ product: product }))
      .catch((err) => res.status(400).json({ err: err.message }));
  }
  //upload
  upLoad(req, res, next) {
    const product = new Product({
      name: req.body.name,
      type: req.body.type,
      sale: req.body.sale,
      price: req.body.price,
      description: req.body.description,
      image: req.file.path,
    });
    product
      .save()
      .then(() => {
        res.status(200).json({ product: product });
      })
      .catch((err) => res.status(500).json({ err: err.message }));
  }

  detail(req, res, next) {
    Product.findOne({ slug: req.body.slug })
      .then((product) => {
        res.status(200).json({ product: product });
      })
      .catch((err) => res.status(500).json({ err: err.message }));
  }
}

module.exports = new ProductController();
