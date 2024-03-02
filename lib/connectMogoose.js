/* This code snippet is setting up a connection to a MongoDB database using Mongoose, which is an
Object Data Modeling (ODM) library for MongoDB and Node.js. Here's a breakdown of what each part of
the code is doing: */

const mongoose = require('mongoose');
// en caso de evento error
mongoose.connection.on('error', err => {
    console.log('Error de conexión ', err);
});
// en caso de evento open
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});
// Realizar conexion
/* The code `mongoose.connect('mongodb://127.0.0.1:27017/nodepopDB');` is establishing a connection to
a MongoDB database named 'nodepopDB' running on the local machine at the address '127.0.0.1' and
port '27017'. This line of code initiates the connection process to the MongoDB database using
Mongoose. */
mongoose.connect('mongodb://127.0.0.1:27017/nodepopDB');
module.exports = mongoose.connection;