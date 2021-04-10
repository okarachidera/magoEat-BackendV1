const Joi = require("@hapi/joi");

const textField = Joi.string()
    .min(3)
    .max(255);
const validId = Joi.string()
    .alphanum();

const rate = Joi.number()
    .min(1)
    .max(5)
    .optional();

const tags = Joi.array()
    .items(textField)
    .optional();

// const url = Joi.string()
//     .alphanum()
//     .optional();

const charge = Joi.number()
    .max(1)
    .min(0);

exports.createRepas = Joi.object().keys({
    label: textField.required(),
    restau: validId.required(),
    description: textField.required(),
    imgUrl: textField.required(),
    category: validId.required(),
    subCategory: validId.required(),
    timeForCook: Joi.number().required(),
    price: Joi.number().required(),
    charge,
    tags
});

exports.updateRepas = Joi.object().keys({
    label: textField.optional(),
    description: textField.optional(),
    imgUrl: textField.optional(),
    category: validId.optional(),
    subCategory: validId.optional(),
    timeForCook: Joi.number().optional(),
    price: Joi.number().optional(),
    charge,
    rate,
    tags
});
