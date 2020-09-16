const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');

const userLogin = {
  email: "admin@email.com",
  password: "1234"
};

const userLoginEmptyEmail = {
  email: "",
  password: "1234"
};

const userLoginEmptyPassword = {
  email: "admin@email.com",
  password: ""
};

describe('Login Admin Testing', function() {

  describe("Admin success login", () => {
    test('successfully login with admin role', (done) => {
      request(app)
      .post('/login')
      .send(userLogin)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;
        const dataUser = jwt.verify(body.access_token, process.env.JWT_SECRET);

        expect(body.access_token).not.toBeFalsy();
        expect(dataUser.email).toEqual(userLogin.email);
        expect(dataUser.role).toEqual('admin');
        expect(status).toBe(200);

        done();
      })
      .catch(done);
    })
  });

  describe("Admin fail login with empty email", () => {
    test('failed login without email', (done) => {
      request(app)
      .post('/login')
      .send(userLoginEmptyEmail)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(body.message).toEqual("there is no user with that email");
        expect(status).toBe(404);
        done();
      })
      .catch(done);
    })
  });

  describe("Admin fail login with empty password", () => {
    test('failed login without password', (done) => {
      request(app)
      .post('/login')
      .send(userLoginEmptyPassword)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(body.message).toEqual("username or password is wrong");
        expect(status).toBe(401);
        done();
      })
      .catch(done);
    })
  });

});
