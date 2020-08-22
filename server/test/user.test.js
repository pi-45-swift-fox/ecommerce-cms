const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const {queryInterface} = sequelize


afterAll((done) => {
    return queryInterface.bulkDelete("Users",null, {})
    .then(data => {
        done()
    })
    .catch(err => {
        done (err)
    })
})
beforeAll(async (done) => {
    const userCreate = {
        email: "user@admin.com",
        password: '1234',
        role: "admin"
    }
    User.create(userCreate)
        .then(newUser => {
            done()
        })
        .catch(err => {
            done (err)
        }) 
})

describe('User Routes', () => {
    describe("POST /login", () => {
        test("200 Login Succes - should return json message", (done) => {
            const userLogin = {
                email: "user@admin.com",
                password: '1234',
            }
            return request(app)
                    .post('/login')
                    .send(userLogin)
                    .set("Accept", "application/json")
                    .then(response => {
                        const { body, status } = response
                        expect(status).toBe(200)
                        expect(body).toHaveProperty("access_token")
                        done()
                    })
                    .catch((err) => {
                        done (err)
                    })
        })
        test("404 login failed empty email - should return json message", (done) => {
            const userLoginError = {
                email: "",
                password: '1234',
            }
            return request(app)
                    .post('/login')
                    .send(userLoginError)
                    .set("Accept", "application/json")
                    .then(response => {
                        const { body, status } = response
                        expect(status).toBe(404)
                        expect(body).toHaveProperty("message", "email cannot be empty")
                        done()
                    })
                    .catch((err) => {
                        done (err)
                    })
        })
        test("404 login failed empty password - should return json message", (done) => {
            const userLoginError = {
                email: "user@admin.com",
                password: '',
            }
            return request(app)
                    .post('/login')
                    .send(userLoginError)
                    .set("Accept", "application/json")
                    .then(response => {
                        const { body, status } = response
                        expect(status).toBe(404)
                        expect(body).toHaveProperty("message", "password cannot be empty")
                        done()
                    })
                    .catch((err) => {
                        done (err)
                    })
        })
    })
})
