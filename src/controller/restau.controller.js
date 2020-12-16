const Restau = require('../models/restau.model');
const restauValidator = require('../validators/restau.validators');

// The GET logics

exports.getAllRestau = (req, res) => {
    const query = {}
    Restau.find(query)
        .then(restaus => {
            res.status(201).json({
                success: true,
                restaus
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

exports.getOwnerRestau = (req, res) => {

}

exports.getOrderList = (req, res) => {

}

// The POST logics 

exports.createRestau = (req, res) => {
    // validation
    const data = req.body;
    const {error, value} = restauValidator.createRestau.validate(data);
    if (!error) {
        const restau = new Restau({
            label: data.label,
            adress: data.adress,
            description: data.description,
            imgUrl: data.imgUrl,
            ownerId: data.ownerId,
            averageRating: 5,
            opensAt: data.opensAt,
            closeAt: data.closeAt
        })
        restau.save()
            .then(rest => {
                res.status(201).json({
                    rest,
                    success: true,
                    message: 'Restaurant ajoutE avec succes'
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: 'Quelque chose ne va pas bien avec l\'envoie',
                    err
                })
            })
    } else {
        res.status(404).json({
            error,
            success: false,
            message: 'Vous avez entrE des donnees invalides, veillez verifier '
        })
    }
}

exports.updateRestau = (req, res) => {

}