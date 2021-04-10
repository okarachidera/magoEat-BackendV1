/* eslint-disable no-unused-vars */
const Repas = require("../models/repas.model");
const repasValidator = require("../validators/repas.validators");

exports.createRepas = (req, res) => {
    // First validation 
    const data = req.body;
    const {error, value} = repasValidator.createRepas.validate(data);
    if (!error) {
        const rep = new Repas({
            label: value.label,
            restau: value.idRestau,
            description: value.description,
            imgUrl: value.imgUrl,
            category: value.category,
            subCategory: value.subCategory,
            timeForCook: value.timeForCook,
            price: value.price,
            charge: value.charge,
            averageRate: 5,
            tags: value.tags
        });
        rep.save()
            .then(repas => {
                res.status(200).json({
                    success: true,
                    message: "Repas ajouté avec success",
                    repas
                });
            })
            .catch(err => {
                res.status(505).json({
                    success: false,
                    message: "Quelque chose ne va pas dans le formulaire envoyé",
                    err
                });
            });
    } else {
        res.status(400).json({
            message: "Veuillez remplir les champs par des données valides",
            success: false,
            error
        });
    }
};

exports.getAllRepas = (req, res) => {
    const filter = {};
    Repas.find(filter)
        .then(repas => {
            if (repas.length == 0) {
                res.status(201).json({
                    message: "Aucun repas dans enreigisté "
                });
            } else {
                res.status(200).json({
                    repas
                });
            }
        })
        .catch(err => {
            res.status(505).json({
                success: false,
                message: "Quelque chose ne va pas dans le formulaire envoyé",
                err
            });
        });
};