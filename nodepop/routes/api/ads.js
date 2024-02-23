var express = require('express');
var router = express.Router();
const Ads = require('../../model/Ads');

//GET /api/anuncios (devolvera una lista de anuncios)

router.get('/', async function (req, res, next) {
    try {
        const ads = await Ads.find();
        res.json({ results: ads });
    } catch (error) {
        next(error)
    }
});
module.exports = router;