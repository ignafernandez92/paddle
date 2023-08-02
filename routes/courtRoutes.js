// routes/courtRoutes.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// Ruta: GET /courts
router.get('/', (req, res) => {
  try {
    // Obtener el ID del club desde la consulta de parámetros (query string)
    const clubId = req.query.clubId;

    // Configurar la conexión a la base de datos utilizando las variables de entorno
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Abrir la conexión a la base de datos
    connection.connect();

    // Obtener la lista de canchas del club desde la base de datos
    const query = `SELECT * FROM courts WHERE clubId = ?`;
    connection.query(query, [clubId], (error, results) => {
      if (error) {
        res.status(400).json({ message: 'Error al obtener la lista de canchas', error });
      } else {
        res.status(200).json({ message: 'Lista de canchas', courts: results });
      }
    });

    // Cerrar la conexión a la base de datos
    connection.end();
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener la lista de canchas', error });
  }
});

// Ruta: GET /courts/:id
router.get('/:id', (req, res) => {
  // Lógica para obtener los detalles de una cancha específica por su ID desde la base de datos o almacenamiento
  // y enviarlos como respuesta en formato JSON
  const courtId = req.params.id;
  res.json({ message: `Detalles de la cancha con ID ${courtId}` });
});

// Ruta: POST /courts
router.post('/', (req, res) => {
  // Lógica para agregar una nueva cancha con los datos proporcionados en el cuerpo de la solicitud
  // y enviar la respuesta con los detalles de la cancha creada
  res.json({ message: 'Cancha creada correctamente' });
});

// Ruta: PUT /courts/:id
router.put('/:id', (req, res) => {
  // Lógica para actualizar los detalles de una cancha específica por su ID con los datos proporcionados en el cuerpo de la solicitud
  // y enviar la respuesta con los detalles actualizados
  const courtId = req.params.id;
  res.json({ message: `Cancha con ID ${courtId} actualizada correctamente` });
});

// Ruta: DELETE /courts/:id
router.delete('/:id', (req, res) => {
  // Lógica para eliminar una cancha específica por su ID desde la base de datos o almacenamiento
  // y enviar la respuesta con un mensaje de éxito
  const courtId = req.params.id;
  res.json({ message: `Cancha con ID ${courtId} eliminada correctamente` });
});

module.exports = router;
