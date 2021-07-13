/* eslint-disable no-unused-vars */
const { Order, Repas, User } = require("../models/");
const orderValidator = require("../validators/order.validators");
const codeStatus = require("../constants/status-code");

// For get routes

exports.getOrdersHistory = (req, res) => {
  Order.find({ user: req.params.idUser })
    .populate("plat")
    .then(orders => {
      if (!orders) {
        res.status(codeStatus.NO_CONTENT)
          .json({
            success: true,
            message: "Quelque chose ne va pas, rassurez-vous d'etre connecte" 
          });
      }
      if (orders.length == 0) {
        res.status(codeStatus.NO_CONTENT)
          .json({
            success: true,
            message: "Il y a aucune commancde dans votre historique" 
          });
      } else {
        res.status(codeStatus.OK).json({
          success: true,
          orders
        });
      }
    })
    .catch(error => {
      res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error
      });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns [Users]:{role: "owner"}
 */

exports.getAllOrders = (req, res) => {
  const filter = {};
  Order.find(filter)
    .populate("user")
    .populate("plat")
    .then(orders => {
      res.status(codeStatus.OK).json({
        success: true,
        orders
      });
    })
    .catch(error => {
      res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Une erreur s'est produite",
        error
      });
    });
};

// For post routes

exports.rateOrder = (req, res) => {
  const {error, value} = orderValidator.rateOrder.validate(req.body);
  if (!error) {
    const feedBack = {
      body: value.feedBack,
      date: Date.now()
    };
    Order.findOneAndUpdate(req.params.order, {
      rate: value.rate,
      feedBack
    })
      .populate("user")
      .populate("repas")
      .exec((err, order) => {
        if (err) {
          res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Echec de mise a jour des donnees dans le restaurant",
            err
          });
        } else {
          Repas.findByIdAndUpdate(order.repas, {
            $push: {
              rates: value.rate
            }
          })
            .then(repas => {
              res.status(codeStatus.CREATED).json({
                success: true,
                message: "Merci de votre cotation",
                repas,
                order
              });
            })
            .catch(error => {
              res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Echec de mise a jour des donnees dans le restaurant",
                error
              });
            });
        }
      });
  } else {
    res.status(codeStatus.FORBIDDEN).json({
      success: false,
      message: "Veuillez entrer des données valides",
      error
    });
  }
};

exports.placeOrder = (req, res) => {
  // First, let's validate the request
  const data = req.body;
  const {error, value} = orderValidator.placeOrder.validate(data);
  if (!error) {
    const order = new Order ({
      user: value.user,
      date: Date(Date.now()),
      repas: value.repas,
      quantity: value.quantity,
      amount: value.amount,
      devise: value.devise,
      status: "PLACED"
    });
    order.save()
      .then(odr => {
        User.findOneAndUpdate(value.user, {
          $push: {
            orders: odr._id
          }
        })
          .then(user => {
            res.status(codeStatus.OK).json({
              success: true,
              odr,
              user,
              message: "Votre commande a ete effectué avec succes, en cours de traitement",
            });
          })
          .catch(error => {
            res.status(codeStatus.BAD_REQUEST).json({
              success: false,
              message: "Quelque chose ne va pas dans votre requete, veuillez ressayer plustard",
              error
            });
          });
      })
      .catch(error => {
        res.status(400).json({
          success: false,
          message: "Quelque chose ne va pas dans votre requete, veuillez ressayer plustard",
          error
        });
      });
  } else {
    res.status(404).json({
      success: false,
      message: "Données invalides",
      error
    });
  }
};

exports.cancelOrder = (req,res) => {
  // First we validate date 
  const data = req.body;
  const {error, value} = orderValidator.cancelOrder.validate(data);
  if (!error) {
    Order.updateOne({
      _id: req.params.idOrder
    }, {
      cancelReason: value.cancelReason,
      status: "CANCELED"
    })
      .then(order => {
        res.status(codeStatus.OK)
          .json({
            success: true,
            message: "Merci de votre note, nous allons en tenir compte",
            order
          });
      })
      .catch(err => {
        res.status(codeStatus.INTERNAL_SERVER_ERROR)
          .json({
            success: false,
            err
          });
      });
  } else {
    res.status(500).json({
      message: "Une erreur s'est produite lors de l'analyse de vos donnees",
      success: false
    });
  }
};

exports.closeOrder = (req, res) => {
  const {error, value} = orderValidator.closeOrder.validate(req.body);
  if (!error) {
    Order.updateOne(
      {
        _id: req.params.id
      }, {
        feedback: {
          body: req.body.feedback,
          date: new Date(Date.now())
        },
        rate: value.rate
      }
    )
      .then(updatedOrder => {
        res.status(codeStatus.CREATED).json({
          success: true,
          message: "Merci de votre confiance, votre commande a ete cloturee",
          updatedOrder
        });
      })
      .catch(error => {
        res.status(codeStatus.BAD_REQUEST).json({
          success: false,
          error,
          message: "Echec de confirmation"
        });
      });
  } else {
    res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
      error,
      success: false,
      message: "Vous avez entrE des donnEes incorrectes"
    });
  }
};

exports.updateStatus = (req, res) => {
  const {error, value} = orderValidator.updateStatus.validate(req.body);
  if (!error) {
    Order.updateOne({
      _id: req.params.id
    },{
      status: value.status
    })
      .then(updatedOrder => {
        res.status(codeStatus.CREATED).json({
          success: true,
          updatedOrder,
          message: "Status updated successfully"
        });
      })
      .catch(error => {
        res.status(codeStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          error,
          message: "Une erreur sest produite"
        });
      });
  } else {
    res.status(codeStatus.FORBIDDEN).json({
      success: false,
      message: "Echec de mise a jour de la commande"
    });
  }
};
