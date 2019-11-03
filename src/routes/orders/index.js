const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({})
const Vars = require('../../lib/vars')

router.use(function (req, res, next) {
    next();
});

let _validatorCreate = Joi.object({
    customer: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        surname: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(3).max(50).required(),
        phone: Joi.string().min(3).max(25).required()
    }),
    address: Joi.object({
        address: Joi.string().min(3).max(50).required(),
        postal_code: Joi.string().min(3).max(20).required(),
        city: Joi.string().min(3).max(30).required()
    }),
    products: Joi.array().items(Joi.object().keys({
        id: Joi.number().min(1).required(),
        quantity: Joi.number().min(1).required()
    }))
})

let _validatorUpdate = Joi.object({
    order_id: Joi.number().min(1).required(),
    tasks: Joi.array().items(Joi.object().keys({
        task: Joi.string().valid(Vars.UpdateTask.AddProduct, Vars.UpdateTask.ChangeProductQty, Vars.UpdateTask.DeleteProduct, Vars.UpdateTask.UpdateOrderStatus).required(),
        product_id: Joi.number().min(1),
        quantity: Joi.number().min(1),
        new_status: Joi.string().valid(Vars.OrderStatus.Preparing, Vars.OrderStatus.Shipping, Vars.OrderStatus.Delivered, Vars.OrderStatus.Cancelled)
    }))
})

let _validatorListFilter = Joi.object({
    email: Joi.string().email(),
    postcode: Joi.string().min(3).max(20),
    city: Joi.string().min(3).max(30),
    status: Joi.string().valid(Vars.OrderStatus.Created, Vars.OrderStatus.Preparing, Vars.OrderStatus.Shipping, Vars.OrderStatus.Delivered, Vars.OrderStatus.Cancelled)
})

router.post('/', validator.body(_validatorCreate), require('./controllers/create'))
router.put('/:id', validator.body(_validatorUpdate), require('./controllers/update'))
router.delete('/:id', validator.params(Joi.object({
    id: Joi.number().min(1).required()
})), require('./controllers/remove'))
router.get('/', validator.query(_validatorListFilter), require('./controllers/list'))
router.get('/:id', validator.params(Joi.object({
    id: Joi.number().min(1).required()
})), require('./controllers/get'))

module.exports = router;