const mongoose = require("mongoose");


// en caso de evento error
mongoose.connection.on("error", err => {
    console.log("Error de conexión ", err);
});
// en caso de evento open
mongoose.connection.once("open", () => {
    console.log("Conectado a MongoDB en", mongoose.connection.name);
});
// Realizar conexion
mongoose.connect("mongodb://127.0.0.1:27017/nodepopDB");

module.exports = mongoose.connection;