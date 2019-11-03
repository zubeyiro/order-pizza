let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/index');
let should = chai.should();

chai.use(chaiHttp);

describe('Tests', () => {
    describe('/ -> Http', () => {
        it('should be running', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('status', true)
                    done()
                })
        })
    })

    let _orderID = 0 // for future checks

    describe('/orders -> Orders', () => {
        describe('/ -> Create', () => {
            it('should create new order with 2 order products', (done) => {
                chai.request(server)
                    .post('/orders')
                    .send({
                        customer: {
                            name: "Zubeyir",
                            surname: "OZTURK",
                            email: "zubeyrozturk@gmail.com",
                            phone: "123454677"
                        },
                        address: {
                            address: "Schafferstr 34",
                            postal_code: "59174",
                            city: "Kamen"
                        },
                        products: [
                            {
                                id: 4,
                                quantity: 1
                            },
                            {
                                id: 4,
                                quantity: 2
                            },
                            {
                                id: 1,
                                quantity: 1
                            }
                        ]
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.have.property('status', true)
                        res.body.should.have.property('data')
                        _orderID = res.body.data
                        done()
                    })
            })
        })

        describe('/:id -> Get recently created order', () => {
            it('should get our recently created order', (done) => {
                chai.request(server)
                    .get(`/orders/${_orderID}`)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.have.property('status', true)
                        res.body.data.should.have.property('ID')
                        res.body.data.ID.should.equal(_orderID)
                        done()
                    })
            })
        })
    })
})