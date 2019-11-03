const { pool } = require('../../../lib/db')
const OrderModel = require('../../../lib/model/order.model')

module.exports = async function (req, res) {
    const _ordersDb = await pool.query('SELECT id, customer_name, customer_surname, email, phone, address, postal_code, city, total_amount, status, created_at, updated_at FROM orders WHERE id=$1', [req.params.id])
    let order = _ordersDb.rows[0]
    let _order = await new OrderModel(order.id, order.customer_name, order.customer_surname, order.email, order.phone, order.address, order.postal_code, order.city, order.total_amount, order.status)

    res.send(global.response.success(_order))
};