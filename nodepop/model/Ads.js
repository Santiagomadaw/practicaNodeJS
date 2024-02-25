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
    console.log(filterBytag)


    const filter = {}

if (filterBySell){
    filter.sell=filterBySell

}
if (minprice){ 
    filter.price= { $gt: minprice }

}
if (maxprice){ 
    filter.price= { $lt: maxprice }
}
if (minprice && maxprice){ 
    filter.price= { $gt: minprice,$lt: maxprice }
}
if (filterBytag){
    filter.tags = filterBytag
}
return ([filter,start,step])
}




//creo modelo anuncio
const Ad =mongoose.model('Ad', adSchema)

// exporto el modelo

module.exports = Ad



