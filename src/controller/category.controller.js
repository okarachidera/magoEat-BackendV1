const { Category, SubCategory} = require("../models/");
const categoryValidator = require("../validators/category.validators");
const subCategoryValidator = require("../validators/subCategoy.validators");
const codeStatus = require("../constants/status-code");

exports.index = (req, res) => {
  const filter = {};
  Category.find(filter)
    .populate("repas")
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

exports.showCategory = (req, res) => {
  Category.findById(req.params.idCategory)
    .populate({
      path: "repas",
      populate: {
        path: "restau",
        select: "label"
      }
    })
    .exec((err, category) => {
      if (!err) {
        res.status(codeStatus.OK)
          .json({
            success: true,
            category
          });
      } else {
        res.status(codeStatus.INTERNAL_SERVER_ERROR)
          .json({
            success: false,
            err
          });
      }
    });
};

exports.createCategory = (req, res) => {
  const {error, value} = categoryValidator.createCategory.validate(req.body);
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

// Sub categories controllers

exports.newSubCategory = (req, res) => {
  const {error, value} = subCategoryValidator.createSubCategory.validate(req.body);
  if (! error) {
    const subCat = new SubCategory({
      label: value.label,
      imgCroped: value.imgCroped
    });
    subCat.save()
      .then(subCategory => {
        res.status(codeStatus.CREATED)
          .json({
            success: true,
            subCategory,
            message: "Sous-category creee avec succes"
          });
      })
      .catch(error => {
        res.status(codeStatus.INTERNAL_SERVER_ERROR)
          .json({
            success: false,
            message: "Echec de creation de la sous-categorie",
            error
          });
      });
  } else {
    res.status(codeStatus.FORBIDDEN)
      .json({
        success: false,
        message: "Veuillez entrer des donnees valides",
        error
      });
  }
};

exports.showSubCategory = (req, res) => {
  SubCategory.findById(req.params.idSubCategory)
    .populate("repas")
    .exec((err, subCategory) => {
      if (!err) {
        res.status(codeStatus.OK)
          .json({
            success: true,
            subCategory
          });
      } else {
        res.status(codeStatus.INTERNAL_SERVER_ERROR)
          .json({
            success: false,
            err
          });
      }
    });
};

exports.showSubCategories = (req, res) => {
  SubCategory.find({})
    .populate("repas")
    .then((subCategories) => {
      res.status(codeStatus.OK)
        .json({
          success: true,
          subCategories
        });
    }).catch((err) => {
      res.status(codeStatus.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          err
        });
    });
};
