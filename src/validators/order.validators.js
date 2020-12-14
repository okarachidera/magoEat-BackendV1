const { valid } = require('@hapi/joi')
const Joi = require('@hapi/joi')

const validId = Joi.string()
                    .alphanum()
const stringField = Joi.string()
                        .min(2)
                        .max(255)
const rate = Joi.number()
                .min(1)
                .max(5)
                .optional()
const amount = Joi.number()
                    .required()
const devise = Joi.valid(
                    "USD",
                    "CDF"
                )
                .required()
const ratable = Joi.boolean()
                    .default(true)
const status = Joi.string()
                    .valid(
                        "PLACED",
                        "ACCEPTED",
                        "ON_THE_ROAD",
                        "CLOSED",
                        "CANCELED"
                    )
                    .required()
const cancelReason = Joi.string()
                        .min(2)
                        .max(100)
                        .optional()
const date = Joi.date()
                    .required()

exports.proceedOrder = Joi.object().keys({
    idUser: validId.required(),
    platId: validId.required(),
    date,
    restauName: stringField.required(),
    ratable,
    amount,
    devise,
    status,
})
