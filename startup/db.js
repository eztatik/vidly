const winston  = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    mongoose.set('useCreateIndex', true)
    const db = config.get('db');
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    //saving this just in case. this goes in the connection path
    //, {useNewUrlParser: true, useUnifiedTopology: true}
    .then(() => winston.info(`connected to ${db}...`))
    //.catch(err => console.error('could not connect to Mongodb'));


}