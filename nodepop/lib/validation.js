const { query, body } = require("express-validator");


const validate={
    bodyValidator: [
        body("name").notEmpty().optional().isString().withMessage("must be string"),
        body("photo").notEmpty().optional().isString().withMessage("must be string"),
        body("price").notEmpty().optional().isNumeric().withMessage("must be numeric"),
        body("sell").notEmpty().optional().isBoolean().withMessage("solo son validos los valores true o false"),
        body("tags").notEmpty().optional().custom((value)=>{
            value = Array.isArray(value) ? value : [value];
            return value.every(element => ["lifestyle", "mobile", "motor", "work"].includes(element));
        }).withMessage("Solo tags permitidos - lifestyle - mobile  - motor - work")
    ],
    bodyValidatorAll: [
        body("name").notEmpty().isString().withMessage("must be string"),
        body("photo").notEmpty().isString().withMessage("must be string"),
        body("price").notEmpty().isNumeric().withMessage("must be numeric"),
        body("sell").notEmpty().isBoolean().withMessage("solo son validos los valores true o false"),
        body("tags").notEmpty().custom((value)=>{
            value = Array.isArray(value) ? value : [value];
            return value.every(element => ["lifestyle", "mobile", "motor", "work"].includes(element));
        }).withMessage("Solo tags permitidos - lifestyle - mobile  - motor - work")
    ],
    queryValidator:[
        query("name").notEmpty().optional().isString().withMessage("must be string"),
        query("photo").notEmpty().optional().isString().withMessage("must be string"),
        query("start").notEmpty().optional().isNumeric().withMessage("must be numeric"),
        query("step").notEmpty().optional().isNumeric().withMessage("must be numeric"),
        query("min").notEmpty().optional().isNumeric().withMessage("must be numeric"),
        query("max").notEmpty().optional().isNumeric().withMessage("must be numeric"),
        query("price").notEmpty().optional().isNumeric().withMessage("must be numeric"),
        query("sell").notEmpty().optional().isBoolean().withMessage("solo son validos los valores true o false"),
        query("tags").notEmpty().optional().custom((value)=>{
            value = Array.isArray(value) ? value : [value];
            return value.every(element => ["lifestyle", "mobile", "motor", "work"].includes(element));
        }).withMessage("Solo tags permitidos - lifestyle - mobile  - motor - work")
    ]
};
module.exports = validate;

