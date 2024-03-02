/* This code snippet is a part of a Node.js application using the Express framework. Here's a breakdown
of what it does: */
const express = require('express');
const validate = require('../lib/validation');
const { validationResult } = require('express-validator');

const router = express.Router();
const Ad = require('../model/Ads');

/* GET home page. */
/* This code snippet defines a route handler for a GET request to the root URL ('/'). Here's a
breakdown of what it does: */
router.get('/', validate.queryValidator,  async (req, res, next) => {
    try {
        /* The line `validationResult(req).throw();` is checking for validation errors in the request
        object `req` using the `express-validator` library. */
        validationResult(req).throw();
        const data = await Ad.show(req.query);
        const title = 'Nodepop';
        res.render('index', { title, data });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
