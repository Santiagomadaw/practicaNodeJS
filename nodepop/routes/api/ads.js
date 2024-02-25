var express = require('express');
var router = express.Router();
const Ad =require('../../model/Ads');

/* GET users listing. */
router.get('/', async function(req, res, next) {

try {
    const filters= await Ad.filter(req.query)
    const ads = await Ad.show(filters[0], filters[1], filters[2])
    res.json({result:ads});
} catch (error) {
    next(error)
}   
});

module.exports = router;
