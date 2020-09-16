const app = require('../app.js');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let productId;

let access_token;
const fake_token = 'iiwdiwndwdnawdpwonwd';
const empty_token = '';

const product = {
  name: 'sepatu',
  image_url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  price: 10000,
  stock: 15
}

const productEmptyPrice = {
  name: 'sepatu',
  image_url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  price: -1,
  stock: 15
}

const productWrongPrice = {
  name: 'sepatu',
  image_url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  price: 'testing',
  stock: 15
}

const productEmptyStock = {
  name: 'sepatu',
  image_url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  price: 10000,
  stock: -1
}

const productWrongStock = {
  name: 'sepatu',
  image_url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  price: 10000,
  stock: 'testing'
}

const productEmptyName = {
  name: '',
  image_url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  price: 10000,
  stock: 15
}

const updateProduct = {
  name: 'kaos',
  image_url: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  price: 5000,
  stock: 80
}

beforeAll(done => {
  request(app)
  .post('/login')
  .send({email: "admin@email.com", password: '1234'})
  .expect('Content-Type', /json/)
  .then(response => {
    const { status, body } = response;
    access_token = body.access_token;

    done();
  })
  .catch(err => console.log(err));
})

afterAll(done => {
  queryInterface.bulkDelete('Products', null, {});
  done();
})

describe("POST /products", () => {

  describe("Success post products" , () => {
    test('success register new product to db', (done) => {
      request(app)
      .post('/products')
      .send(product)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('image_url');
        expect(body).toHaveProperty('price');
        expect(body).toHaveProperty('stock');

        done();
      })
      .catch(done)
    })
  })

  describe("Failed post products with negative price" , () => {
    test('failed add new product with negative price', (done) => {
      request(app)
      .post('/products')
      .send(productEmptyPrice)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body.message).toEqual("price or stock must not be less than 0");

        done();
      })
      .catch(done)
    })
  })

  describe("failed post products with negative stock" , () => {
    test('failed add new product with negatice stock', (done) => {
      request(app)
      .post('/products')
      .send(productEmptyStock)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body.message).toEqual("price or stock must not be less than 0");

        done();
      })
      .catch(done)
    })
  })

  describe("failed post products with empty name" , () => {
    test('failed add new product with empty name', (done) => {
      request(app)
      .post('/products')
      .send(productEmptyName)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body.message).toEqual("name must not be empty");

        done();
      })
      .catch(done)
    })
  })

  describe("failed post products with price is not an integer" , () => {
    test('failed add new product with price is not an integer', (done) => {
      request(app)
      .post('/products')
      .send(productWrongPrice)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body.message).toEqual("price must be an integer");

        done();
      })
      .catch(done)
    })
  })

  describe("failed post products with stock is not an integer" , () => {
    test('failed add new product with stock is not an integer', (done) => {
      request(app)
      .post('/products')
      .send(productWrongStock)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body.message).toEqual("stock must be an integer");

        done();
      })
      .catch(done)
    })
  })
})

describe("GET /products", () => {

  describe("Success get all products", () => {
    test('success to get all of product from db', done => {
      request(app)
      .get('/products')
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Array));

        productId = body[0].id;
        done();
      })
      .catch(done);
    })
  })
})

describe("PUT /products", () => {

  describe("Success updating products", () => {
    test("success to update product", done => {
      request(app)
      .put(`/products/${productId}`)
      .send(updateProduct)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('image_url');
        expect(body).toHaveProperty('price');
        expect(body).toHaveProperty('stock');
        done();
      })
    })
  })

  describe("Failed updating products", () => {
    test("Failed to update product with not existing id", done => {
      request(app)
      .put(`/products/69420`)
      .send(updateProduct)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(404);
        expect(body.message).toEqual("product with such id is not found")
        done();
      })
    })
  })
})

describe("DELETE /products", () => {

  describe("Success deleting products", () => {
    test("success to delete product", done => {
      request(app)
      .delete(`/products/${productId}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('image_url');
        expect(body).toHaveProperty('price');
        expect(body).toHaveProperty('stock');
        done();
      })
    })
  })

  describe("Failed deleting products", () => {
    test("Failed to delete product with not existing id", done => {
      request(app)
      .delete(`/products/69420`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;

        expect(status).toBe(404);
        expect(body.message).toEqual("product with such id is not found")
        done();
      })
    })
  })
})
