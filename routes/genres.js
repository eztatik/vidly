const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../Models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();





/*
const genres = []
    {id: 1 , name: 'genre1'},
     {id: 2 , name: 'genre2'},
     {id: 3 , name: 'genre3'},
 ];*/
 //router.get('/', (req, res) => {
 
   //res.send('hello world!!');
 //});
 





 
   router.post('/', auth, async (req, res) => {
   const { error } = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);
    
   let genre = new Genre({ name: req.body.name });
   
    genre = await genre.save();
    res.send(genre);
    
  });

 //createGenre();

      router.get('/', async (req, res) => {
        throw new Error('Could not get the genres.');
        const genres = await Genre.find().sort('name');
        res.send(genres);
      });

 
 router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
     const genre = await Genre.findByIdAndUpdate( req.params.id, { name: req.body.name }, {
       new: true
     })
 
     /*find in array*/ // const genre = genres.find(g => g.id === parseInt(req.params.id));
     if (!genre) res.status(404).send('genre with given id was not found');
 
     
     res.send(genre);
 
 
 
 });
 
 router.delete('/:id', [auth, admin], async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id);
   //find course and give error if not there
   /* find in array */  //const genre = genres.find(c => c.id === parseInt(req.params.id));
   if (!genre) res.status(404).send('genre with given id was not found');
   
   //delete course by id in array
    /*const index = genres.indexOf(genre);
    genres.splice(index, 1);*/
 
    res.send(genre);
 });
 

 /*router.get('/api/genres', (req, res) =>  {
   res.send(req.);
 });*/
 
 router.get('/:id', async (req, res) =>  {
  const genre = Genre.findById(req.params.id);
   /*find in an array*/ //const genre = genres.find(c => c.id === parseInt(req.params.id));
   if (!genre) res.status(404).send('genre with given id was not found');
   res.send(genre);
 });

 module.exports = router;