/**
 * Este archivo levanta nuestra aplicación
 */

const express = require('express')

//Llamamos a los enrutadores
const peliculaRouter = require('./routes/peliculaRouter')


const app = express()
const PORT = process.env.PORT || 3000 //puerto para la APP

//Definimos la comunicación en JSON
app.use(express.json())


//Rutas para las API's
app.use('/api/peliculas', peliculaRouter)

//iniciamos el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor iniciado http://localhost:${PORT}`)
})