const Joi = require('@hapi/joi');

const username = Joi.string().min(3).max(50);
const password = Joi.string().alphanum().required();
const phone = Joi.string().regex(/^0?[0-9]{9}$/);
const stringField = Joi.string().min(3).max(120);
const email = Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'org']}});
const role = Joi.string().valid("ADMIN", "USER", "OWNER", "DELIVERY_GUY").uppercase().optional()


exports.loginValidator = Joi.object().keys({
    emailOrPhone = Joi.alternatives().try(
        email,
        phone
    ).required(),
    password
})

exports.signupValidator = Joi.object().keys({
    username,
    phone,
    password,
    confirmPassword: Joi.string().valid(Joi.ref(password)).required(),
    email: email.optional(),
    role,
    avatar: stringField.optional()
})