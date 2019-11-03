const { pool } = require('../../../lib/db')
const OrderModel = require('../../../lib/model/order.model')

module.exports = async function (req, res) {
    let _queries = []
    let _queryVals = []
    let _queryTxt = ''

    if (req.query.email) {
        _queries.push(`email=$${_queries.length + 1}`)
        _queryVals.push(req.query.email)
    }

    if (req.query.postcode) {
        _queries.push(`postal_code=$${_queries.length + 1}`)
        _queryVals.push(req.query.postcode)
    }

    if (req.query.city) {
        _queries.push(`city=$${_queries.length + 1}`)
        _queryVals.push(req.query.city)
    }

    if (req.query.status) {
        _queries.push(`status=$${_queries.length + 1}`)
        _queryVals.push(req.query.status)
    }

    if (_queries.length > 0) {
        _queryTxt = `WHERE ${_queries[0]}`

        for (let i = 1; i < _queries.length; i++) {
            _queryTxt += ` AND ${_queries[i]}`
        }
    }

    const _ordersDb = await pool.query(`SELECT id, customer_name, customer_surname, email, phone, address, postal_code, city, total_amount, status, created_at, updated_at FROM orders ${_queryTxt} ORDER BY id DESC`, _queryVals)
    let _orders = []

    for (let i = 0; i < _ordersDb.rows.length; i++) {
        let order = _ordersDb.rows[i]
        _orders.push(await new OrderModel(order.id, order.customer_name, order.customer_surname, order.email, order.phone, order.address, order.postal_code, order.city, order.total_amount, order.status))
    }

    res.send(global.response.success(_orders))
};