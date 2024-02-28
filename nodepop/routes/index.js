const express = require("express");
const validate = require("../lib/validation");
const { validationResult } = require("express-validator");

const router = express.Router();
const Ad = require("../model/Ads");

/* GET home page. */
router.get("/", validate.queryValidator,  async (req, res, next) => {
    try {
        validationResult(req).throw(); // lanza excepción si hay errores de validación

        const data = await Ad.filter(req.query);
        const title = "Nodepop";
        res.render("index", { title, data });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
