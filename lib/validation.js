const { query, body } = require('express-validator');
const Ad = require('../model/Ads');


const validate = {
    bodyValidator: [
        body('name').notEmpty().optional().isString().withMessage('must be a string.'),
        body('photo').notEmpty().optional().isString().withMessage('must be a string.'),
        body('price').notEmpty().optional().isNumeric().withMessage('must be a number.'),
        body('sell').notEmpty().optional().isBoolean().withMessage('only "true" or "false" values are alowed.'),
        body('tags').notEmpty().optional().custom((value) => {
            value = Array.isArray(value) ? value : [value];
            return value.every(element => Ad.schema.obj.tags.enum.values.includes(element));
        })
            .withMessage(`use only allowed tags ${Ad.schema.obj.tags.enum.values}`)
    ],
    bodyValidatorAll: [
        body('name').notEmpty().isString().withMessage('must be a string.'),
        body('photo').notEmpty().isString().withMessage('must be a string.'),
        body('price').notEmpty().isNumeric().withMessage('must be a number.'),
        body('sell').notEmpty().isBoolean().withMessage('only "true" or "false" values are alowed.'),
        body('tags').notEmpty().custom((value) => {
            value = Array.isArray(value) ? value : [value];
            return value.every(element => Ad.schema.obj.tags.enum.values.includes(element));
        })
            .withMessage(`use only allowed tags ${Ad.schema.obj.tags.enum.values}`)
    ],
    queryValidator: [
        query('tittie').notEmpty().optional().isString().withMessage('must be a string.'),
        query('tittleStart').notEmpty().optional().isString().withMessage('must be a string.'),
        query('start').notEmpty().optional().isNumeric().withMessage('must be a number.'),
        query('step').notEmpty().optional().isNumeric().withMessage('must be a number.'),
        query('price').notEmpty().optional().custom( value => !isNaN(value) || value.includes('-'))
            .withMessage('must be a number or match the format number-number, number- or -number.'),
        query('price').notEmpty().optional().custom((value)=>{{
            const min=value.split('-')[0];
            const max = value.split('-')[1];
            return  min<=max ||max === '';
        }})
            .withMessage('first value must be lower than second'),
        query('price').notEmpty().optional().custom((value)=>{{
            const min=value.split('-')[0];
            const max = value.split('-')[1];
            return  !isNaN(min) && !isNaN(max);
        }})
            .withMessage('only numbers alowed number-number'),
        query('sell').notEmpty().optional().isBoolean().withMessage('only "true" or "false" values are alowed.'),
        query('tags').notEmpty().optional().custom((value) => {
            value = Array.isArray(value) ? value : [value];
            return value.every(element => Ad.schema.obj.tags.enum.values.includes(element));
        }).withMessage(`use only allowed tags ${Ad.schema.obj.tags.enum.values}`),
        query('sort').notEmpty().optional().custom((value) => {
            value = value[0] === '-' ? value.slice(1) : value;
            return Object.keys(Ad.schema.obj).includes(value);
        })
            .withMessage(`only the following sorting parameters allowed: ${Object.keys(Ad.schema.obj)}`)
    ]
};
module.exports = validate;

