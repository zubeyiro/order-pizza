const Order = require('../../../lib/order')

module.exports = async function (req, res) {
    if (req.body.products.length > 0) {
        const _result = await Order.Create(req.body)

        if (_result.status) {
            res.send(global.response.success(_result.data))
        } else {
            res.send(global.response.error(_result.data))
        }
    } else {
        res.send(global.response.error("No such product"))
    }
};