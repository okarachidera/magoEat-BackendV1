const Joi = require('@hapi/joi');

const textField = Joi.string()
                        .min(3)
                        .max(255)
const validId = Joi.string()
                        .alphanum()
                        .required()
const rate = Joi.number()
                    .min(1)
                    .max(5)
                    .optional()
const url = Joi.string()
                    .alphanum()
                    .optional()
const validCategory = Joi.string()
                            .valid("CONGOLESE", "CHINEESE", "FRENCH", "ITALIAN", "VEGETARIAN", "TAKE_AWAY")
                            .required()
const charge = Joi.number()
                        .max(1)
                        .min(0)

exports.createRepas = Joi.object().keys({
    label: textField.required(),
    idRestau: validId.required(),
    description: textField.required(),
    imgUrl: textField.required(),
    category: validCategory,
    subCategory: Joi.string().optional(),
    timeForCook: Joi.number(),
    price: Joi.number().required(),
    charge
})