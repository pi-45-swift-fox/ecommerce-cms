require('dotenv').config()
const request = require('supertest')
const app = require('../app.js')
const jwt = require('jsonwebtoken')

describe('POST /login success', ()=>{
    it('return access_token', (done)=>  {
        request(app)
        .post('/login')
        .send({email:'admin@mail.com', password:'1234', role: 'admin'})
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response
            const token = jwt.sign({email: 'admin@mail.com'}, process.env.JWT_SECRET)
            expect(body).toHaveProperty('access_token', token)
            expect(response.status).toBe(200)
            done()
        })
    })
})

describe('POST /login failed', ()=>{
    it('return error,wrong password', (done)=>  {
        request(app)
        .post('/login')
        .send({email:'admin@mail.com', password:'12345'})
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response

            expect(body).toHaveProperty('message', ['Invalid password or email'])
            expect(response.status).toBe(401)
            done()
        })
    })

    it(' error,wrong email', (done)=>  {
        request(app)
        .post('/login')
        .send({ email:'admin8@mail.com', password:'1234' })
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response

            expect(body).toHaveProperty('message', ['Invalid password or email'])
            expect(response.status).toBe(401)
            done()
        })
    })

    it('error,empty email and password', (done)=>  {
        request(app)
        .post('/login')
        .send({ email:'', password:'' })
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response
            expect(body).toHaveProperty('message', ['Invalid password or email'])
            expect(response.status).toBe(401)
            done()
        })
    })

    
})

