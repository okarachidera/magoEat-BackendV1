/* eslint-disable no-unused-vars */
require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const auth_token = process.env.AUTH_TOKEN;
const {
    User,
    Restau,
    Repas
} = require("../models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidation = require("../validators/users.validators");
const statusCode = require("../constants/status-code");
// const request1 = require('request');
const client = require("twilio")(accountSid, auth_token);

exports.signup = (req, res) => {
    const {
        error,
        value
    } = userValidation.signupValidator.validate(req.body);
    if (!error) {
        User.findOne({
            phone: value.phone
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const user = new User({
                                username: req.body.username,
                                password: hash,
                                phone: req.body.phone,
                                avatar: req.body.avatar,
                                mail: req.body.mail,
                                msgCode: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1),
                                role: req.body.role,
                                verified: req.body.verified
                            });
                            user.save()
                                .then(user => res.status(statusCode.OK).json({
                                    success: true,
                                    user
                                }))
                                .catch((error) => res.status(statusCode.BAD_REQUEST).json({
                                    success: false,
                                    error,
                                    message: "Adresse mail ou numero de telephone deja existant, avez-vous deja un compte MAgoEat ?"
                                }));
                        })
                        .catch(error => res.status(statusCode.FORBIDDEN).json({
                            success: false,
                            error
                        }));
                } else {
                    res.status(statusCode.FORBIDDEN).json({
                        success: false,
                        message: "Vous avez déja un compte MagoEat ? Veuillez vous connecter"
                    });
                }
            })
            .catch(error => {
                res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    error,
                    message: "Une erreur s'est produite, veuillez réessayer"
                });
            });
    } else {
        res.status(statusCode.FORBIDDEN).json({
            success: false,
            message: "Vous avez entré des données invalides",
            error
        });
    }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @res.status: Boolean 
 */

exports.login = (req, res) => {
    const {
        error,
        value
    } = userValidation.loginValidator.validate(req.body);
    if (!error) {
        User.findOne({
            phone: req.body.phone
        })
            .populate("restaurants")
            .populate("orders")
            .exec((err, user) => {
                if (err) {
                    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        message: "Un probleme est survenu sur votre mot de passe, veuillez réessayer plutard",
                        error
                    });
                } else {
                    res.status(statusCode.OK).json({
                        user,
                        success: true,
                        token: jwt.sign({
                            userId: user._id
                        },
                        "RANDOM_TOKEN_SECRET", {
                            expiresIn: "48h"
                        }
                        )
                    });
                }
            });
    } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: "Veuillez remplir les bonnes informations",
                error
            });
    }
};

exports.addFavoriteRestaurant = (req, res) => {
    const {
        idUser,
        idRestau
    } = req.params;
    Restau.findById(idRestau)
        .then(restau => {
            User.findById(idUser)
                .then(user => {
                    restau.updateOne({
                        $push: {
                            featuredUsers: idUser
                        }
                    })
                        .then(() => {
                            user.updateOne({
                                $push: {
                                    favoriteRestaurants: idRestau
                                }
                            })
                                .then(() => {
                                    res.status(statusCode.OK)
                                        .json({
                                            success: true,
                                            message: "Ajouté avec succes aux favoris"
                                        });
                                }).catch((err) => {
                                    res.status(statusCode.INTERNAL_SERVER_ERROR)
                                        .json({
                                            success: false,
                                            message: "Une erreur inattendue s'est prodiuite",
                                            err
                                        });
                                });
                        }).catch((err) => {
                            res.status(statusCode.INTERNAL_SERVER_ERROR)
                                .json({
                                    success: false,
                                    message: "Une erreur inattendue s'est prodiuite",
                                    err
                                });
                        });
                })
                .catch(err => {
                    res.status(statusCode.INTERNAL_SERVER_ERROR)
                        .json({
                            success: false,
                            message: "Une erreur inattendue s'est prodiuite",
                            err
                        });
                });
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: "Une erreur inattendue s'est prodiuite",
                    err
                });
        });
};

exports.addFavoriteRepas = (req, res) => {
    const {
        idUser,
        idRepas
    } = req.params;
    Repas.findById(idRepas)
        .then(repas => {
            User.findById(idUser)
                .then(user => {
                    repas.updateOne({
                        $push: {
                            featuredUsers: idUser
                        }
                    })
                        .then(() => {
                            user.updateOne({
                                $push: {
                                    favoriteRepas: idRepas
                                }
                            })
                                .then(() => {
                                    res.status(statusCode.OK)
                                        .json({
                                            success: true,
                                            message: "Ajouté avec succes des favoris"
                                        });
                                }).catch((err) => {
                                    res.status(statusCode.INTERNAL_SERVER_ERROR)
                                        .json({
                                            success: false,
                                            message: "Une erreur inattendue s'est prodiuite",
                                            err
                                        });
                                });
                        }).catch((err) => {
                            res.status(statusCode.INTERNAL_SERVER_ERROR)
                                .json({
                                    success: false,
                                    message: "Une erreur inattendue s'est prodiuite",
                                    err
                                });
                        });
                })
                .catch(err => {
                    res.status(statusCode.INTERNAL_SERVER_ERROR)
                        .json({
                            success: false,
                            message: "Une erreur inattendue s'est prodiuite",
                            err
                        });
                });
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: "Une erreur inattendue s'est prodiuite",
                    err
                });
        });
};

exports.removeFromFavoriteRestaurants = (req, res) => {
    const {
        idUser,
        idRestau
    } = req.params;
    Restau.findById(idRestau)
        .then(restau => {
            User.findById(idUser)
                .then(user => {
                    restau.updateOne({
                        $pull: {
                            featuredUsers: req.params.idUser
                        }
                    })
                        .then(() => {
                            user.updateOne({
                                $pull: {
                                    favoriteRestaurants: idRestau
                                }
                            })
                                .then(() => {
                                    res.status(statusCode.OK)
                                        .json({
                                            success: true,
                                            message: "Retiré avec succes des favoris"
                                        });
                                }).catch((err) => {
                                    res.status(statusCode.INTERNAL_SERVER_ERROR)
                                        .json({
                                            success: false,
                                            message: "Une erreur inattendue s'est prodiuite",
                                            err
                                        });
                                });
                        }).catch((err) => {
                            res.status(statusCode.INTERNAL_SERVER_ERROR)
                                .json({
                                    success: false,
                                    message: "Une erreur inattendue s'est prodiuite",
                                    err
                                });
                        });
                })
                .catch(err => {
                    res.status(statusCode.INTERNAL_SERVER_ERROR)
                        .json({
                            success: false,
                            message: "Une erreur inattendue s'est prodiuite",
                            err
                        });
                });
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: "Une erreur inattendue s'est prodiuite",
                    err
                });
        });
};

exports.removeFromFavoriteRepas = (req, res) => {
    const {
        idUser,
        idRepas
    } = req.params;
    Restau.findById(idRepas)
        .then(repas => {
            User.findById(idUser)
                .then(user => {
                    repas.updateOne({
                        $pull: {
                            featuredUsers: idUser
                        }
                    })
                        .then(() => {
                            user.updateOne({
                                $pull: {
                                    favoriteRepas: idRepas
                                }
                            })
                                .then(() => {
                                    res.status(statusCode.OK)
                                        .json({
                                            success: true,
                                            message: "Retiré avec succes des favoris"
                                        });
                                }).catch((err) => {
                                    res.status(statusCode.INTERNAL_SERVER_ERROR)
                                        .json({
                                            success: false,
                                            message: "Une erreur inattendue s'est prodiuite",
                                            err
                                        });
                                });
                        }).catch((err) => {
                            res.status(statusCode.INTERNAL_SERVER_ERROR)
                                .json({
                                    success: false,
                                    message: "Une erreur inattendue s'est prodiuite",
                                    err
                                });
                        });
                })
                .catch(err => {
                    res.status(statusCode.INTERNAL_SERVER_ERROR)
                        .json({
                            success: false,
                            message: "Une erreur inattendue s'est prodiuite",
                            err
                        });
                });
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: "Une erreur inattendue s'est prodiuite",
                    err
                });
        });
};

/**
 * 
 * @param {Request} req
 * @param {Response} res
 */

exports.consfirmSms = (req, res) => {
    if (!req.body.msgCode) {
        res.status(400).json({
            errorMessage: "Aucune session n'est ouverte"
        });
    }
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        mail: req.body.mail,
        msgCode: req.body.msgCode,
        role: req.body.role,
        avatar: req.body.avatar
    });
    user.save()
        .then((user) => res.status(statusCode.OK).send({
            user
        }))
        .catch((error) => res.status(statusCode.FORBIDDEN).send({
            error
        }));
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.sendMsgConf = (req, res) => {
    client.messages.create({
        body: req.body.msgDetail + " " + req.body.msgCode,
        from: process.env.NUMBER,
        to: req.body.phone
    })
        .then(message => {
            res.status(statusCode.CREATED).json({
                message,
                alert: "Votre code de confirmation a été envoyé avec succes, veuillez verifier vos messages entrants",
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                role: req.body.role,
                verified: false,
                msgCode: req.body.msgCode,
                success: true,
                avatar: req.body.avatar
            });
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                alert: "Echec de confirmation du code, veuillez réessayer",
                err
            });
        });
};

/**
 * 
 * @param {*} req
 * @param {*} res
 */

exports.sendMsgToAdmins = (req, res) => {
    client.messages.create({
        from: process.env.NUMBER,
        to: req.body.phone,
        body: "Bonjour, +" + req.body.msgPhoneClient + " au pseudo " + req.body.username + " viens de passer une commande de" + req.body.quantity + " plats de " + req.body.repas + " chez " + req.body.restau
    })
        .then(message => {
            res.status(201).json({
                message,
                alert: "Votre commande a été effectuée avec succes",
                date: Date(Date.now())
            });
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                alert: "Echec de confirmation du code, veuillez réessayer",
                err
            });
        });
};

// GET logic

exports.getOwners = (req, res) => {
    User.find({
        role: "OWNER",
        verified: true
    })
        .populate("restaurants")
        .exec((err, owners) => {
            if (!err) {
                res.status(statusCode.OK)
                    .json({
                        success: true,
                        owners
                    });
            } else {
                res.status(statusCode.INTERNAL_SERVER_ERROR)
                    .json({
                        success: false,
                        err
                    });
            }
        });
};

exports.showOwner = (req, res) => {
    User.findOne({
        _id: req.params.idOwner
    }, (err, owner) => {
        if (err) {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: "Une erreur inattendue",
                    err
                });
        } else {
            owner.populate("restaurants")
                .execPopulate(() => {
                    res.status(statusCode.OK)
                        .json({
                            success: true,
                            owner
                        });
                });
        }
    });
};

exports.getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (!err) {
            res.status(statusCode.OK).json({
                users
            });
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(err);
        }
    });
};

/**
 * 
 * @param {username} req 
 * @param {message, success, err?} res 
 * @param {N/A} next 
 */

exports.getUserByUsername = (req, res) => {
    User.findOne({
        username: req.params.username
    }, (err, user) => {
        if (!err) {
            if (user) {
                res.status(statusCode.OK).json({
                    user
                });
            } else {
                res.status(401).json({
                    message: "Uilisateur introuvable"
                });
            }
        } else {
            res.send(err);
        }
    });
};

// PUT logic  

exports.updateUserInfo = (req, res) => {

};

exports.updateUserPassword = (req, res) => {
    // Validation

};