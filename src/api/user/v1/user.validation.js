// joi validations come hear
const Joi = require('@hapi/joi');
const PasswordComplexity = require('joi-password-complexity')

const userSchema = Joi.object().keys({
    partnerId: Joi.string().guid().length(36).trim().allow('', null).messages({
        'string.base': `"partnerId" should be a type of 'text'`,
        'string.length': `"partnerId" length must be 36 characters long`,
    }),  
    userName: Joi.string().alphanum().trim().required().messages({
        'string.base': `"partnerUserId" should be a type of 'text'`,
        'string.empty': `"partnerUserId" cannot be an empty field`,
        'any.required': `"partnerUserId" is a required field`
    }),
    email: Joi.string().email().required().messages({
        'string.base': `"emailId" should be a type of "text"`,
        'string.empty': `"emailId" cannot be an empty field`,
        'string.required': `"emailId" is a required field`,
        'string.email': `"emailId" must be a valid email`
    }),
    password: new PasswordComplexity({
        min:8,
        max:25,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
    }).required(),  
    country: Joi.string().trim().required().messages({
        'string.base': `"country" should be a type of 'text'`,
        'string.empty': `"country" cannot be an empty field`,
        'any.required': `"country" is a required field`
    }),
    state: Joi.string().trim().required().messages({
        'string.base': `"state" should be a type of 'text'`,
        'string.empty': `"state" cannot be an empty field`,
        'any.required': `"state" is a required field`
    }),
    city: Joi.string().trim().required().messages({
        'string.base': `"city" should be a type of 'text'`,
        'string.empty': `"city" cannot be an empty field`,
        'any.required': `"city" is a required field`
    }),
    gender: Joi.string().valid('female','male','other').required().messages({
        'string.base': `"gender" should be a type of "text"`,
        'string.empty': `"gender" cannot be an empty field`,
        'any.required': `"gender" is a required field`,
        'any.only': `"gender" must be one of [female, male, other]`
    }),
    profilepic: Joi.string().trim().required(),
});

const validateUserSchema = async (dataToValidate) => {
    return await userSchema.validate(dataToValidate, { abortEarly: false });
}


module.exports = {
    validateUserSchema,
}