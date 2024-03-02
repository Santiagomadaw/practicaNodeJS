
const express = require('express');
const router = express.Router();
const Ad = require('../../model/Ads');
const { validationResult } = require('express-validator');
const validate = require('../../lib/validation');

/* GET anuncios filtrados. */
/* This code snippet is defining a GET route in an Express router. When a GET request is made to the
root endpoint '/', the `queryValidator` middleware function is first executed to validate the query
parameters. If there are validation errors, an exception is thrown. */
router.get('/',validate.queryValidator, async (req, res, next) => {
    try {
        validationResult(req).throw(); // lanza excepción si hay errores de validación
        const ads = await Ad.show(req.query);
        res.json({ result: ads });
    } catch (error) {
        next(error);
    }
});
// GET listado de tags en los anuncios.
/* This code snippet defines a GET route in an Express router for fetching a list of distinct tags from
the 'tags' field in the Ad model. When a GET request is made to the '/tags' endpoint, the
asynchronous function is executed. Inside the function, it uses the `Ad.distinct('tags')` method to
retrieve all unique values present in the 'tags' field of the Ad model. These distinct tags are then
sent as a JSON response using `res.json({ result: ads })`. If any errors occur during this process,
they are passed to the `next` middleware function for error handling. */
router.get('/tags', async (req, res, next) => {
    try {
        const ads = await Ad.distinct('tags');
        res.json({ result: ads });
    } catch (error) {
        next(error);
    }
});

// PUT modificar un anuncio
/* This code snippet defines a PUT route in an Express router for updating an existing advertisement in
the database. When a PUT request is made to the '/:id' endpoint (where ':id' is a parameter
representing the unique identifier of the advertisement), the middleware function
`validate.bodyValidator` is first executed to validate the request body. */
router.put('/:id', validate.bodyValidator, async (req, res, next) => {
    try {
        validationResult(req).throw(); // lanza excepción si hay errores de validación
        const { id } = req.params;
        const data = req.body;
        // option: true devuelve el elemento despues de modificado
        // option: false el no modificado
        const updatedAd = await Ad.findByIdAndUpdate(id, data, { new: true });
        res.json({ result: updatedAd });
    } catch (error) {
        next(error);
    }
});

// POST para agregar nuevos documentos a la base de datos
/* This code snippet defines a POST route in an Express router for adding new documents to the
database. When a POST request is made to the root endpoint '/', the middleware function
`validate.bodyValidatorAll` is first executed to validate the request body. */
router.post('/', validate.bodyValidatorAll, async (req, res, next) => {
    try {
        validationResult(req).throw();
        // lanza excepción si hay errores de validación
        const data = req.body;
        // se crea una instancia anuncio
        const ad = new Ad(data);
        // se guarda en la base de datos
        const savedAd = await ad.save();
        res.json({ result: savedAd });
    } catch (error) {
        next(error);
    }
});

// DELETE para borrar anuncios a la base de datos
/* This code snippet defines a DELETE route in an Express router for deleting an advertisement from the
database based on its unique identifier (`id`). When a DELETE request is made to the '/:id'
endpoint, the asynchronous function is executed. Inside the function: */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        // borra un anuncio por id, aqui no tenemos nada que devolver
        await Ad.deleteOne({ _id: id });
        res.json();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
