# ecommerce-cms
Membuat website untuk management content ecommerce ( dipakai oleh admin)

Ecommerce-CMS is a simple application.
Technology Includes : 
    - Express Js(Node Js Framework)
    - Object-relation-mapping : Sequelize
    - Database: Postgres
    - Token Signing/verification: JsonWebToken
    - Password Encryption: Bcrypt


Global end_points

response(500)
{
     "message": [
        "Internal server error"
    ]
}

### POST /login
> Login User

_Request Header_
``` json
{
  "no needed"
}
```

_Request Body_
``` json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "role": "<role to get insert into>"
}
```

Response :

Success: 

status : 200
``` json
{
    "acces_token" : "jwttoken"
}

Failed :

status : 404
{
    "message": [
        "Invalid password or email"
    ]
}
```
### POST /products

> Create new products

_Request Header_
``` json
{
  "access_token" : "jwttoken"
}

_Request Body_
``` json
{
  "name": "<title to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock":"<stock to get insert into>",
  "category":"<category to get insert into>"
}
```

Response :

Success: 

status : 201
``` json

{
    "id": 2,
    "name": "SkateBoard",
    "price": 1000000,
    "stock": 50,
    "category": "Hobby"
}

Failed :

status : 400 

{
    "message": "Product.stock cannot be null"
}
```

### GET /products
> Get all products

_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```

_Request Body_
``` json
{
  "no needed"
}
```

Response :

Success: 

status : 200
``` json
 {
        "id": 1,
        "name": "SkateBoard",
        "image_url": "https://images.unsplash.com/photo-1547447134-cd3f5c716030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
        "price": 1000000,
        "stock": 50,
        "category": "Hobby",
        "createdAt": "2020-08-22T22:00:38.401Z",
        "updatedAt": "2020-08-22T22:00:38.401Z"
}

Failed :

status : 400 
``` json
{
    "message": "Not Authorized"
}
```

### PUT /products/:id

> Update or replace a product by id


_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```

_Request Body_
``` json
{
    "id" : "<given id by selected>",
    "name": "<title to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock":"<stock to get insert into>",
    "category": "<category to get insert into>"
}
```

Response :

Success: 

status : 200
``` json
{
        "id": 2,
        "name": "Air Jordan 1",
        "image_url": "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
        "price": 5000000,
        "stock": 5,
        "category": "shoes",
        "createdAt": "2020-08-22T22:17:14.809Z",
        "updatedAt": "2020-08-22T22:31:39.556Z"
    }

Failed :

status : 401 
{
    "message": "Not Authorized"
}
```
### DELETE /products/:id

> Delete a product by id
_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```
_Request params_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 200
``` json
{
    "message": [
        "Successfully deleted"
    ]
}

Failed :
status : 401
``` json 

status : 401
{
    "message": "Not Authorized"
}
```
