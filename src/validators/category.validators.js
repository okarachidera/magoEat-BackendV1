const Joi = require("@hapi/joi");

const validLabel = Joi.string()
    .min(3)
    .max(25);
const validUrl = Joi.string()
    .max(255);

exports.createCategory = Joi.object().keys({
    userId: Joi.string().required(),
    label: validLabel.required(),
    imgWhite: validUrl.required(),
    imgRed: validUrl.required(),
    imgBrushed: validUrl.required()
});

exports.updateCategory = Joi.object().keys({
    userId: Joi.string().required(),
    label: validLabel.optional(),
    imgWhite: validUrl.optional(),
    imgRed: validUrl.required(),
    imgBrushed: validUrl.optional()
});
