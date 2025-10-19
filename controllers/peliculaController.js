/**
 * Este archivo tendra toda la logica de nuestra aplicación(crear, leer, modificar y eliminar)
 */


//Primero obtenemos el pool de conexiones de nuestro archivo db.js
const db = require('../config/db')

//Obtener todas las peliculas registradas
exports.getAllPeliculas = async (req, res)=>{
    //Creamos la instruccion sql para obtener los datos de la tabla peliculas
    const SQL = 'SELECT * FROM peliculas'
    try {
        const [result] = await db.query(SQL)
        if(!result){
            return res.status(402).json({
                mensaje: 'No se encotraron registros'
            })
        }
        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            error: e
        })
    }
}

//Obtener una pelicula por ID
exports.getPeliculaById = async (req, res)=>{
    //Obtenemos el id que nos pasaraon en la URL
    const {id} = req.params

    //SQL
    const SQL = 'SELECT * FROM peliculas WHERE ID =?'

    try {
        //Guardamos el resultado de nuestra consulta. Para luego mostrarlo por JSON.
        const [result] = await db.query(SQL,[id])

        if(!result){
            return res.status(402).json({
                mensaje: `No se encontro un registro con el id: ${id}`
            })
        }

        return res.status(200).json(result)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            error:e
        })
    }
}

//Crear una pelicula
exports.createPelicula = async (req, res)=>{
    //Obtenemos los valores que nos pasarón en el JSON mediante el body.
    const {nombre, sinopsis, genero, director, calificacion, duracion} = req.body

    const SQL = 'INSERT INTO peliculas(nombre, sinopsis, genero, director, calificacion, duracion) VALUES (?, ?, ?, ?, ?, ?)'
    try {
        //Ejecutamos la consulta y guardamos los resultados en una constante.
        const [result] = await db.query(SQL, [nombre, sinopsis, genero, director, calificacion, duracion])
        
        if(result.affectedRows === 0){
            return res.status(500).json({
                mensaje: 'No se logro insertar los datos'
            })
        }
        return res.status(200).json({
            mensaje: 'Se registro correctamente',
            pk: result.insertId
        })

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            error: e
        })
    }
}

//Editar una pelicula
exports.editPelicula = async (req, res) => {
    //Obtenemos el id que nos pasarón en la URL
    const {id} = req.params

    //Obtenemos los valores del JSON que nos pasarón por el body.
    const {nombre, sinopsis, genero, director, calificacion, duracion} = req.body

    const SQL = 'UPDATE peliculas SET nombre=?, sinopsis=?, genero=?, director=?, calificacion=?, duracion=? WHERE id=?'

    try {
        //Ejecutamos la consulta y lo guardamos el resultado en una constante.
        const [result] = await db.query(SQL, [nombre, sinopsis, genero, director, calificacion, duracion, id]) 
        
        if(result.affectedRows === 0){
            return res.status(404).json({mensaje: 'No se logro Actualizar'})
        }
        return res.status(200).json({
            mensaje: 'La pelicula se actualizo correctamente'
        })
        
    } catch (e) {
        return res.status(500).json({error: e})
    }
}

//Eliminar una pelicula por ID
exports.deletePelicula = async(req, res)=>{
    //Obtenemos el id por la URL.
    const {id} = req.params

    //Preparamos la consulta
    const SQL = 'DELETE FROM peliculas WHERE id=?'

    try {
        //Ejecutamos la consulta.
        const [result] = await db.query(SQL, [id])

        if(result.affectedRows === 0){
            return res.status(404).json({
                mensaje: 'No se logro encontrar ningun registro con este id'
            })
        }

        return res.status(200).json({
            mensaje: 'Se elimino correctamente el registro'
        })
    } catch (e) {
        return res.status(500).json({
            error: e
        })
    }
}