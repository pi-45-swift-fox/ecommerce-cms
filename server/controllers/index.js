const { User, Product } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = class Controller {
    static async login(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                const password_check = await bcrypt.compare(req.body.password, user.password);

                if (password_check) {
                    const token = jwt.sign({
                        email: user.email
                    }, process.env.SECRET);

                    res.status(200).json({
                        token
                    });
                } else {
                    throw 'Wrong password';
                }
            } else {
                throw 'No email found';
            }
        } catch (error) {
            next({
                code: 401,
                type: 'login',
                body: error
            });
        }
    }

    static async getProducts(req, res, next) {
        try {
            const products = await Product.findAll();

            res.status(200).json(products);
        } catch (error) {
            next({
                code: 500,
                type: 'product',
                body: error
            });
        }
    }

    static async detailProduct(req, res, next) {
        try {
            const product = await Product.findOne({
                where: {
                    id: +req.params.id
                }
            });

            if (product) {
                res.status(200).json(product);
            } else {
                next({
                    code: 404,
                    type: 'product',
                })
            }
        } catch (error) {
            next({
                code: 500,
                type: 'product',
                body: error
            })
        }
    }

    static async addProduct(req, res, next) {
        const product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        };
        
        try {
            const result = await Product.create(product);
            res.status(201).json({
                result
            });

        } catch (error) {
            next({
                code: 400,
                type: 'product',
                body: error
            });
        }
    }

    static async delProduct(req, res, next) {
        try {
            await Product.destroy({
                where: {
                    id: +req.params.id
                }
            });

            res.status(200).json({
                msg: 'Product Deleted'
            });
        } catch (error) {
            next({
                code: 500,
                body: error
            });
        }
    }

    static async updateProduct(req, res, next) {
        const product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        };

        try {
            const oldData = await Product.findOne({
                where: {
                    id: +req.params.id
                }
            });

            if (oldData) {
                const result = await Product.update(product, {
                    where: {
                        id: oldData.id
                    }
                });

                res.status(201).json({
                    msg: 'Product Updated',
                    result
                });
            } else {
                next({
                    code: 404,
                    type: 'product'
                });
            }
        } catch (error) {
            next({
                code: 400,
                type: 'product',
                body: error
            });
        }
    }
};