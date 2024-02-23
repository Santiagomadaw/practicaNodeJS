const mongoose = require('mongoose');

//defino el esquema de anuncios
const adSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String]
}) 

//creo modelo anuncio
const Ad =mongoose.model('Ad', adSchema)



// exporto el modelo

module.exports = Ad



