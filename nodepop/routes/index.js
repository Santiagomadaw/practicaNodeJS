const express = require("express");

const router = express.Router();
const Ad = require("../model/Ads");

/* GET home page. */
router.get("/", async (req, res, next) => {
    try {
        const data = await Ad.filter(req.query);
        const title = "Nodepop";
        res.render("index", { title, data });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
