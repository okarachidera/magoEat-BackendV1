const Category = require("../models/category.model");
const categoryValidator = require("../validators/category.validators");

exports.index = (req, res) => {
    Category.find({}, (err, categories) => {
        if (!err) {
            res.status(200)
                .json({
                    success: true,
                    categories
                });
        }
        res.status(500)
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
            message: "Il semble que vous avez entrE des donnees invalides",
            error
        });
    }
    const category = new Category({
        label: value.label,
        imgWhite: value.imgWhite,
        imgRed: value.imgRed
    });
    category.save()
        .then((cat) => {
            res.status(201)
                .json({
                    success: true,
                    message: "Categorie cree avec succes",
                    category: cat
                });
        }).catch((err) => {
            res,status(500)
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
                message: "Mise a jour echouee",
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
                .then(c => {
                    res.status(202).json({
                        success: true,
                        message: "Mise a jour reussie",
                        category: c
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: "Mise a jour echouee",
                        err
                    });
                });
        })
        .catch();
};
