const Order = require('../models/order.model');
const orderValidator = require('../validators/order.validators');
// For get routes

exports.getOrdersHistory = (req, res, next) => {
    Order.find({ idUser : req.body.idUser })
        .then(orders => {
            if (!orders) {
                res.status(400).json({ message : 'Aucun article dans votre historique' })
            }
            res.status(200).json({ orders })
        })
        .catch(error => {
            console.log(error)
        })
}

// For post routes

// exports.rateOrder = (req, res, next) => {
//     /**
//      * First we check if the order exists.Finding it in the model
//      */
//     Order.findOne({ id_ : req.params.id })
//         .then(order => {
//             if (!order) {
//                 res.status(400).json({ errorMessage : 'Erreur, cet article n\'existe pas '})
//             }
//             /**
//              * Then we check if its ratable field is true
//              */
//             if (!order.ratable) {
//                 res.status(400).json({ errorMessage : 'Cette commande ne peut etre cotee maintenant'})
//             }
//             /**
//              * Then we can update its rate and its ratable fields
//              */
//             Order.updateOne({ id_ : req.body.id }, { ratable : false , rate : req.body.rate })
//                 .then(orderUpdated => {
//                     /**
//                      * Let's check if the response is not empty
//                      */
//                     if (!orderUpdated) {
//                         res.status(400).json({ errorMessage : 'Erreur de mise a jour de votre cotaton'})
//                     }
//                     res.status(200).json({ orderUpdated })
//                 })
//                 .catch(error => {
//                     console.log(error)
//                 })
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }

exports.placeOrder = (req, res) => {
    // First, let's validate the request
    const data = req.body
    const {error, value} = orderValidator.placeOrder.validate(data);
    if (!error) {
        // Next, create a new order with entered data
        const order = new Order ({
            idUser: data.idUser,
            date: Date(Date.now()),
            platId: data.platId,
            ratable: true,
            amount: data.amount,
            devise: data.devise,
            status: "PLACED"
        })
        order.save()
            .then(odr => {
                res.status(200).json({
                    success: true,
                    message: 'Votre commande a ete effectué avec succes, en cours de traitement',
                    odr
                })
            })
            .catch(error => {
                res.status(400).json({
                    success: false,
                    message: 'Quelque chose ne va pas dans votre requete, veuillez ressayer plustard',
                    error
                })
            })
    } else {
        res.status(404).json({
            success: false,
            message: 'Données invalides',
            error
        })
    }
}

exports.cancelOrder = (req,res) => {

}

exports.closeOrder = (req, res) => {

}

exports.updateStatus = (req, res) => {

}