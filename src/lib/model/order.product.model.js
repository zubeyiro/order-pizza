class OrderProductModel {
    constructor(pizzaName, sizeName, quantity, unitPrice, totalPrice) {
        this.PizzaName = pizzaName
        this.SizeName = sizeName
        this.Quantity = quantity
        this.UnitPrice = unitPrice
        this.TotalPrice = totalPrice
    }
}

module.exports = OrderProductModel