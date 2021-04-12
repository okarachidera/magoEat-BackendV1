const Joi = require("@hapi/joi");

exports.createSubCategory = Joi.object()
    .keys({
        label: Joi.string()
            .max(255)
            .min(6)
            .required(),
        imgCroped: Joi.string()
            .uri()
            .required()
    });

exports.updateSubCategory = Joi.object()
    .keys({
        label: Joi.string()
            .max(255)
            .min(6)
            .required(),
        imgCroped: Joi.string()
            .uri()
            .optional()
    });
