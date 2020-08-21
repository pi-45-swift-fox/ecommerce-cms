# ecommerce-cms
Membuat website untuk management content ecommerce ( dipakai oleh admin)

# Guide
## Endpoints
### POST `/login`
##### Mendapatkan akses (token) user dalam database

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    "email": "Input email user",
    "password": "Input password user"
>

#### Response (200)
>
    "token": "Token User untuk access ke server"
 >
 
#### Response (401)
>
    "msg": "Incorrect email/password"
>

### GET `/products`
##### Mendapatkan seluruh products dalam database

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    _Tidak diperlukan_
>

#### Response (200)
>
    "products": "{[ name, image_url, price, stock ]}"
 >
 
#### Response (500)
>
    "msg": "Internal server error"
>

### POST `/products`
##### Menambahkan product baru ke database (access level: admin)

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "name": "Product title",
    "image_url": "Product image",
    "price": "Product price",
    "stock": "Product stock"
>

#### Response (201)
>
    "id": "Task serialized ID",
    "name": "Product title",
    "image_url": "Product image",
    "price": "Product price",
    "stock": "Product stock",
    "createdAt": "Current Date",
    "updatedAt": "Current Date"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (403)
>
    "msg": "Access denied"
>

### PUT `/products/id`
##### Mengedit product di database

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "name": "Product title",
    "image_url": "Product image",
    "price": "Product price",
    "stock": "Product stock"
>

#### Response (201)
>
    "msg": "OK"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (403)
>
    "msg": "Access denied"
>

#### Response (404)
>
    "msg": "Product tidak ditemukan"
>

### DELETE `/products/id`
##### Menghapus product di database

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    _Tidak Perlu_
>

#### Response (200)
>
    "msg": "OK"
>

#### Response (403)
>
    "msg": "Access denied"
>
