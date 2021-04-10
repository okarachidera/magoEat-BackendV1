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


exports.placeOrder = Joi.object().keys({
    user: validId.required(),
    plat: validId.required(),
    quantity,
    devise
});

exports.cancelOrder = Joi.object().keys({
    orderId: validId.required(),
    cancelReason
});

exports.closeOrder = Joi.object().keys({
    feedback: stringField.optional(),
    rate
});

exports.updateStatus = Joi.object().keys({
    status
});

exports.rateOrder = Joi.object().keys({
    orderId: validId.required(),
    feedback: stringField.optional(),
    rate
});

