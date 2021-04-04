/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const auth_token = process.env.AUTH_TOKEN;
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidation = require("../validators/users.validators");
const statusCode = require("../constants/status-code");
// const request1 = require('request');
const client = require("twilio")(accountSid, auth_token);

exports.signup = (req, res) => {
    const {error, value} = userValidation.signupValidator.validate(req.body);
    if (!error) {
        // All the data put inside fit the requirements
        User.findOne({phone: value.phone})
            .then(user => {
                if (!user) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const user = new User ({
                                username : req.body.username,
                                password : hash,
                                phone : req.body.phone,
                                avatar: req.body.avatar,
                                mail : req.body.mail,
                                msgCode : Math.floor(Math.random()*999)+1000,
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
                                    message : "Adresse mail ou numero de telephone deja existant, avez-vous deja un compte MAgoEat ?" 
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
    const {error, value} = userValidation.loginValidator.validate(req.body);
    if (!error) {
        User.findOne({phone : req.body.phone})
            .then(user => {
                if (!user) {
                    res.status(400).json({ 
                        errorMessage : "Utilisateur non trouvE !",
                        success: false
                    });
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(validUser => {
                        if (!validUser) {
                            res.status(401).json({ 
                                success: false,
                                errorMessage : "Mot de passe incorect" 
                            });
                        }
                        res.status(200).json({
                            user,
                            success: true,
                            token : jwt.sign(
                                {userId : user._id},
                                "RANDOM_TOKEN_SECRET",
                                {expiresIn : "48h"}
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ 
                        success: false,
                        message: "Un probleme est survenu sur votre mot de passe, veuillez reessayer plutard",
                        error 
                    }));
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        res.status(500).json({
            success: false,
            message: "Veuillez remplir les bonnes informations",
            error
        });
    }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.consfirmSms = (req, res) => {
    if (!req.body.msgCode) {
        res.status(400).json({ errorMessage : "Aucune session est ouverte"});
    }
    // then we can save the user ...
    const user = new User ({
        username : req.body.username,
        password : req.body.password,
        phone : req.body.phone,
        // adress : req.body.adress,
        mail : req.body.mail,
        msgCode : req.body.msgCode,
        role: req.body.role,
        avatar: req.body.avatar
    });
    user.save()
        .then((user) => res.status(statusCode.OK).send({ user }))
        .catch((error) => res.status(400).send({ error }));
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

exports.sendMsgConf = (req, res) => {
    client.messages.create({
        body: req.body.msgDetail +" "+ req.body.msgCode,
        from: process.env.NUMBER,
        to: req.body.phone
    })
        .then(message => {
            res.status(201).json({
                message,
                alert: "Votre code de confirmation a ete envoye avec succes, veuillez verifier vos messages entrants",
                username : req.body.username,
                password : req.body.password,
                phone : req.body.phone,
                role: req.body.role,
                verified: false,
                msgCode : req.body.msgCode,
                success: true,
                avatar: req.body.avatar
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                alert: "Echec de confirmation du code, veuillez reessayer",
                err
            });
        });
    // var phone = req.body.phone;
    // var username = "";
    // var password = "";
    // var source = "";
    // var msg = req.body.msgDetail +" "+ req.body.msgCode;
        
    // request1('http://api.rmlconnect.net/bulksms/bulksms?username='+username+'&password='+password+'&type=0&dlr=1&destination='+phone+'&source='+source+'&message='+msg, function (error1, response1, body1) {
    //     res.status(response1.statusCode).json({
    //         message : 'Votre code de confirmation a ete envoye avec succes, veuillez veirifier vos messages entrants',
    //         username : req.body.username,
    //         password : req.body.password,
    //         phone : req.body.phone,
    //         adress : req.body.adress,
    //         mail : req.body.mail,
    //         msgCode : req.body.msgCode
    //     })
    // });
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
        body: "Bonjour, +"+req.body.msgPhoneClient+ " au pseudo "+req.body.username+" viens de passer une commande de"+req.body.quantity+" plats de "+req.body.repas+" chez "+req.body.restau
    })
        .then(message => {
            res.status(201).json({
                message,
                alert: "Votre commande a ete effectuee avec succes",
                date: Date(Date.now())
            });
        })
        .catch(err => {
            res.status(500).json({
                alert: "Echec de confirmation du code, veuillez reessayer",
                err
            });
        });
};

// GET logic

exports.getOwners = (req, res) => {
    User.find(  {role: "OWNER", verified: true}, 
        (err, owners) => {
            if (!err) {
                res.status(201).json({owners});
            } else {
                res.status(500).send(err);
            }
        });
};

exports.getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if(!err) {
            res.status(201).json({users});
        } else {
            res.status(500).send(err);
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
    User.findOne({username : req.params.username}, (err, user) => {
        if (!err) {
            if (user) {
                res.status(200).json({user});
            } else {
                res.status(401).json({ message : "Uilisateur introuvable" });
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
