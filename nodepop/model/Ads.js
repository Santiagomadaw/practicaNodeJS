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
    if(start){
    query.skip(start)}
    if(step){
    query.limit(step);}
    return query.exec()
    
}

adSchema.statics.filter = function(query){
    const filterBySell = query.sell
    const filterBytag = query.tags
    const minprice = query.min
    const maxprice = query.max
    const start = query.start
    const step = query.step
    const filterByName = query.tittle
    const filterByNameStart = query.tittleStart
    const filterByPrice = query.price
    
    const filter = {}
    //filtro por anuncios que incluyen en cualqueir parte una determinada cadena de caracteres
    if (filterByName){
        console.log(filterByName)
        filter.name = new RegExp(`${filterByName}`, "i")
        console.log(filter)
    }
    //filtro por anuncios que empiezan por una determinada cadena de caracteres
    if (filterByNameStart){
        console.log(filterByName)
        filter.name = new RegExp(`^${filterByNameStart}`, "i")
        console.log(filter)
    }
    //filtro por tipo de anuncio compra o venta
    if (filterBySell){
        filter.sell=filterBySell
    }
    //filtro por precio maximo y minimo
    if (minprice){ 
        filter.price = {}
        filter.price.$gte= minprice 
    }
    if (maxprice){
        filter.price = filter.price || {};
        filter.price.$lte= maxprice
    }
    //filtro por precio fijo
    if (filterByPrice) {
        filter.price = filterByPrice
    }
    //filtro por tags
    if (filterBytag){
        filter.tags = filterBytag
    }
    return ([filter,start,step])
    }




//creo modelo anuncio
const Ad =mongoose.model('Ad', adSchema)

// exporto el modelo

module.exports = Ad



