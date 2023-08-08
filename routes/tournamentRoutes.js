// routes/tournamentRoutes.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// Ruta: GET /tournaments
router.get('/', (req, res) => {
  // Lógica para obtener la lista de torneos desde la base de datos o almacenamiento
  // y enviarla como respuesta en formato JSON
  res.json({ message: 'Lista de torneos' });
});

// Ruta: GET /tournaments/:id
router.get('/:id', (req, res) => {
  // Lógica para obtener los detalles de un torneo específico por su ID desde la base de datos o almacenamiento
  // y enviarlos como respuesta en formato JSON
  const tournamentId = req.params.id;
  res.json({ message: `Detalles del torneo con ID ${tournamentId}` });
});

// Ruta: POST /tournaments
router.post('/', (req, res) => {
  try {
    // Obtener los datos del nuevo torneo desde el cuerpo de la solicitud
    const { 
      nombre,
      description,
      start_date,
      end_date,
      creator_id,
      prize,
    } = req.body;

    const currentTimestamp = new Date().toISOString();
    // Configurar la conexión a la base de datos utilizando las variables de entorno
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    // Abrir la conexión a la base de datos
    connection.connect();

    // Insertar el nuevo torneo en la base de datos
    const query = `INSERT INTO tournaments (name, description, start_date, end_date, creator_id, prize, created_at, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nombre, description, start_date, end_date, creator_id, prize, currentTimestamp, currentTimestamp];
    connection.query(query, values, (error, results) => {
      if (error) {
        res.status(400).json({ message: 'Error al registrar el torneo', error });
      } else {
        res.status(201).json({ message: 'Torneo registrado correctamente', tournament: { id: results.insertId, nombre, description, creator_id, start_date, end_date, prize} });
      }
    });

    // Cerrar la conexión a la base de datos
    connection.end();
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar el torneo', error });
  }
});

// Ruta: PUT /tournaments/:id
router.put('/:id', (req, res) => {
  // Lógica para actualizar los detalles de un torneo específico por su ID con los datos proporcionados en el cuerpo de la solicitud
  // y enviar la respuesta con los detalles actualizados
  const tournamentId = req.params.id;
  res.json({ message: `Torneo con ID ${tournamentId} actualizado correctamente` });
});

// Ruta: DELETE /tournaments/:id
router.delete('/:id', (req, res) => {
  // Lógica para eliminar un torneo específico por su ID desde la base de datos o almacenamiento
  // y enviar la respuesta con un mensaje de éxito
  const tournamentId = req.params.id;
  res.json({ message: `Torneo con ID ${tournamentId} eliminado correctamente` });
});

module.exports = router;
