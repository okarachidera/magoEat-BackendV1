const Category = require("../models/category.model");
const categoryValidator = require("../validators/category.validators");
const codeStatus = require("../constants/status-code");

exports.index = (req, res) => {
    Category.find({})
        .then(categories => {
            res.status(codeStatus.OK)
                .json({
                    success: true,
                    categories
                });
        })
        .catch(err => {
            res.status(codeStatus.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    err
                });
        });
};

exports.createCategory = (req, res) => {
    const {error, value} = categoryValidator.createUpdateCategory.validate(req.body);
    if (error) {
        res.status(500).json({
            success: false,
            message: "Il semble que vous avez entré des données invalides",
            error
        });
    }
    const category = new Category({
        label: value.label,
        imgWhite: value.imgWhite,
        imgRed: value.imgRed,
        imgBrushed: value.imgBrushed
    });
    category.save()
        .then((cat) => {
            res.status(201)
                .json({
                    success: true,
                    message: "Categorie créée avec succes",
                    category: cat
                });
        }).catch((err) => {
            res.status(500)
                .json({
                    success: false,
                    message: "Une erreur s'est produite",
                    err
                });
        });
};

exports.updateCategory = (req, res) => {
    const {error, value} = categoryValidator.createUpdateCategory.validate(req.body);
    if (error) {
        res.status(500)
            .json({
                success: false,
                message: "Mise a jour echouée",
                error
            });
    }
    Category.findOne({label: value.label})
        .then(cat => {
            cat.update({
                label: value.label ? value.label : cat.label,
                imgRed: value.imgRed ? value.imgRed : cat.imgRed,
                imgWhite: value.imgWhite ? value : cat.imgWhite
            })
                .then(category => {
                    res.status(codeStatus.OK)
                        .json({
                            success: true,
                            message: "Mise a jour reussie",
                            category
                        });
                })
                .catch(err => {
                    res.status(500)
                        .json({
                            success: false,
                            message: "Mise a jour echouée",
                            err
                        });
                });
        })
        .catch(err => {
            res.status(codeStatus.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: "Erreur inattendue",
                    err
                });
        });
};
