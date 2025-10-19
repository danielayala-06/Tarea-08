CREATE DATABASE tarea_08;
USE tarea_08;

-- Creación de las tablas
CREATE TABLE peliculas(
	id 				INT PRIMARY KEY AUTO_INCREMENT,
	nombre 			VARCHAR(45) NOT NULL,
	sinopsis 		VARCHAR(300) NOT NULL,
    genero 			VARCHAR(50) NOT NULL,
    director 		VARCHAR(45) NOT NULL,
    calificacion 	ENUM('1', '2','3', '4', '5'),
    duracion 		TINYINT UNSIGNED NOT NULL COMMENT 'La duracion se esta registrando en minutos'
)ENGINE =  INNODB;

INSERT INTO peliculas(nombre, sinopsis, genero, director, calificacion, duracion) VALUES
('Avengers: Infinity War', 
'Un nuevo peligro acecha procedente de las sombras del cosmos. 
Thanos, el infame tirano intergaláctico, tiene como objetivo reunir las seis Gemas del Infinito, 
artefactos de poder inimaginable, y usarlas para imponer su perversa voluntad a toda la existencia.',
'Superhéroes',
'Anthony Russo y Joe Russo',
'4', 
156);

SELECT * FROM peliculas;