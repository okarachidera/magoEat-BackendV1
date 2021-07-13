/* eslint-disable no-unused-vars */
const { Repas, Restau, Category, SubCategory } = require("../models/");
const repasValidator = require("../validators/repas.validators");
const codeStatus = require("../constants/status-code");

exports.createRepas = (req, res) => {
  // First validation 
  const data = req.body;
  const {error, value} = repasValidator.createRepas.validate(data);
  if (!error) {
    const rep = new Repas({
      label: value.label,
      restau: req.params.idRestau,
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
        Restau.findByIdAndUpdate(req.params.idRestau, {
          $push: {
            repas: repas._id
          }
        })
          .then(restaurant => {
            Category.findByIdAndUpdate(req.body.category, {
              $push: {
                repas: repas._id
              }
            })
              .then(category => {
                SubCategory.findByIdAndUpdate(req.body.subCategory, {
                  $push: {
                    repas: repas._id
                  }
                })
                  .then(subCategory => {
                    res.status(codeStatus.CREATED).json({
                      success: true,
                      message: "Repas ajouté avec success",
                      repas,
                      category,
                      subCategory,
                      restaurant
                    });
                  })
                  .catch((err) => {
                    res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
                      success: false,
                      message: "Quelque chose ne va pas dans le formulaire envoyé",
                      err
                    });
                  });
              })
              .catch((err) => {
                res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
                  success: false,
                  message: "Quelque chose ne va pas dans le formulaire envoyé",
                  err
                });
              });
          })
          .catch(err => {
            res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
              success: false,
              message: "Quelque chose ne va pas dans le formulaire envoyé",
              err
            });
          });
      })
      .catch(err => {
        res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Quelque chose ne va pas dans le formulaire envoyé",
          err
        });
      });
  } else {
    res.status(codeStatus.UNAUTHORIZED).json({
      message: "Veuillez remplir les champs par des données valides",
      success: false,
      error
    });
  }
};

exports.showRepas = (req, res) => {
  const { idRepas } = req.params;
  Repas.findOne({
    _id: idRepas
  })
    .populate("subCategory")
    .exec((err, repas) => {
      if (! err) {
        res.status(codeStatus.OK)
          .json({
            success: true,
            repas
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

exports.getAllRepas = (req, res) => {
  const filter = {};
  Repas.find(filter)
    .populate("restau")
    .populate("category")
    .populate("subCategory")
    .sort("price")
    .then(repas => {
      if (repas.length == 0) {
        res.status(codeStatus.NO_CONTENT).json({
          success: true,
          message: "Aucun repas dans enreigisté "
        });
      } else {
        res.status(codeStatus.OK).json({
          success: true,
          repas
        });
      }
    })
    .catch(err => {
      res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
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
