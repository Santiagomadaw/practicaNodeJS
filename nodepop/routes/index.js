var express = require('express');
var router = express.Router();
const Ad =require('../model/Ads');


/* GET home page. */
router.get('/', async function(req, res, next) {
  const data = await Ad.find()
  const title = 'Nodepop'
  res.render('index', {title, data });
});

module.exports = router;
