/**
 * Este archivo es para definir las rutas, metodos HTTP y lo que hara cada ruta
 */

//cargamos un objeto express para acceder a sus metodos y objetos
const express = require('express')

//Llamamos al un objeto de express para definir las rutas
const router = express.Router()

//Instanciamos un objeto con nuestro clase peliculaController
const peliculaController = require('../controllers/peliculaController')


//Definimos la ruta con el metodo al que llamaremos cuando entremos a la ruta

// objeto router | metodo HTTP | metodo que llamamos al acceder a la ruta
router.get('/', peliculaController.getAllPeliculas)
router.get('/:id', peliculaController.getPeliculaById)
router.post('/', peliculaController.createPelicula)
router.put('/:id', peliculaController.editPelicula)
router.delete('/:id', peliculaController.deletePelicula)

//Exportamos el objeto router
module.exports = router