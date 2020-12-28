const Restau = require('../models/restau.model');
const Order = require('../models/order.model');
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
    const ownerId = req.params.restauId;
    Restau.find({ownerId})
        .then(rest => {
            if (!rest) {
                res.status(404).json({
                    success: true,
                    message: `Aucun restaurant trouvE pour cet utilisateur`
                })
            }
            res.status(201).json({
                success: true,
                message: `La liste des restaurants`,
                rest
            })
        })
        .catch(err => {
            res.status(505).json({
                success: false,
                message: `Une erreur inattendue a ete rencontree, veuillez reesayer`,
                err
            })
        })
}

exports.getOrderList = (req, res) => {
    // Here we have to create list of orders which belongs on a specific restaurant
    
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