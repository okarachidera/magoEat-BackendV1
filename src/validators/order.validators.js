const { valid } = require('@hapi/joi')
const Joi = require('@hapi/joi')

const rate = Joi.number()
                .min(1)
                .max(5)
                .optional()
const status = Joi.string()
                .valid(
                    "PLACED",
                    "ACCEPTED",
                    "ON_THE_ROAD",
                    "CLOSED",
                    "CANCELED"
                )
                .required()
const validId = Joi.string()
                    .alphanum()
const amount = Joi.number()
                    .required()
const devise = Joi.string()
                        .valid(
                            "USD",
                            "CDF"
                        )
                        .required()
const stringField = Joi.string()
                        .min(2)
                        .max(255)
// const ratable = Joi.boolean()
//                     .default(true)
const cancelReason = Joi.string()
                        .min(2)
                        .max(100)
                        .optional()
// const date = Joi.date()
//                     .required()

exports.placeOrder = Joi.object().keys({
    idUser: validId.required(),
    platId: validId.required(),
    amount,
    devise,
})

exports.cancelOrder = Joi.object().keys({
    orderId: validId.required(),
    cancelReason,
    status
})

exports.closeOrder = Joi.object().keys({
    status,
    feedback: stringField.optional(),
    rate
})

exports.updateStatus = Joi.object().keys({
    status
})

// exports.getHisto = Joi.object().keys({
//     idUser: validId.required()
// })

