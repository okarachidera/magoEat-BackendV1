require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const auth_token = process.env.TWILIO_AUTH_TOKEN;
const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidation = require('../validators/users.validators');
// const request1 = require('request');
const client = require('twilio')(accountSid, auth_token);

exports.signup = (req, res, next) => {
    // Fisrt validation 
    const {error, value} = userValidation.signupValidator.validate(req.body);
    if (!error) {
        // All the data put inside fit the requirements
        bcrypt.hash(req.body.password, process.env.GEN_SALT)
            .then(hash => {
                const user = new User ({
                    username : req.body.username,
                    password : hash,
                    phone : req.body.phone,
                    // adress : req.body.adress,
                    mail : req.body.mail,
                    msgCode : Math.floor(Math.random()*999)+1000,
                    role: req.body.role,
                    verified: false
                })
                // res.status(201).send({ user })
                user.save()
                    .then(user => res.status(200).json({ user }))
                    .catch(() => res.status(400).json({ errorMessage : 'Adresse mail ou numero de telephone deja existant, avez-vous deja un compte MAgoEat ?' }))
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(400).json({
            success: false,
            message: 'Vous avez entré des données invalides',
            error
        })
    }
}

exports.login = (req, res, next) => {
    User.findOne({phone : req.body.phone})
        .then(user => {
            if (!user) {
                res.status(400).json({ 
                    errorMessage : 'Utilisateur non trouvE !',
                    success: false
                })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(validUser => {
                    if (!validUser) {
                        res.status(401).json({ 
                            success: false,
                            errorMessage : 'Mot de passe incorect' 
                        })
                    }
                    res.status(200).json({
                        username : req.body.username,
                        success: true,
                        mail : user.mail,
                        phone : user.phone,
                        token : jwt.sign(
                            {username : req.body.username},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn : '48h'}
                        )
                    })
                })
                .catch(error => res.status(500).json({ 
                    success: false,
                    message: 'Un probleme est survenu sur votre mot de passe, veuillez reessayer plutard',
                    error 
                }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.consfirmSms = (req, res, next) => {
    if (!req.body.msgCode) {
        res.status(400).json({ errorMessage : 'Aucune session est ouverte'})
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
    })
    user.save()
        .then((user) => res.status(200).send({ user }))
        .catch((error) => res.status(400).send({ error }))
}

exports.sendMsgConf = (req, res, next) => {
    client.messages.create({
        body: req.body.msgDetail +" "+ req.body.msgCode,
        from: process.env.NUMBER,
        to: req.body.phone
    })
        .then(message => {
            res.status(201).json({
                message,
                alert: 'Votre code de confirmation a ete envoye avec succes, veuillez verifier vos messages entrants',
                username : req.body.username,
                password : req.body.password,
                phone : req.body.phone,
                adress : req.body.adress,
                mail : req.body.mail,
                msgCode : req.body.msgCode
            })
        })
        .catch(err => {
            res.status(500).json({
                alert: 'Echec de confirmation du code, veuillez reessayer',
                err
            })
        })
    // var phone = req.body.phone;
    // var username = "pacyL20";
    // var password = "zKssVK4u";
    // var source = "MAGOEAT APP";
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
}

exports.sendMsgToAdmins = (req, res, next) => {
    client.messages.create({
        from: process.env.NUMBER,
        to: '+243990831772',
        body: "Bonjour, +"+req.body.msgPhoneClient+ " au pseudo "+req.body.username+" viens de passer une commande de"+req.body.quantity+" plats de "+req.body.repas+" chez "+req.body.restau
    })
        .then(message => {
            res.status(201).json({
                message,
                alert: 'Votre commande a ete effectuee avec succes',
                date: Date(Date.now())
            })
        })
        .catch(err => {
            res.status(500).json({
                alert: 'Echec de confirmation du code, veuillez reessayer',
                err
            })
        })
    // var username = "pacyL20";
    // var password = "zKssVK4u";
    // var source = "MAGOEAT APP ADMIN";
    // var msg = "Bonjour, +"+req.body.msgPhoneClient+ " au pseudo "+req.body.username+" viens de passer une commande de"+req.body.quantity+" plats de "+req.body.repas+" chez "+req.body.restau; 
    // request1('http://api.rmlconnect.net/bulksms/bulksms?username='+username+'&password='+password+'&type=0&dlr=1&destination=243990831772&source='+source+'&message='+msg, function (error1, response1, body1) {
    //     res.status(response1.statusCode).json({
    //         message : 'Envoie de la commande reussi, le traitement est en cours',
    //         date : Date()
    //     })
    // });
}

exports.getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if(!err) {
            res.status(201).json({users})
        } else {
            res.status(500).send(err)
        }
    })
}

exports.getUserByUsername = (req, res, next) => {
    // console.log(req.params.username)
    User.findOne({username : req.params.username}, (err, user) => {
        if (!err) {
            if (user) {
                res.status(200).json({user})
            } else {
                res.status(401).json({ message : 'Uilisateur introuvable' })
            }
        } else {
            res.send(err)
        }
    })
}
// exports.comparePassword = (req, res, next) => {

// }
