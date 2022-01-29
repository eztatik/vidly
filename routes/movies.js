const { Movie, validate } = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();



router.post('/', async (req, res)  => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('invalid genre');
    
    const movie = new Movie({ 
        title: req.body.title, 
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock, 
        dailyRentalRate: req.body.dailyRentalRate});
    await movie.save();
    res.send(movie);
});

router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('title');
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true });
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    res.send(movie);
});

router.get('/:id', async (req, res) =>  {
    const movie = Movie.findById(req.params.id);
    const genre = Genre.findById(req.params.id);
     /*find in an array*/ //const genre = genres.find(c => c.id === parseInt(req.params.id));
     if (!genre) res.status(404).send('genre with given id was not found');
     res.send(genre);
     if (!movie) res.status(404).send('genre with given id was not found');
     res.send(movie);
   });


module.exports = router;

