const Category = require("../models/category.model");
const categoryValidator = require("../validators/category.validators");

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
