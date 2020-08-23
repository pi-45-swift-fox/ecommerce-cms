const { User, Product } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Controller {

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (user) {
                const checkPassword = bcrypt.compareSync(password, user.password)
                if (checkPassword) {
                    let access_token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)
                    res.status(200).json({ access_token })
                } else {
                    next({ errCode: 'INVALID_ACCOUNT' })
                }
            } else {
                next({ errCode: 'INVALID_ACCOUNT' })
            }

        } catch (err) {
            next(err)
        }

    }

    static async create(req, res, next) {
        try {
            const { name, image_url, price, stock, category } = req.body
            const newProduct = {
                name,
                image_url,
                price,
                stock,
                category
            }
            const created = await Product.create(newProduct)
            if (created) {
                res.status(201).json({
                    id: created.id,
                    name: created.name,
                    price: created.price,
                    stock: created.stock,
                    category: created.category
                })
            }
        }
        catch (err) {
            next(err)
        }
    }

    static async read(req, res, next) {
        try {
            const data = await Product.findAll({
                order: [['name', 'ASC']]
            })
            res.status(200).json(data)
        }
        catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {

        try {
            const id = req.params.id
            const { name, image_url, price, stock, category } = req.body
            const dataUpdate = {
                name,
                image_url,
                price,
                stock,
                category
            }
            const updated = await Product.update(dataUpdate, {
                where: {
                    id
                }
            })
            if (updated) {
                res.status(200).json({ message: ['Successfully update'] })
            }
        }
        catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id
            const data = await Product.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({ message: ['Successfully deleted'] })
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = Controller