const mongoose = require('mongoose');

// Defino el esquema de anuncios
const adSchema = mongoose.Schema({
    name: {type: String, required: true},
    sell: {type: Boolean, required: true},
    price: {type: Number, required: true},
    photo: {type: String, required: true},
    tags: {type: [String], required: true, enum: {
        values: ['lifestyle', 'mobile', 'motor', 'work'],
    }},
});

// metodo para mostrar los anuncios
adSchema.statics.show = function(filter, start, step, sort) {
    const query = Ad.find(filter);
    if (start) {
        query.skip(start);
    }
    if (step) {
        query.limit(step);
    }
    query.sort(sort);
    return query.exec();
};

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
    // filtro por anuncios que incluyen en cualquier parte una
    // determinada cadena de caracteres
    if (filterByName) {
        filter.name = new RegExp(`${filterByName}`, 'i');
    }
    // filtro por anuncios que empiezan por una determinada cadena de caracteres
    if (filterByNameStart) {
        filter.name = new RegExp(`^${filterByNameStart}`, 'i');
    }
    // filtro por tipo de anuncio compra o venta
    if (filterBySell) {
        filter.sell = filterBySell;
    }
    // filtro por precio maximo y minimo
    if (minprice) {
        filter.price = {};
        filter.price.$gte = minprice;
    }
    if (maxprice) {
        filter.price = filter.price || {};
        filter.price.$lte = maxprice;
    }
    // filtro por precio fijo
    if (filterByPrice) {
        filter.price = filterByPrice;
    }
    // filtro por tags
    if (filterBytag) {
        filter.tags = {$all:filterBytag};
    }
    return Ad.show(filter, start, step, sort);
};

// creo modelo anuncio
const Ad = mongoose.model('Ad', adSchema);

// exporto el modelo

module.exports = Ad;
