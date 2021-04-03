/* eslint-disable no-unused-vars */
const Restau = require("../models/restau.model");
const Order = require("../models/order.model");
const Repas = require("../models/repas.model");
const restauValidator = require("../validators/restau.validators");
const statusCode = require("../constants/status-code");

// The GET logics

exports.getAllRestau = (req, res) => {
    const query = {};
    Restau.find(query)
        .then(restaus => {
            res.status(201).json({
                success: true,
                restaus
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "Une erreur s'est produite",
                error
            });
        });
};

exports.getOwnerRestau = (req, res) => {
    const ownerId = req.params.restauId;
    Restau.find({ownerId})
        .then(restaurants => {
            if (!restaurants) {
                res.status(404).json({
                    success: true,
                    message: "Aucun restaurant trouvE pour cet utilisateur"
                });
            }
            res.status(201).json({
                success: true,
                message: "La liste des restaurants",
                restaurants
            });
        })
        .catch(err => {
            res.status(505).json({
                success: false,
                message: "Une erreur inattendue a ete rencontree, veuillez reesayer",
                err
            });
        });
};

exports.getFeaturedRepas = (req, res) => {
    Order.find({restauId: req.params.restauId})
        .sort()
        .limit(5)
        .then(orders => {
            if (orders) {
                res.status(statusCode.CREATED).json({
                    success: true,
                    orders
                });
            } else {
                res.status(statusCode.NOT_FOUND).json({
                    success: false,
                    message: "Les commandes sont inaccessibles"
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                message: "Une erreur inattendue s'est produite",
                err
            });
        });
};

exports.getOrderList = (req, res) => {
    // Here we have to create list of orders which belongs on a specific restaurant
    Order.find({restauId: req.params.restauId})
        .then(orders => {
            if (orders) {
                res.status(statusCode.CREATED).json({
                    success: true,
                    orders
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Les commandes sont inaccessibles"
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                message: "Une erreur inattendue s'est produite",
                err
            });
        });
};

exports.getRepasByRestau = (req, res) => {
    Repas.find({idRestau: req.params.idRestau})
        .then(repas => {
            if (repas) {
                res.status(200).json({
                    success: true,
                    repas
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Une erreur inattendue s'est produite"
                });
            }
        })
        .catch(error => {
            res.status(statusCode.FORBIDDEN).json({
                success: false,
                message: "Une erreur serveur s'est produite, rassurez-vous qu vous avez la connection internet allumée"
            });
        });
};

// The POST logics 

exports.createRestau = (req, res) => {
    const data = req.body;
    const {error, value} = restauValidator.createRestau.validate(data);
    if (!error) {
        const restau = new Restau({
            label: data.label,
            adress: data.adress,
            description: data.description,
            imgUrl: data.imgUrl,
            ownerId: data.ownerId,
            imgBrushed: data.imgBrushed,
            averageRating: 5,
            opensAt: data.opensAt,
            closeAt: data.closeAt
        });
        restau.save()
            .then(rest => {
                res.status(statusCode.OK).json({
                    rest,
                    success: true,
                    message: "Restaurant ajoutE avec succes"
                });
            })
            .catch(err => {
                res.status(statusCode.UNAUTHORIZED).json({
                    success: false,
                    message: "Quelque chose ne va pas bien avec l'envoie",
                    err
                });
            });
    } else {
        res.status(statusCode.NOT_FOUND).json({
            error,
            success: false,
            message: "Vous avez entrE des donnees invalides, veillez verifier "
        });
    }
};

exports.updateRestau = (req, res) => {
    
};