/* eslint-disable no-unused-vars */
const Joi = require("@hapi/joi");

const textField = Joi.string()
    .min(3)
    .max(255);
const validId = Joi.string()
    .alphanum()
    .required();
const rate = Joi.number()
    .min(1)
    .max(5)
    .optional();
const url = Joi.string()
    .alphanum()
    .optional();
const charge = Joi.number()
    .max(1)
    .min(0);

exports.createRepas = Joi.object().keys({
    label: textField.required(),
    idRestau: validId.required(),
    description: textField.required(),
    imgUrl: textField.required(),
    category: validId.required(),
    subCategory: validId.required(),
    timeForCook: Joi.number(),
    price: Joi.number().required(),
    charge
});