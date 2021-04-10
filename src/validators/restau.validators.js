/* eslint-disable no-unused-vars */
const Joi = require("@hapi/joi");

const textField = Joi.string()
    .max(120)
    .min(3);

const rate = Joi.number()
    .min(1)
    .max(5)
    .optional();

const url = Joi.string()
    .optional();

const validId = Joi.string()
    .alphanum();

const validDate = Joi.date()
    .iso()
    .optional();

exports.createRestau = Joi.object().keys({
    label: textField.required(),
    owner: validId.required(),
    opensAt: validDate,
    closeAt: validDate,
    imgUrl: url.optional(),
    imgBrushed: url.optional(),
    adress: textField.optional(),
    description: Joi.string().min(3).max(255).required()
});

exports.holdRestau = Joi.object({
    isActive: Joi.boolean
});

exports.updateRestInfo = Joi.object({
    label: textField.optional(),
    ownerId: validId.optional(),
    opensAt: textField.optional(),
    closeAt: textField.optional(),
    imgUrl: url.optional(),
    adress: textField.optional(),
    description: Joi.string().min(3).max(255).optional()
});

