const { pool } = require('../../../lib/db')
const Order = require('../../../lib/order')
const Vars = require('../../../lib/vars')

module.exports = async function (req, res) {
    const _order = await pool.query('SELECT id, status FROM orders WHERE id=$1', [req.params.id])

    if (_order.rows.length > 0) {
        if (_order.rows[0].status != Vars.OrderStatus.Delivered && _order.rows[0].status != Vars.OrderStatus.Cancelled) {
            const _result = Order.UpdateOrderStatus(req.params.id, Vars.OrderStatus.Cancelled)

            if (_result) {
                res.send(global.response.success())
            } else {
                res.send(global.response.error())
            }
        } else {
            res.send(global.response.error("Order already completed"))
        }
    } else {
        res.send(global.response.error("No such order"))
    }
};