var express = require('express');
var router = express.Router();
const Ad =require('../../model/Ads');

/* GET users listing. */
router.get('/', async function(req, res, next) {

try {
    const filterBySell = req.query.sell
    const minprice = req.query.min
    const maxprice = req.query.max


    const start = req.query.start
    const step = req.query.step


    const filter = {}

if (filterBySell){
    filter.sell=filterBySell
    console.log(filterBySell)

}
if (minprice){ 
    filter.price= { $gt: minprice }
    console.log(filter)

}
if (maxprice){ 
    filter.price= { $lt: maxprice }
    console.log(filter)

}
if (minprice && maxprice){ 
    filter.price= { $gt: minprice,$lt: maxprice }
    console.log(filter)

}



    const ads = await Ad.show(filter, start, step)
    res.json({result:ads});
} catch (error) {
    next(error)
}   
});

module.exports = router;
