/* This code snippet is defining a Mongoose schema for advertisements (anuncios in Spanish). It
includes fields like name, sell (indicating if the item is for sale), price, photo, and tags. The
tags field is an array of strings with specific values allowed ('lifestyle', 'mobile', 'motor',
'work'). */
const mongoose = require('mongoose');

/* This code snippet is defining a Mongoose schema for advertisements. It is specifying the structure
of the data that will be stored in the MongoDB database for advertisements. */
const adSchema = mongoose.Schema({
    name: {type: String, required: true},
    sell: {type: Boolean, required: true},
    price: {type: Number, required: true},
    photo: {type: String, required: true},
    tags: {type: [String], required: true, enum: {
        values: ['lifestyle', 'mobile', 'motor', 'work'],
    }},
});

/* This `adSchema.statics.filter` function is a static method defined on the `adSchema` schema. It is
used to filter advertisements based on the provided query parameters. Here's a breakdown of what the
function is doing: */
adSchema.statics.filter = function(query) {
    const sort = query.sort;
    const filterBySell = query.sell;
    const filterBytag = query.tags;
    const minprice = query.min;
    const maxprice = query.max;
    const filterByPrice = query.price;
    const filterByName = query.tittle;
    const filterByNameStart = query.tittleStart;
    const {start} = query;
    const {step} = query;
    const filter = {};

    if (filterByName) {
        filter.name = new RegExp(`${filterByName}`, 'i');
    }
    if (filterByNameStart) {
        filter.name = new RegExp(`^${filterByNameStart}`, 'i');
    }
    if (filterBySell) {
        filter.sell = filterBySell;
    }
    if (minprice) {
        filter.price = {};
        filter.price.$gte = minprice;
    }
    if (maxprice) {
        filter.price = filter.price || {};
        filter.price.$lte = maxprice;
    }
    if (filterByPrice) {
        filter.price = filterByPrice;
    }
    if (filterBytag) {
        filter.tags = {$all:filterBytag};
    }
    return {filter, start, step, sort};
};

/* This `adSchema.statics.show` function is a static method defined on the `adSchema` schema. It is
used to retrieve and display advertisements based on the provided query parameters. Here's a
breakdown of what the function is doing: */


adSchema.statics.show = function(query) {
    const queriesfilter= Ad.filter(query);
    const step = queriesfilter.step;
    const sort = queriesfilter.sort;
    const start = queriesfilter.start;
    const filter = queriesfilter.filter;
    const response = Ad.find(filter);

    if (start) {
        response.skip(start);
    }
    if (step) {
        response.limit(step);
    }
    response.sort(sort);
    return response.exec();
};


// creo modelo anuncio
const Ad = mongoose.model('Ad', adSchema);

// exporto el modelo

module.exports = Ad;
