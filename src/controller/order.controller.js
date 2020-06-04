const Order = require('../models/order.model')
exports.getOrdersHistory = (req, res, next) => {
    Order.find({ useranme : req.body.username })
        .then(orders => {
            if (!orders) {
                
            } 
        })
        .catch()
}