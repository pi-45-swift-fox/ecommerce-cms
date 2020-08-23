const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

let user = {
    email: 'admin@mail.com',
    password: '1234',
    role: 'admin' 
}

let user2 = {
    email: 'admin@mail.com',
    password: '1234',
    role: 'customer' 
}

let product = {
    name: 'tongkat sung go kong',
    image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
    price: 20000,
    stock: 10
}

let token
let token2
beforeAll(done => {
    User.create(user)
        .then(data => {
            console.log(data.id, '<<<data.id')
            token = jwt.sign({id: data.id}, process.env.SECRET)
            return User.create(user2)
        })
        .then(data2 => {
            token2 = jwt.sign({id: data2.id}, process.env.SECRET)
            return Product.create(product)
        })
        .then(() => done())
})

afterAll((done) => {
    return queryInterface.bulkDelete('Products')
        .then(() => {
            return queryInterface.bulkDelete('Users')
        })
        .then(() => {
            done()
        })
})


describe('read all Product', () => {
    describe('succes read all product', () => {
        it ('Return status 200 with data Product', done => {
            request(app)
                .get('/products')
                .set('accesstoken', token)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(200)
                    expect(body).toEqual(expect.any(Array))
                    done()
                })
        })
    })

    describe('role is not admin', () => {
        it ('Return status 400 with message error', done => {
            request(app)
                .get('/products')
                .set('accesstoken', token2)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Not Authorized')
                    done()
                })
        })
    })
})