const ret = {
    ArrangeProducts: (products) => { // This function checks the array and merges same products to same object
        let _products = []

        function _add(data) {
            for (let i = 0; i < _products.length; i++) {
                if (_products[i].id == data.id) {
                    _products[i].quantity += data.quantity
                    return
                }
            }

            _products.push(data)
        }

        products.forEach(product => { _add(product) });

        return _products
    }
}

module.exports = ret