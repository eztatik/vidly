const auth = require('../middleware/auth');
const { Customers, validate } = require('../Models/customer');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');




router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let customers = new Customers({  
        isGold: req.body.isGold, 
        name: req.body.name, 
        phone: req.body.phone  });
    customers = await customers.save();
    res.send(customers);


});

 router.get('/', async (req, res) => {
    const customer = await Customers.find().sort('name');

    res.send(customer);
}); 

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customers.findByIdAndUpdate(req.params.id, 
        { isGold: req.body.isGold, 
            name: req.body.name, 
            phone: req.body.phone 
        },
         { new: true })
    res.send(customer);
});

router.delete('/:id', async (req,res) => {
    const customer = await Customers.findByIdAndDelete(req.params.id);
    res.send(customer);
});


  router.get('/:id', async (req, res) => {
    const customer = await Customers.findById(req.params.id);
    if (!customer) res.status(404).send('the given id was not found');
    res.send(customer);
}); 
  
module.exports = router;
