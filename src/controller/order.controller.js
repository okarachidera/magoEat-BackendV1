const Order = require('../models/order.model');
const Repas = require('../models/repas.model');
const orderValidator = require('../validators/order.validators');
// For get routes

exports.getOrdersHistory = (req, res) => {
    Order.find({ idUser : req.params.idUser })
        .then(orders => {
            if (!orders) {
                res.status(400).json({ message : 'Quelque chose ne va pas, rassurez-vous d\'etre connecte' })
            }
            if (orders.length == 0) {
                res.status(400).json({ message : 'Il y a aucune commancde dans votre historique' })
            } else {
                res.status(200).json({ 
                    orders
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error
            })
        })
}

exports.getAllOrders = (req, res) => {
    const filter = {}
    Order.find(filter)
        .then(orders => {
            res.status(201).json({
                success: true,
                orders
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: 'Une erreur s\'est produite',
                error
            })
        })
}

// For post routes

exports.rateOrder = (req, res) => {
    /**
     * First check if request is valid 
     */
    const {error, value} = orderValidator.rateOrder.validate(req.body)

    if (!error) {
        /**
     * Then we check if the order exists. Finding it in the model
     */
        Order.findOne({ _id : req.params.id })
            .then(order => {
                if (!order) {
                    res.status(400).json({ errorMessage : 'Erreur, cette commande n\'existe pas '})
                }
                /**
                 * Then we check if its ratable field is true
                 */
                if (!order.ratable) {
                    res.status(400).json({ errorMessage : 'Cette commande ne peut être cotée pour l\'instant'})
                }
                /**
                 * Then we can update its rate and its ratable fields
                 */
                Order.updateOne({ id_ : req.body.id }, { ratable: false , rate: req.body.rate })
                    .then(orderUpdated => {
                        /**
                         * Let's check if the response is not empty
                         */
                        if (!orderUpdated) {
                            /**
                             * Need to update the specific average rate of the repas before sending a response
                             */
                            let newAvgRates  = [req.body.rate];
                            Repas.findOne({_id: req.body.idPlat})
                                .then(repas => {
                                    if (repas) {
                                        newAvgRates.concat(repas.averageRate);
                                        Repas.updateOne({_id: req.body.idPlat}, {averageRate: newAvgRates})
                                            .then(repasUp => {
                                                if (repasUp) {
                                                    res.status(201).json({
                                                        success: true,
                                                        message: 'Merci de votre cotation',
                                                        repasUp,
                                                        orderUpdated
                                                    })
                                                } else {
                                                    res.status(400).json({
                                                        success: false,
                                                        message: 'Cotation en souffrance'
                                                    })
                                                }
                                            })
                                            .catch(err => {
                                                res.status(400).json({
                                                    success: false,
                                                    message: 'Une erreur inatendue',
                                                    err
                                                })
                                            })
                                    } else {
                                        res.status(400).json({
                                            success: false,
                                            message: 'Une erreur constatée',
                                            repas // for debugging
                                        })
                                    }
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        success: false,
                                        message: 'Une erreur s\'est produite, veuilleez réessayer plus tard',
                                        err // for debugging
                                    })
                                })
                            res.status(400).json({ 
                                success: false,
                                errorMessage : 'Erreur de mise a jour de votre cotaton'
                            })
                        }
                    })
                    .catch(error => {
                        res.status(400).json({
                            success: false,
                            message: 'Echec',
                            error
                        })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        res.status(404).json({
            success: false,
            message: 'Veuillez entrer des données valides',
            error
        })
    }
}

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
            idRestaurant: data.idRestau,
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
    // First we validate date 
    const data = req.body;
    const {error, value} = orderValidator.cancelOrder.validate(data);
    if (!error) {

    } else {
        res.status(500).json({
           message: 'Une erreur s\'est produite lors de l\'analyse de vos donnees',
           success: false
        })
    }
}

exports.closeOrder = (req, res) => {
    const {error, value} = orderValidator.closeOrder.validate(req.body);
    if (!error) {
        Order.update(
            {_id: req.params.id},
            {
                feedback: value.feedback,
                rate: value.rate
            }
        )
            .then(updatedOrder => {
                res.status(201).json({
                    success: true,
                    message: 'Merci de votre confiance, votre commande a ete cloturee',
                    updatedOrder
                })
            })
            .catch(error => {
                res.status(505).json({
                    success: false,
                    error,
                    message: 'Echec de confirmation'
                })
            })
    } else {
        res.status(500).json({
            error,
            success: false,
            message: 'Vous avez entrE des donnEes incorrectes'
        })
    }
}

exports.updateStatus = (req, res) => {
    const {error, value} = orderValidator.updateStatus.validate(req.body);
    if (!error) {
        Order.update(
            {_id: req.params.id},
            {status: value.status}
        )
            .then(updatedOrder => {
                res.status(200).json({
                    success: true,
                    updatedOrder,
                    message: 'Status updated successfully'
                })
            })
            .catch(error => {
                res.status(505).json({
                    success: false,
                    error,
                    message: 'Une erreur sest produite'
                })
            })
    } else {
        res.status(404).json({
            success: false,
            message: 'Echec de mise a jour de la commande'
        })
    }
}