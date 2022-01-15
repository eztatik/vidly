const winston  = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.set('useCreateIndex', true)
    mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => winston.info('connected to mongodb'))
    //.catch(err => console.error('could not connect to Mongodb'));


}