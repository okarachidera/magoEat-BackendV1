const Joi = require('@hapi/joi');

const username = Joi.string().min(3).max(50);
const password = Joi.string().required().min(6).max(50);
const phone = Joi.string().regex(/^\+243[0-9]{9}$/);
const stringField = Joi.string().min(3).max(120);
const mail = Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'org']}});
const role = Joi.string().valid("ADMIN", "USER", "OWNER", "DELIVERY_GUY").uppercase().optional()

exports.loginValidator = Joi.object().keys({
    phone: phone.required(),
    password
})

exports.signupValidator = Joi.object().keys({
    username,
    phone,
    password,
    confirmPassword: Joi.string().required(),
    mail: mail.optional(),
    role,
    avatar: stringField.optional(),
    msgCode: Joi.number().optional(),
    verified: Joi.boolean().required()
})

exports.updateUserInfo = Joi.object().keys({
    username: username.optional(),
    phone: phone.optional(),
    password: phone.optional(),
    confirmPassword: Joi.string().required(),
    mail: mail.optional(),
    role: role.optional(),
    avatar: stringField.optional(),
    msgCode: Joi.number().optional()
})

exports.updatePassword = Joi.object().keys({
    previousPass: password.required(),
    newPass: password.required(),
    confirmPassword: password.required()
})