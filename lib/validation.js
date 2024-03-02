const { query, body } = require('express-validator');
const Ad = require('../model/Ads');


const validate = {
    bodyValidator: [
        body('name').notEmpty().optional().isString().withMessage('debe ser una cadena de texto'),
        body('photo').notEmpty().optional().isString().withMessage('debe ser una cadena de texto'),
        body('price').notEmpty().optional().isNumeric().withMessage('debe ser un numero'),
        body('sell').notEmpty().optional().isBoolean().withMessage('solo son validos los valores true o false'),
        body('tags').notEmpty().optional().custom((value) => {
            value = Array.isArray(value) ? value : [value];
            return value.every(element => ['lifestyle', 'mobile', 'motor', 'work'].includes(element));
        }).withMessage('Solo tags permitidos - lifestyle - mobile  - motor - work')
    ],
    bodyValidatorAll: [
        body('name').notEmpty().isString().withMessage('debe ser una cadena de texto'),
        body('photo').notEmpty().isString().withMessage('debe ser una cadena de texto'),
        body('price').notEmpty().isNumeric().withMessage('debe ser un numero'),
        body('sell').notEmpty().isBoolean().withMessage('solo son validos los valores true o false'),
        body('tags').notEmpty().custom((value) => {
            value = Array.isArray(value) ? value : [value];
            return value.every(element => ['lifestyle', 'mobile', 'motor', 'work'].includes(element));
        }).withMessage('Solo tags permitidos - lifestyle - mobile  - motor - work')
    ],
    queryValidator: [
        query('tittie').notEmpty().optional().isString().withMessage('debe ser una cadena de texto'),
        query('tittleStart').notEmpty().optional().isString().withMessage('debe ser una cadena de texto'),
        query('start').notEmpty().optional().isNumeric().withMessage('debe ser un numero'),
        query('step').notEmpty().optional().isNumeric().withMessage('debe ser un numero'),
        query('max').notEmpty().optional().custom((value, { req }) => {
            return isNaN(parseInt(req.query.min)) || (parseInt(value) > parseInt(req.query.min));
        }).withMessage('El valor minimo no puede ser mayor que el maximo'),
        query('min').notEmpty().optional().isNumeric().withMessage('debe ser un numero'),
        query('max').notEmpty().optional().isNumeric().withMessage('debe ser un numero'),
        query('price').notEmpty().optional().isNumeric().withMessage('debe ser un numero'),
        query('sell').notEmpty().optional().isBoolean().withMessage('solo son validos los valores true o false'),
        query('tags').notEmpty().optional().custom((value) => {
            value = Array.isArray(value) ? value : [value];
            return value.every(element => ['lifestyle', 'mobile', 'motor', 'work'].includes(element));
        }).withMessage('Solo tags permitidos - lifestyle - mobile  - motor - work'),
        query('sort').notEmpty().optional().custom((value) => {
            value = value[0] === '-' ? value.slice(1) : value;
            return Object.keys(Ad.schema.obj).includes(value);
        }).withMessage('Parametro de ordenacion no valido')
    ]
};
module.exports = validate;

