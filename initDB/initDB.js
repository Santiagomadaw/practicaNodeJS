/* eslint-disable no-undef */
/**
 * The JavaScript code initializes a database by deleting existing ads and inserting new ads from a
 * JSON file.
 */
'use strict';

const connection = require('../lib/connectMogoose');
const readline = require('node:readline');
const Ad = require('../model/Ads');
const data = require('./startedDB.json');

/**
 * The `secureQuestion` function takes a text input, prompts the user for a response, and resolves a
 * promise with a boolean value indicating whether the user's response is 'si' (case-insensitive).
 * @param text - The `secureQuestion` function takes a `text` parameter, which is the question that
 * will be displayed to the user when prompting for input. This question should be a string that
 * prompts the user for a yes or no answer.
 * @returns The function `secureQuestion` is returning a Promise.
 */
function secureQuestion (text) {
    return new Promise((resolve) => {
        // conectar readline con la consola
        const readInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readInterface.question(text, answer => {
            readInterface.close();
            resolve(answer.toLowerCase() === 'si');
        });
    });
}

async function initAd () {
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
async function main () {
    await new Promise (resolve => connection.once ('open', resolve));
    
    const deleleAll = await secureQuestion ('Estas seguro de que deseas borrar todo el contenido de la base de datos? (si/NO) ');

    if (!deleleAll){

        /* The line `process.exit();` is a Node.js method that terminates the current process with an exit code
        of 0. This means that it will stop the execution of the program and exit the Node.js process. In
        this specific context within the code snippet provided, if the user does not confirm the deletion of
        all content in the database by entering 'si', the program will exit without further execution. 
        you can use it directly since process is a global object in Node.js and is available in all JavaScript 
        files running in the Node.js environment.*/
        process.exit();

    }else{
        await initAd();
        connection.close();
        
    }
}

/* The line `main().catch((err) => console.log(`Hubo un error `));` is handling any errors that
occur during the execution of the `main()` function.*/
main().catch((err) => console.log(`Hubo un error ${err}`));
