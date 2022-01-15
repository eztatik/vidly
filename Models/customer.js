const Joi = require('joi');
const mongoose = require('mongoose');

const Customers = mongoose.model( 'Customers', new mongoose.Schema({

    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    },

    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }

}));

function validateCustomers(customer) {
 
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    };
  
    return Joi.validate(customer, schema);
  
  }


  exports.Customers = Customers;
  exports.validate = validateCustomers;