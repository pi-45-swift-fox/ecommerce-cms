const { Product } = require('../models');

class ProductController {
  static view(req, res, next)
  {
    Product.findAll()
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => res.status(500).json(err));
  }

  static post(req, res, next)
  {
    const newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.create(newProduct)
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError")
          return res.status(400).json({message: err.errors[0].message})
        return res.status(500).json(err);
      })
  }

  static update(req, res, next)
  {
    const newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Product.update(newProduct, {where: {id: +req.params.id}, returning: true})
      .then(data => {
        if (!data[1][0])
          return res.status(404).json({message: "product with such id is not found"});
        return res.status(201).json(data[1][0]);
      })
      .catch(err => res.status(500).json(err));
  }

  static delete(req, res, next)
  {
    let productDeleted;

    Product.findOne({where: {id: +req.params.id}})
      .then(data => {
        if (!data)
          return res.status(404).json({message: "product with such id is not found"});
        productDeleted = data;
        return Product.destroy({where: {id: +req.params.id}});
      })
      .then(data => {
        res.status(200).json(productDeleted);
      })
      .catch(err => res.status(500).json(err));
  }
}

module.exports = ProductController;
