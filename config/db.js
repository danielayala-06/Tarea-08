/**
 * Usamos este archivo para crear un pool de conexiones y reutilizarlas
*/
    

//Accedemos al archivo .env para obtener las variables de entorno y establecer la conexión con la BD
require('dotenv').config()

//Referenciamos un modulo de mysql2 para el manejo de promesas(una acción que tardara un tiempo en resolverse)
const mysql = require('mysql2/promise')


//Pool de conexiones = acceso
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

//Aprovechar el recurso en otra parte de la App
module.exports = pool