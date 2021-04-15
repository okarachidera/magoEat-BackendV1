const Joi = require("@hapi/joi");

const rate = Joi.number()
    .min(1)
    .max(5)
    .optional();

const status = Joi.string()
    .valid(
        "PLACED",
        "ACCEPTED",
        "ON_THE_ROAD",
        "CLOSED",
        "CANCELED"
    )
    .required();

const validId = Joi.string()
    .alphanum();

const devise = Joi.string()
    .valid(
        "USD",
        "CDF"
    )
    .required();

const stringField = Joi.string()
    .min(2)
    .max(255);

const cancelReason = Joi.string()
    .min(2)
    .max(100)
    .optional();

const quantity = Joi.number()
    .min(1);

const amount = Joi.number()
    .positive();


exports.placeOrder = Joi.object().keys({
    user: validId.required(),
    repas: validId.required(),
    quantity,
    amount: amount.required(),
    devise
});

exports.cancelOrder = Joi.object().keys({
    cancelReason
});

exports.closeOrder = Joi.object().keys({
    feedBack: stringField.optional(),
    rate
});

exports.updateStatus = Joi.object().keys({
    status
});

exports.rateOrder = Joi.object().keys({
    feedBack: stringField.optional(),
    rate
});
