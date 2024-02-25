var express = require('express');
var router = express.Router();
const Ad =require('../model/Ads');


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const filters= await Ad.filter(req.query)
    console.log(filters)
    const data = await Ad.show(filters[0],filters[1],filters[2])
    const title = 'Nodepop'
    res.render('index', {title, data });
  } catch (error) {
    next(error)
  }
  

});

module.exports = router;
