# 🚀API RESTfull con Express, mysql y nodemon.
## 🗄️Base de Datos
Primero vamos a necesitar crear esta Base de datos:
```SQL
-- Creación de la Base de Datos
CREATE DATABASE tarea_08;
USE tarea_08;

-- Creación de las tablas
CREATE TABLE peliculas(
	id 				INT PRIMARY KEY AUTO_INCREMENT,
	nombre 			VARCHAR(45) NOT NULL,
	sinopsis 		VARCHAR(300) NOT NULL,
    genero 			VARCHAR(50) NOT NULL,
    director 		VARCHAR(45) NOT NULL,
    calificacion 	ENUM('1', '2', '3', '4', '5'),
    duracion 		TINYINT UNSIGNED NOT NULL COMMENT 'La duracion se esta registrando en minutos'
)ENGINE =  INNODB;

-- Insercción de registros
INSERT INTO peliculas(nombre, sinopsis, genero, director, calificacion, duracion) VALUES
('Avengers: Infinity War', 
'Un nuevo peligro acecha procedente de las sombras del cosmos. 
Thanos, el infame tirano intergaláctico, tiene como objetivo reunir las seis Gemas del Infinito, 
artefactos de poder inimaginable, y usarlas para imponer su perversa voluntad a toda la existencia.',
'Superhéroes',
'Anthony Russo y Joe Russo',
'4', 
156);

-- Consulta para verificar que los datos se insertarón
SELECT * FROM peliculas; 
```
## 📂Instalación de modulós
Con la BD lista, continuamos con la instalación de los módulos que vamos a necesitar. Para ello ejecutamos el siguiente comando:
```bash
npm install
```
## ⚙️Configuración de variables de entorno
Continuamos con la configuración del archivo `.env`. En nuestro proyecto encontramos un archivo similar: `.env.example`. Renombramos este archivo a `.env` y pegamos lo siguiente:
```js
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=tarea_08
DB_PORT=3306
```
## ▶️Ejecución del Proyecto
Para levantar el proyecto solamente necesita ejecutar el siguiente comando:
```bash
nodemon server
```
En caso de no tener nodemon instalado también se puede ejecutar con node.js:
```bash
node server.js
```