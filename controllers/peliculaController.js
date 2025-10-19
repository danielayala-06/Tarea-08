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

//Obtener pelicula por ID
exports.getPeliculaById = async (req, res)=>{
    const {id} = req.params

    //SQL
    const SQL = 'SELECT * FROM peliculas WHERE ID =?'

    try {
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

//Crea una pelicula
exports.createPelicula = async (req, res)=>{
    const {nombre, sinopsis, genero, director, calificacion, duracion} = req.body

    const SQL = 'INSERT INTO peliculas(nombre, sinopsis, genero, director, calificacion, duracion) VALUES (?, ?, ?, ?, ?, ?)'
    try {
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

//Edita una pelicula
exports.editPelicula = async (req, res) => {
    const {id} = req.params
    const {nombre, sinopsis, genero, director, calificacion, duracion} = req.body

    const SQL = 'UPDATE peliculas SET nombre=?, sinopsis=?, genero=?, director=?, calificacion=?, duracion=? WHERE id=?'

    try {
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

exports.deletePelicual = async(req, res)=>{
    const {id} = req.params
    //
    const SQL = 'DELETE FROM peliculas WHERE id=?'

    try {
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