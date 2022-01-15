const Joi = require('joi');
//const number = require('joi/lib/types/number');
//const string = require('joi/lib/types/string');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');




const Movie = new mongoose.model('Movie', new mongoose.Schema({

    title: {

        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },

    genre: { 
        type: genreSchema,
        required: true 
    
    },

    numberInStock: {

        type: Number,
        required: true
    },

    dailyRentalRate: {
        type: Number,
        required: true
    }
}));

function validateMovie(movie) {
 
    const schema = {
        title: Joi.string().min(3).required(),
        genreId: Joi.ObjectId().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    };
  
    return Joi.validate(movie, schema);
  
  }



  exports.Movie = Movie;
  exports.validate = validateMovie;

