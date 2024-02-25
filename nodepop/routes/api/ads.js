var express = require('express');
var router = express.Router();
const Ad = require('../../model/Ads');

/* GET anuncios filtrados. */
router.get('/', async function (req, res, next) {
    try {
        const filters = await Ad.filter(req.query)
        const ads = await Ad.show(filters[0], filters[1], filters[2])
        res.json({ result: ads })
    } catch (error) {
        next(error)
    }
})
//PUT modificar un anuncio
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        //option.true devuelve el elemento despues de modificado, false el no modificado
        const updatedAd = await Ad.findByIdAndUpdate(id, data, { new: true })

        res.json({ result: updatedAd })

    } catch (error) {
        next(error);
    }


});
// POST para agregar nuevos documentos a la base de datos
router.post('/', async (req, res, next) => {
    try {
        const data = req.body
        // se crea una instancia anuncio
        const ad = new AD(data)
        // se guarda en la base de datos
        const savedAd = await ad.save()
        res.json({ result: savedAd })
    } catch (error) {
        next(error)
    }
});
// DELETE para borrar anuncios a la base de datos

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        //borra un anuncio por id, aqui no tenemos nada que devolver
        await Ad.deleteOne({ _id: id })
        res.json()
    } catch (error) {
        next(error)
    }
})

module.exports = router;
