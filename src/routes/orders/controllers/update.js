const { pool } = require('../../../lib/db')
const Vars = require('../../../lib/vars')
const Order = require('../../../lib/order')

module.exports = async function (req, res) {
    const _order = await pool.query('SELECT id, status FROM orders WHERE id=$1', [req.body.order_id])

    if (_order.rows.length > 0) {
        if (_order.rows[0].status != Vars.OrderStatus.Delivered && _order.rows[0].status != Vars.OrderStatus.Cancelled) {
            const _orderID = _order.rows[0].id
            let _tasks = [...req.body.tasks]

            for (let i = 0; i < _tasks.length; i++) {
                switch (_tasks[i].task) {
                    case Vars.UpdateTask.AddProduct:
                        if (_tasks[i].product_id && _tasks[i].quantity) {
                            _tasks[i].result = {
                                status: await Order.AddProductToOrder(_orderID, _tasks[i].product_id, _tasks[i].quantity)
                            }
                        } else {
                            _tasks[i].result = {
                                status: false,
                                data: "Missing task information"
                            }
                        }
                        break;
                    case Vars.UpdateTask.ChangeProductQty:
                        if (_tasks[i].product_id && _tasks[i].quantity) {
                            _tasks[i].result = {
                                status: await Order.ChangeProductQtyInOrder(_orderID, _tasks[i].product_id, _tasks[i].quantity)
                            }
                        } else {
                            _tasks[i].result = {
                                status: false,
                                data: "Missing task information"
                            }
                        }
                        break;
                    case Vars.UpdateTask.DeleteProduct:
                        if (_tasks[i].product_id) {
                            _tasks[i].result = {
                                status: await Order.DeleteProductFromOrder(_orderID, _tasks[i].product_id)
                            }
                        } else {
                            _tasks[i].result = {
                                status: false,
                                data: "Missing task information"
                            }
                        }
                        break;
                    case Vars.UpdateTask.UpdateOrderStatus:
                        if (_tasks[i].new_status) {
                            _tasks[i].result = {
                                status: await Order.UpdateOrderStatus(_orderID, _tasks[i].new_status)
                            }

                        } else {
                            _tasks[i].result = {
                                status: false,
                                data: "Missing task information"
                            }
                        }
                        break;
                    default:
                        _tasks[i].result = {
                            status: false,
                            data: "Unknown task"
                        }
                        break;
                }
            }

            res.send(global.response.success(_tasks))
        } else {
            res.send(global.response.error("Order already completed"))
        }
    } else {
        res.send(global.response.error("No such order"))
    }
};