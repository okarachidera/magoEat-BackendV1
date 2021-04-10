const Joi = require("@hapi/joi");

exports.createSubCategory = Joi.object().keys({
    label: Joi.string()
        .max(255)
        .min(6)
        .optional(),
    imgCroped: Joi.string()
        .uri()
        .optional()
});
