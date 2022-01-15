const Joi = require('joi');
const func = require('joi/lib/types/func');

module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);

}