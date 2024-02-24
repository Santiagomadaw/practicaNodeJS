const mongoose = require('mongoose');


//defino el esquema de anuncios
const adSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String]
}) 

//metodo para mostrar los anuncios
adSchema.statics.show = function(filter,start,step){

    const query = Ad.find(filter);
    query.skip(start);
    query.limit(step);
    return query.exec()
    
}





//creo modelo anuncio
const Ad =mongoose.model('Ad', adSchema)

// exporto el modelo

module.exports = Ad



