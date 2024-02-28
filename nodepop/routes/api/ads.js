
const express = require('express');
const router = express.Router();
const Ad = require('../../model/Ads');
const { validationResult } = require('express-validator');
const validate = require('../../lib/validation');
/* GET anuncios filtrados. */
router.get('/',validate.queryValidator, async (req, res, next) => {
    try {
        validationResult(req).throw(); // lanza excepción si hay errores de validación

        const ads = await Ad.filter(req.query);
        res.json({ result: ads });
    } catch (error) {
        next(error);
    }
});
// GET listado de tags en los anuncios.
router.get('/tags', async (req, res, next) => {
    try {

        const ads = await Ad.distinct('tags');
        res.json({ result: ads });
    } catch (error) {

        next(error);
    }
});
// PUT modificar un anuncio
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
