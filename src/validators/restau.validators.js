import Joi from '@hapi/joi';

const textField = Joi.string()
                    .max(120)
                    .min(3)
const rate = Joi.number()
                .min(1)
                .max(5)
                .optional()
const url = Joi.string()
                .alphanum()
                .optional()
const validId = Joi.string()
                    .alphanum()

exports.createRestau = Joi.object().keys({
    label: textField.required(),
    ownerId: validId.required(),
    opensAt: textField.optional(),
    closeAt: textField.optional(),
    imgUrl: textField.optional(),
    adress: textField.optional(),
    description: Joi.string().min(3).max(255).required(),
    averageRate: rate.optional()
})