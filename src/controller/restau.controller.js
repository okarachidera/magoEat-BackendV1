/* eslint-disable no-unused-vars */
const {Restau, Order, Repas, User} = require("../models/");
const restauValidator = require("../validators/restau.validators");
const statusCode = require("../constants/status-code");

// The GET logics

exports.getAllRestau = (req, res) => {
    const query = {};
    Restau.find(query)
        .populate("owner")
        .exec((err, restaus) => {
            if (err) {
                res.status(statusCode.INTERNAL_SERVER_ERROR)
                    .json({
                        success: false,
                        message: "Erreur inattendue",
                        err
                    });
            } else {
                res.status(statusCode.OK).json({
                    success: true,
                    restaus
                });
            }
        });
};

exports.showRestau = (req, res) => {
    Restau.findOne({ _id: req.params.restauId})
        .populate("owner")
        .exec((err, restaurant) => {
            if (err) {
                res.status(statusCode.INTERNAL_SERVER_ERROR)
                    .json({
                        success: false,
                        message: "Une erreur s'est produite, veuillez reessayer",
                        err
                    });
            } else {
                res.status(statusCode.OK)
                    .json({
                        success: true,
                        restaurant
                    });
            }
        });
};

exports.getOwnerRestau = (req, res) => {
    const ownerId = req.params.restauId;
    Restau.find({ownerId})
        .then(restaurants => {
            if (!restaurants) {
                res.status(statusCode.NO_CONTENT).json({
                    success: true,
                    message: "Aucun restaurant trouvE pour cet utilisateur"
                });
            }
            res.status(statusCode.OK).json({
                success: true,
                message: "La liste des restaurants",
                restaurants
            });
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
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
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
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
                res.status(statusCode.UNAUTHORIZED).json({
                    success: false,
                    message: "Les commandes sont inaccessibles"
                });
            }
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
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
                res.status(statusCode.OK).json({
                    success: true,
                    repas
                });
            } else {
                res.status(statusCode.NO_CONTENT).json({
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
            label: value.label,
            adress: value.adress,
            description: value.description,
            imgUrl: value.imgUrl,
            owner: value.owner,
            imgBrushed: value.imgBrushed,
            averageRate: 5,
            opensAt: value.opensAt,
            closeAt: value.closeAt
        });
        restau.save()
            .then(restaurant => {
                User.findByIdAndUpdate(
                    value.owner, {
                        $push: {
                            restaurants: restaurant._id
                        }
                    }
                )
                    .then((owner) => {
                        res.status(statusCode.OK).json({
                            restaurant,
                            success: true,
                            owner,
                            message: "Restaurant ajouté avec succes"
                        });
                    })
                    .catch((err) => {
                        res.status(statusCode.UNAUTHORIZED).json({
                            success: false,
                            message: "Erreur survenue sur l'enregistrement du proprio",
                            err
                        });
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
            message: "Vous avez entrE des données invalides, veillez verifier "
        });
    }
};

exports.updateRestau = (req, res) => {
    
};
