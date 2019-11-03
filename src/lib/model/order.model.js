const { pool } = require('../db')
const OrderProductModel = require('./order.product.model')

class OrderModel {
    constructor(ID, customerName, customerSurname, email, phone, address, postalCode, city, amount, status) {
        return (async () => {
            this.ID = ID
            this.CustomerName = customerName
            this.CustomerSurname = customerSurname
            this.Email = email
            this.Phone = phone
            this.Address = address
            this.PostalCode = postalCode
            this.City = city
            this.Amount = amount
            this.Status = status
            this.Products = []

            const _productsDb = await pool.query('SELECT pz.name AS pizza_name, pp.name AS size_name, op.quantity, op.price_unit, op.price_total FROM order_products AS op INNER JOIN pizza_products AS pp ON pp.id = op.product_id INNER JOIN pizzas AS pz ON pp.pizza_id = pz.id WHERE op.order_id=$1', [this.ID])

            for (let i = 0; i < _productsDb.rows.length; i++) {
                let _product = _productsDb.rows[i]

                this.Products.push(new OrderProductModel(_product.pizza_name, _product.size_name, _product.quantity, _product.price_unit, _product.price_total))
            }

            return this;
        })();
    }
}

module.exports = OrderModel