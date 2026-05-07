const mysql = require("mysql2");
const connection = mysql.createConnection({
 host: "80.241.217.53",
 user: "desarrollador",
 password: "SENATI", 
 database: "cafeteria" 
});
connection.connect((err) => {
 if (err) {
 console.log("Error de conexión:", err);
 } else {
 console.log("Conectado a MySQL");
 }
});
module.exports = connection;