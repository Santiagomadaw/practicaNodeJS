const connection = require('../lib/connectMogoose');
const Ad = require('../model/Ads');
const data = require('./startedDB.json')

async function initAd() {
    // Borra todos los anuncios de la base de datos
    const del = await Ad.deleteMany();
    console.log(`Se han borrado ${del.deletedCount}.`);

    // Añade anuncios

    const insertAds = await Ad.insertMany(data);
    console.log(`Se han creado ${insertAds.length} anuncios.`);
}

async function main() {
    await initAd();
    connection.close();
}

main().catch((err) => console.log(`Hubo un error ${err}`));
