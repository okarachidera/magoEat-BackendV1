const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const request1 = require('request')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User ({
                username : req.body.username,
                password : hash,
                phone : req.body.phone,
                adress : req.body.adress,
                mail : req.body.mail,
                msgCode : Math.floor(Math.random()*999)+1000
            })
            res.status(200).json({ user })
            // user.save()
            //     .then(user => res.status(200).json({ user }))
            //     .catch(() => res.status(400).json({ errorMessage : 'Adresse mail ou numero de telephone deja existant, avez-vous deja un compte MAgoEat ?' }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({username : req.body.username})
        .then(user => {
            if (!user) {
                res.status(400).json({ errorMessage : 'Utilisateur non trouvE !'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(validUser => {
                    if (!validUser) {
                        res.status(401).json({ errorMessage : 'Mot de passe incorect' })
                    }
                    res.status(200).json({
                        username : req.body.username,
                        token : jwt.sign(
                            {username : req.body.username},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn : '48h'}
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
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
        password : hash,
        phone : req.body.phone,
        adress : req.body.adress,
        mail : req.body.mail,
        msgCode : Math.floor(Math.random()*999)+1000
    })
    user.save()
        .then(user => res.status(200).json({ user }))
        .catch(() => res.status(400).json({ errorMessage : 'Adresse mail ou numero de telephone deja existant, avez-vous deja un compte MAgoEat ?' }))
}

exports.sendMsgConf = (req, res, next) => {
    var phone = req.body.phone;
    var username = "pacyL20";
    var password = "zKssVK4u";
    var source = "MAGOEAT APP";
    var msg = req.body.msgDetail +" "+ req.body.msgCode;
        
    request1('http://api.rmlconnect.net/bulksms/bulksms?username='+username+'&password='+password+'&type=0&dlr=1&destination='+phone+'&source='+source+'&message='+msg, function (error1, response1, body1) {
        // console.error('error:', error1); // Print the error if one occurred
        // console.log('statusCode:', response1 && response1.statusCode);
        // console.log('body:', body1); 
        res.status(response1.statusCode).send({ "message": "Votre code de confiramtion a ete envoye avec succes, veuillez verifier vos messages entrants"});
    });
}

// exports.comparePassword = (req, res, next) => {

// }