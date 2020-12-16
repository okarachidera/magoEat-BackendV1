const Repas = require('../models/repas.model');
const repasValidator = require('../validators/repas.validators');

exports.createRepas = (req, res) => {
    // First validation 
    const data = req.body;
    const {error, value} = repasValidator.createRepas.validate(data);
    if (!error) {
        const repas = new Repas({
            label: data.label,
            idRestau: data.idRestau,
            description: data.description,
            imgUrl: data.imgUrl,
            category: data.category,
            subCategory: data.subCategory,
            timeForCook: data.timeForCook,
            price: data.price,
            charge: data.charge,
            averageRate: 5
        })
        repas.save()
            .then(rep => {
                res.status(200).json({
                    success: true,
                    message: 'Repas ajoutE avec success',
                    rep
                })
            })
            .catch(err => {
                res.status(505).json({
                    success: false,
                    message: 'Quelque chose ne va pas dans le formulaire envoyE',
                    err
                })
            })
    } else {
        res.status(400).json({
            message: 'Veuillez remplir les champs par des donnees valides',
            success: false,
            error
        })
    }
}

exports.getAllRepas = (req, res) => {
    const filter = {};
    Repas.find(filter)
        .then(rep => {
            if (rep.length == 0) {
                res.status(201).json({
                    message: 'Aucun repas dans enreigistE '
                })
            } else {
                res.status(200).json({
                    rep
                })
            }
        })
        .catch(err => {
            res.status(505).json({
                success: false,
                message: 'Quelque chose ne va pas dans le formulaire envoyE',
                err
            })
        })
}