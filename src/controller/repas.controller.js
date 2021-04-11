/* eslint-disable no-unused-vars */
const { Repas } = require("../models/");
const repasValidator = require("../validators/repas.validators");
const codeStatus = require("../constants/status-code");

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
        .populate("restau")
        .populate("category")
        .populate("subCategory")
        .then(repas => {
            if (repas.length == 0) {
                res.status(201).json({
                    success: true,
                    message: "Aucun repas dans enreigisté "
                });
            } else {
                res.status(200).json({
                    success: true,
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

exports.getRepasByRestuarants = (req, res) => {
    const filter = {
        restau: req.params.idRestau
    };
    Repas.find(filter)
        .populate("category")
        .populate("subCategory")
        .then(repas => {
            res.status(codeStatus.OK)
                .json({
                    success: true,
                    repas
                });
        })
        .catch(err => {
            res.status(codeStatus.BAD_REQUEST)
                .json({
                    success: false,
                    message: "Une erreur inattendue est survenue",
                    err
                });
        });
};
