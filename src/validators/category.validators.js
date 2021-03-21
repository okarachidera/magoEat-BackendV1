const Joi = require("@hapi/joi");

const validLabel = Joi.string()
    .min(3)
    .max(25);
const validUrl = Joi.string()
    .max(255);

exports.createUpdateCategory = Joi.object().keys({
    label: validLabel.required(),
    imgWhite: validUrl.required(),
    imgRed: validUrl.required()  
});
