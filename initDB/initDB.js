/**
 * The JavaScript code initializes a database by deleting existing ads and inserting new ads from a
 * JSON file.
 */
const connection = require('../lib/connectMogoose');
const Ad = require('../model/Ads');
const data = require('./startedDB.json')

async function initAd() {
    /* The line `const del = await Ad.deleteMany();` is deleting all documents from the Ad collection
    in the database. */
    const del = await Ad.deleteMany();
    console.log(`Se han borrado ${del.deletedCount}.`);

    // Añade anuncios

    /* The line `const insertAds = await Ad.insertMany(data);` is inserting multiple documents into the
    Ad collection in the database. */
    const insertAds = await Ad.insertMany(data);
    console.log(`Se han creado ${insertAds.length} anuncios.`);
}

/**
 * The main function asynchronously initializes an ad and then closes the connection.
 */
async function main() {
    await initAd();
    connection.close();
}

/* The line `main().catch((err) => console.log(`Hubo un error `));` is handling any errors that
occur during the execution of the `main()` function.*/
main().catch((err) => console.log(`Hubo un error ${err}`));
