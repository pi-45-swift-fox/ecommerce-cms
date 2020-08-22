
# ecommerce-cms
Membuat website untuk management content ecommerce ( dipakai oleh admin)

ecommerce-cms is an application to management content ecommerce. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Technology Includes : 
    - Express Js(Node Js Framework)
    - Object-relation-mapping : Sequelize
    - Database: Postgres
    - Token Signing/verification: Json Web Token
    - Password Encryption: Bcrypt

## RESTful endpoints
### POST /login
### POST /products
### GET /products
### PUT /products/:id
### DELETE /products/:id

Global endpoints

response(500 - Server Internal Error)
``` json 
{
    "message" : "Invalid Server"
}
```

### POST /login
> Login User

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "email": "<admin email to get insert into>",
  "password": "<admin password to get insert into>"
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
  "message": "Invalid Request"
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
  "image_url": "<category to get insert into>",
  "price": "<price to get insert into>",
  "stock":"<price to get insert into>"
}
```

Response :

Success: 

status : 201
``` json

{
    "id": "<given id by system>",
    "name": "<title to get insert into>",
    "image_url": "<category to get insert into>",
    "price": "<price to get insert into>",
    "stock":"<price to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
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
  "not needed"
}
```

Response :

Success: 

status : 200
``` json
{
    "id": "<given id by system>",
    "name": "<title to get insert into>",
    "image_url": "<category to get insert into>",
    "price": "<price to get insert into>",
    "stock":"<price to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
``` json
{
  "message": "Invalid Request"
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
    "image_url": "<category to get insert into>",
    "price": "<price to get insert into>",
    "stock":"<price to get insert into>",
}
```

Response :

Success: 

status : 201
``` json
{
    "id": "<given id by system>",
    "name": "<title to get insert into>",
    "image_url": "<category to get insert into>",
    "price": "<price to get insert into>",
    "stock":"<price to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
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
  "message": "Sukses Delete"
}

Failed :
status : 401
``` json 

status : 404
{
  "message": "Error Not Found"
}
```





