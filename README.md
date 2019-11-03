# Pizza Order System

## Install & Test & Run

There is an sql file on root directory, create a local PostgreSQL database and run this SQL on that. After that, change db connection informations on .env file. Database is up and ready.

Clone this repository then;

```
npm install
```

For running tests;

```
npm test
```

For running application;

```
npm start
```

or

```
node src/index.js
```

There is also Dockerfile included.

## Endpoints

```
/orders (POST) - Create new order
/orders (GET) - List orders
/orders/:id (GET) - Get specified order
/orders (PUT) - Update existing order
/orders/:id (DELETE) - Delete specified order
```

### 1. Create Order
**URL**
`POST` /orders

**Request Body**

```
{
	"customer": {
		"name": "Zubeyir",
		"surname": "OZTURK",
		"email": "zubeyrozturk@gmail.com",
		"phone": "123454677"
	},
	"address": {
		"address": "Schafferstr 34",
		"postal_code": "59174",
		"city": "Kamen"
	},
	"products": [
		{
      "id": 4, // id from pizza_products table
      "quantity": 1
		},
		{
      "id": 2,
      "quantity": 1
		},
		{
      "id": 2,
      "quantity": 1
		}
	]
}
```

**Success Response:**

```
{
  status: true,
  data: ORDER_ID // Created order id
}
```
 
**Error Response:**

```
{
  status: false,
  err: "" // any, object or string, contains error message
}
```

### 2. List Orders
**URL**
`GET` /orders

**Filtering:**
You can make the filtering by querystring parameters below;

```
/orders?email=[CUSTOMER_EMAIL]&postcode=[POSTAL_CODE]&city=[CITY]&status=[ORDER_STATUS]
```

**Success Response:**

```
{
    "status": true,
    "data": [ // array of orders
        {
            "ID": 22,
            "CustomerName": "Zubeyir",
            "CustomerSurname": "OZTURK",
            "Email": "zubeyrozturk@gmail.com",
            "Phone": "123454677",
            "Address": "Schafferstr 34",
            "PostalCode": "59174",
            "City": "Kamen",
            "Amount": 15.98,
            "Status": "created",
            "Products": [
                {
                    "PizzaName": "Margarita",
                    "SizeName": "Medium",
                    "Quantity": 2,
                    "UnitPrice": 7.99,
                    "TotalPrice": 15.98
                }
            ]
        },
        ...
    ]
}
```
 
**Error Response:**

```
{
  status: false,
  err: "" // any, object or string, contains error message
}
```

### 3. Get Order
**URL**
`GET` /orders/:id (id for requested order)

**Success Response:**

```
{
    "status": true,
    "data": 
        {
            "ID": 22,
            "CustomerName": "Zubeyir",
            "CustomerSurname": "OZTURK",
            "Email": "zubeyrozturk@gmail.com",
            "Phone": "123454677",
            "Address": "Schafferstr 34",
            "PostalCode": "59174",
            "City": "Kamen",
            "Amount": 15.98,
            "Status": "created",
            "Products": [
                {
                    "PizzaName": "Margarita",
                    "SizeName": "Medium",
                    "Quantity": 2,
                    "UnitPrice": 7.99,
                    "TotalPrice": 15.98
                }
            ]
        }
}
```
 
**Error Response:**

```
{
  status: false,
  err: "" // any, object or string, contains error message
}
```

### 4. Update Order
**URL**
`PUT` /orders

**Request Body**

```
{
	order_id: 23,
  tasks: [ // tasks that will be executed
    {// update order status
      task: "status_update",
			new_status: "delivered" // available statuses: preparing, shipping, delivered, cancelled
    },
    { // add new product to order
      task: "add",
      product_id: 1,
      quantity: 1
    },
    { // change product quantity
      task: "change_qty",
      product_id: 1,
      quantity: 2
    },
    { // delete product from order
      task: "delete",
      product_id: 1
    }
  ]
}
```

**Task Description**

There can be 4 different update tasks that you can send for order update.

```
add: For adding new product to order, it should also have product_id and quantity properties
change_qty: For changing product count for the order, it should come with product_id and quantity(represents new quantity) properties
delete: For deleting product from order, it should come with product_id property
status_update: For changing status of the order, it should come with new_status property which can be: preparing, shipping, delivered or cancelled.
```

**Success Response:**

```
{
  status: true,
  data: [ // All tasks return with their results
    {
      task: "status_update",
			new_status: "delivered",
      result: {
          status: true
      }
    },
    {
      task: "add",
      product_id: 1,
      quantity: 1,
      result: {
          status: true
      }
    },
    {
      task: "change_qty",
      product_id: 1,
      quantity: 2,
      result: {
          status: true
      }
    },
    {
      task: "delete",
      result: {
          status: false,
          data: ""
      }
    }
  ]
}
```
 
**Error Response:**

```
{
  status: false,
  err: "" // any, object or string, contains error message
}
```

### 5. Delete Order
**URL**
`DELETE` /orders/:id (id for requested order)

**Success Response:**

```
{
    "status": true,
    "data": null
}
```
 
**Error Response:**

```
{
  status: false,
  err: "" // any, object or string, contains error message
}
```