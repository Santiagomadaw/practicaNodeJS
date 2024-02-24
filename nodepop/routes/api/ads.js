var express = require('express');
var router = express.Router();
const Ad =require('../../model/Ads');

/* GET users listing. */
router.get('/', async function(req, res, next) {

try {
    const filterBySell = req.query.sell
    const start = req.query.start
    const step = req.query.step
    const filter = {}
    filter.sell=filterBySell
    const ads = await Ad.show(filter, start, step)
    res.json({result:ads});
} catch (error) {
    next(error)
}   
});

module.exports = router;
