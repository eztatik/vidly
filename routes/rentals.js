const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customers} = require('../models/customer');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const boolean = require('joi/lib/types/boolean');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   
    const customer = await Customers.findById(req.body.customerId);
   if(!customer) return res.status(400).send('invalid customer');

   const movie = await Movie.findById(req.body.movieId);
   if (!movie) return res.status(400).send('invalid movie.');

   if (movie.NumberInStock === 0) return res.status(400).send('movie not in stock');
    let rental = new Rental ({

        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        
        } 
        });
  try{      
    new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, {
            $inc: { numberInStock: -1 }
        })

        .run();

    res.send(rental);
    }
    catch(ex) {
        res.status(500).send('something failed.');
    }

});

router.put('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndUpdate(req.params.id, {
        customer: req.body.customer, 
        isGold: req.body.isGold,
        phone: req.body.phone}, {new: true});

        res.send(rental);
})

router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);
    res.send(rental);
})

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) res.status(404).send('id not found');
    res.send(rental);
});


module.exports = router;