### 产品列表接口

#### 获取产品列表 (GET)

**Endpoint:**

```
http://localhost:8000/api/products/
```

**请求头 (Headers):**

- `Authorization` (字符串): `Bearer f7ee19f41e81d66e08a4f919...`.

> 此处为用户Token

**请求参数:**

- 无

**响应示例:**

```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "owner": {
        "username": "mike",
        "id": "1"
      },
      "url": "http://localhost:8000/api/products/1/",
      "edit_url": "http://localhost:8000/api/products/1/update/",
      "pk": 1,
      "name": "p1",
      "description": null,
      "sku": "SKU-20240122135410",
      "image": null,
      "price": null,
      "discount_price": null,
      "is_discounted": false,
      "stock_quantity": 0,
      "is_in_stock": true,
      "categories": [],
      "created_at": "2024-01-22T13:54:10.920182Z",
      "updated_at": "2024-01-22T13:54:10.920227Z",
      "attributes": [],
      "supplier": null,
      "weight": null,
      "dimensions": null,
      "other_products": [
        {
          "url": "http://localhost:8000/api/products/1/",
          "name": "p1"
        },
        {
          "url": "http://localhost:8000/api/products/3/",
          "name": "p2"
        }
      ]
    },
    {
      "owner": {
        "username": "mike",
        "id": "1"
      },
      "url": "http://localhost:8000/api/products/3/",
      "edit_url": "http://localhost:8000/api/products/3/update/",
      "pk": 3,
      "name": "p2",
      "description": null,
      "sku": "SKU-20240125020650",
      "image": null,
      "price": null,
      "discount_price": null,
      "is_discounted": false,
      "stock_quantity": 0,
      "is_in_stock": true,
      "categories": [],
      "created_at": "2024-01-25T02:06:50.450995Z",
      "updated_at": "2024-01-25T02:06:50.451031Z",
      "attributes": [],
      "supplier": null,
      "weight": null,
      "dimensions": null,
      "other_products": [
        {
          "url": "http://localhost:8000/api/products/1/",
          "name": "p1"
        },
        {
          "url": "http://localhost:8000/api/products/3/",
          "name": "p2"
        }
      ]
    }
  ]
}
```

### 用户认证接口

#### 创建令牌 (POST)

**Endpoint:**

```
http://localhost:8000/api/auth/
```

**请求参数:**

- `username` (字符串): 用户名
- `password` (字符串): 密码

**请求示例:**

```json
{
  "username": "mike",
  "password": "070011"
}
```

**响应示例:**

```json
{
  "token": "f7ee19f41e81d66e08a4f9192f6f1b1103842af2"
}
```
