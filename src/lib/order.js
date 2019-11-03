const { pool } = require('./db')
const Vars = require('./vars')
const Utils = require('./utils')

const ret = {
    Create: async (orderData) => {
        const client = await pool.connect()

        try {
            await client.query('BEGIN')
            const _saveOrder = await client.query('INSERT INTO orders (customer_name, customer_surname, email, phone, address, postal_code, city, total_amount, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id', [orderData.customer.name, orderData.customer.surname, orderData.customer.email, orderData.customer.phone, orderData.address.address, orderData.address.postal_code, orderData.address.city, 0, Vars.OrderStatus.Created, new Date()])

            let _products = Utils.ArrangeProducts(orderData.products)

            let _insertedProductCount = 0
            let _totalAmount = 0

            for (let i = 0; i < _products.length; i++) {
                let _productResult = await client.query('SELECT price FROM pizza_products WHERE id=$1 AND is_active=true', [_products[i].id])

                if (_productResult.rows.length > 0) {
                    _totalAmount += _products[i].quantity * _productResult.rows[0].price

                    await client.query('INSERT INTO order_products (order_id, product_id, quantity, price_unit, price_total, created_at) VALUES ($1, $2, $3, $4, $5, $6)', [_saveOrder.rows[0].id, _products[i].id, _products[i].quantity, _productResult.rows[0].price, (_products[i].quantity * _productResult.rows[0].price), new Date()])

                    _insertedProductCount++
                }
            }

            if (_insertedProductCount > 0) {
                await client.query('UPDATE orders SET total_amount=$1 WHERE id=$2', [_totalAmount, _saveOrder.rows[0].id])
                await client.query('COMMIT')

                return {
                    status: true,
                    data: _saveOrder.rows[0].id
                }
            } else {
                await client.query('ROLLBACK')

                return {
                    status: false,
                    data: 'No such product'
                }
            }
        } catch (e) {
            await client.query('ROLLBACK')

            return {
                status: false,
                data: e
            }
        } finally {
            client.release()
        }
    },
    AddProductToOrder: async (orderID, productID, quantity) => {
        const client = await pool.connect()

        try {
            await client.query('BEGIN')

            let _existingProduct = await client.query('SELECT quantity FROM order_products WHERE order_id=$1 AND product_id=$2', [orderID, productID])

            if (_existingProduct.rows.length > 0) { // If product already exists, call change quantity function
                let _newQty = _existingProduct.rows[0].quantity + quantity

                return await ret.ChangeProductQtyInOrder(orderID, productID, _newQty)
            } else {
                let _product = await client.query('SELECT price FROM pizza_products WHERE id=$1 AND is_active=true', [productID])

                if (_product.rows.length > 0) {
                    await client.query('INSERT INTO order_products (order_id, product_id, quantity, price_unit, price_total, created_at) VALUES ($1, $2, $3, $4, $5, $6)', [orderID, productID, quantity, _product.rows[0].price, (quantity * _product.rows[0].price), new Date()])

                    // Update order total amount
                    let _allProducts = await client.query('SELECT price_total FROM order_products WHERE order_id=$1', [orderID])
                    let _totalAmount = 0

                    _allProducts.rows.forEach(product => {
                        _totalAmount += product.price_total
                    })

                    await client.query('UPDATE orders SET total_amount=$1, updated_at=$2 WHERE id=$3', [_totalAmount, new Date(), orderID])
                    // Update order total amount
                    await client.query('COMMIT')

                    return true
                } else {
                    await client.query('ROLLBACK')

                    return false
                }
            }
        } catch (e) {
            await client.query('ROLLBACK')

            return false
        } finally {
            client.release()
        }
    },
    ChangeProductQtyInOrder: async (orderID, productID, newQuantity) => {
        const client = await pool.connect()

        try {
            await client.query('BEGIN')

            let _existingProduct = await client.query('SELECT id FROM order_products WHERE order_id=$1 AND product_id=$2', [orderID, productID])

            if (_existingProduct.rows.length > 0) {
                let _product = await client.query('SELECT price FROM pizza_products WHERE id=$1 AND is_active=true', [productID])

                if (_product.rows.length > 0) {
                    await client.query('UPDATE order_products SET quantity=$1, price_unit=$2, price_total=$3, updated_at=$4 WHERE id=$5', [newQuantity, _product.rows[0].price, (_product.rows[0].price * newQuantity), new Date(), _existingProduct.rows[0].id])

                    // Update order total amount
                    let _allProducts = await client.query('SELECT price_total FROM order_products WHERE order_id=$1', [orderID])
                    let _totalAmount = 0

                    _allProducts.rows.forEach(product => {
                        _totalAmount += product.price_total
                    })

                    await client.query('UPDATE orders SET total_amount=$1, updated_at=$2 WHERE id=$3', [_totalAmount, new Date(), orderID])
                    // Update order total amount
                    await client.query('COMMIT')

                    return true
                } else {
                    await client.query('ROLLBACK')

                    return false
                }
            } else {
                await client.query('ROLLBACK')

                return false
            }
        } catch (e) {
            await client.query('ROLLBACK')

            return false
        } finally {
            client.release()
        }
    },
    DeleteProductFromOrder: async (orderID, productID) => {
        const client = await pool.connect()

        try {
            await client.query('BEGIN')

            let _existingProduct = await client.query('SELECT id FROM order_products WHERE order_id=$1 AND product_id=$2', [orderID, productID])

            if (_existingProduct.rows.length > 0) {
                await client.query('DELETE FROM order_products WHERE id=$1', [_existingProduct.rows[0].id])

                // Update order total amount
                let _allProducts = await client.query('SELECT price_total FROM order_products WHERE order_id=$1', [orderID])
                let _totalAmount = 0

                _allProducts.rows.forEach(product => {
                    _totalAmount += product.price_total
                })

                await client.query('UPDATE orders SET total_amount=$1, updated_at=$2 WHERE id=$3', [_totalAmount, new Date(), orderID])
                // Update order total amount
                await client.query('COMMIT')

                return true
            } else {
                await client.query('ROLLBACK')

                return false
            }
        } catch (e) {
            await client.query('ROLLBACK')

            return false
        } finally {
            client.release()
        }
    },
    UpdateOrderStatus: async (orderID, newStatus) => {
        try {
            await pool.query('UPDATE orders SET status=$1, updated_at=$2 WHERE id=$3', [newStatus, new Date(), orderID])

            return true
        } catch{
            return false
        }
    }
}

module.exports = ret