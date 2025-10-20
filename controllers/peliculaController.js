/**
 * Este archivo tendra toda la logica de nuestra aplicación(crear, leer, modificar y eliminar)
 */

//Primero obtenemos el pool de conexiones de nuestro archivo db.js
const db = require("../config/db");

//Esta objeto nos servirar para hacer validaciones
const data = {
  nombre: {
    maxLength: 45,
    type: "string",
  },
  sinopsis: {
    maxLength: 300,
    type: "string",
  },
  genero: {
    maxLength: 50,
    type: "string",
  },
  director: {
    maxLength: 45,
    type: "string",
  },
  calificacion: {
    maxValue: 5,
    type: "int",
  },
  duracion: {
    maxValue: 250,
    type: "int",
  },
};

//Funcion para validar los campos del body
function campoEsValido(dataFormat, campo) {
  //En caso de estar vacio
  if (campo === undefined) {
    return false;
  }
  //Condicion para los campos tipo int
  if (dataFormat.type == "int") {
    return campo < dataFormat.maxValue ? true : false;
  }
  //Condicion para los campos string
  return campo.length < dataFormat.maxLength ? true : false;
}

//Obtener todas las peliculas registradas
exports.getAllPeliculas = async (req, res) => {
  //Creamos la instruccion sql para obtener los datos de la tabla peliculas
  const SQL = "SELECT * FROM peliculas";
  try {
    const [result] = await db.query(SQL);
    if (result.length === 0) {
      return res.status(402).json({
        mensaje: "No se encotraron registros",
      });
    }
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
    });
  }
};

//Obtener una pelicula por ID
exports.getPeliculaById = async (req, res) => {
  //Obtenemos el id que nos pasaraon en la URL
  const { id } = req.params;

  //SQL
  const SQL = "SELECT * FROM peliculas WHERE ID =?";

  try {
    //Guardamos el resultado de nuestra consulta. Para luego mostrarlo por JSON.
    const [result] = await db.query(SQL, [id]);

    if (result.length === 0) {
      return res.status(402).json({
        mensaje: `No se encontro un registro con el id: ${id}`,
      });
    }

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
    });
  }
};

//Crear una pelicula
exports.createPelicula = async (req, res) => {
  //Obtenemos los valores que nos pasarón en el JSON mediante el body.
  const { nombre, sinopsis, genero, director, calificacion, duracion } =
    req.body;

  const SQL =
    "INSERT INTO peliculas(nombre, sinopsis, genero, director, calificacion, duracion) VALUES (?, ?, ?, ?, ?, ?)";

  //Validaciones para los campos
  if (!campoEsValido(data.nombre, nombre)) {
    return res.status(400).json({
      mensaje: `El campo nombre no puede tener mas de ${data.nombre.maxLength} caracteres ni estar vacio`,
    });
  }
  if (!campoEsValido(data.sinopsis, sinopsis)) {
    return res.status(400).json({
      mensaje: `El campo sinopsis no puede tener mas de ${data.sinopsis.maxLength} caracteres ni estar vacio`,
    });
  }
  if (!campoEsValido(data.genero, genero)) {
    return res.status(400).json({
      mensaje: `El campo genero no puede tener mas de ${data.genero.maxLength} caracteres ni estar vacio`,
    });
  }
  if (!campoEsValido(data.director, director)) {
    return res.status(400).json({
      mensaje: `El campo director no puede tener mas de ${data.director.maxLength} caracteres ni estar vacio`,
    });
  }
  if (!campoEsValido(data.calificacion, calificacion)) {
    return res.status(400).json({
      mensaje: `El campo calificación solo puede tener estos valores: 1, 2, 3, 4, 5`,
    });
  }
  if (!campoEsValido(data.duracion, duracion)) {
    return res.status(400).json({
      mensaje: `El campo duración no puede ser mayor que ${data.duracion.maxValue} ni estar vacio`,
    });
  }

  try {
    //Validaciones para campos vacios
    if (
      !nombre ||
      !sinopsis ||
      !genero ||
      !director ||
      !calificacion ||
      !duracion
    ) {
      return res.status(500).json({
        mensaje: "Ningun campo puede estar vacio",
      });
    }
    // if(comprobarTipo(nombre, tipo)  typeof(nombre) != 'string' || typeof(sinopsis) != 'string' || typeof(director) != 'string')

    //Ejecutamos la consulta y guardamos los resultados en una constante.
    const [result] = await db.query(SQL, [
      nombre,
      sinopsis,
      genero,
      director,
      calificacion,
      duracion,
    ]);

    if (result.affectedRows === 0) {
      return res.status(500).json({
        mensaje: "No se logro insertar los datos",
      });
    }
    return res.status(200).json({
      mensaje: "Se registro correctamente",
      pk: result.insertId,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
    });
  }
};

//Editar una pelicula
exports.editPelicula = async (req, res) => {
  //Obtenemos el id que nos pasarón en la URL
  const { id } = req.params;

  //Obtenemos los valores del JSON que nos pasarón por el body.
  const { nombre, sinopsis, genero, director, calificacion, duracion } =
    req.body;

  const SQL =
    "UPDATE peliculas SET nombre=?, sinopsis=?, genero=?, director=?, calificacion=?, duracion=? WHERE id=?";

  try {
    //Ejecutamos la consulta y lo guardamos el resultado en una constante.
    const [result] = await db.query(SQL, [
      nombre,
      sinopsis,
      genero,
      director,
      calificacion,
      duracion,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "No se logro Actualizar" });
    }
    return res.status(200).json({
      mensaje: "La pelicula se actualizo correctamente",
    });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

//Eliminar una pelicula por ID
exports.deletePelicula = async (req, res) => {
  //Obtenemos el id por la URL.
  const { id } = req.params;

  //Preparamos la consulta
  const SQL = "DELETE FROM peliculas WHERE id=?";

  try {
    //Ejecutamos la consulta.
    const [result] = await db.query(SQL, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "No se logro encontrar ningun registro con este id",
      });
    }

    return res.status(200).json({
      mensaje: "Se elimino correctamente el registro",
    });
  } catch (e) {
    return res.status(500).json({
      error: e,
    });
  }
};
