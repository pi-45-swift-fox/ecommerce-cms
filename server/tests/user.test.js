require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const user = {email: 'admin@mail.com', password: '1234'}

describe('POST /login success', function() {
  it('responds with json(access_token)', function(done) {
    request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json')
      .then(response => {
        const { status, body } = response
        const token = jwt.sign({email: 'admin@mail.com'}, process.env.JWT_SECRET)
        
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', token)
        done()    
      })
  });
});

describe('POST /login failed', function() {
  it('error, wrong email input', function(done) {
    request(app)
      .post('/login')
      .send({email: 'maman@mail.com', password: '1234'})
      .set('Accept', 'application/json')
      .then(response => {
        const { status, body } = response
        
        expect(status).toBe(401)
        expect(body).toBe('message: Invalid password or email')
        done();    
      })
  });

  it('error, wrong password', function(done) {
    request(app)
      .post('/login')
      .send({email: 'admin@mail.com', password: '22dmf'})
      .set('Accept', 'application/json')
      .then(response => {
        const { status, body } = response
        
        expect(status).toBe(401)
        expect(body).toBe('message: Invalid password or email')
        done();    
      })
  });
});