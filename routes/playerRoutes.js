// routes/playerRoutes.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db'); // Import the connection object


// Ruta: GET /players
router.get('/', (req, res) => {
  // Lógica para obtener la lista de jugadores desde la base de datos o almacenamiento
  // y enviarla como respuesta en formato JSON
  res.json({ message: 'Lista de jugadores' });
});

// Ruta: GET /players/:id
router.get('/:id', (req, res) => {
  // Lógica para obtener los detalles de un jugador específico por su ID desde la base de datos o almacenamiento
  // y enviarlos como respuesta en formato JSON
  const playerId = req.params.id;
  res.json({ message: `Detalles del jugador con ID ${playerId}` });
});

// Ruta: POST /players
router.post('/', (req, res) => {
  try {
    // Obtener los datos del nuevo jugador desde el cuerpo de la solicitud
    const { f_name, l_name, email, password, dni } = req.body;

    // Check if all required fields are present in the request body
    if (!f_name || !l_name || !email || !password || !dni) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Insertar el nuevo jugador en la base de datos
    const query = `INSERT INTO users (f_name, l_name, email, password, dni) VALUES (?, ?, ?, ?, ?)`;
    const values = [f_name, l_name, email, password, dni];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error inserting new player:', error);
        return res.status(500).json({ message: 'Error al registrar el jugador', error });
      } else {
        res.status(201).json({ message: 'Jugador creado correctamente', player: { id: results.insertId, f_name, l_name, dni } });
      }
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});


// Ruta: PUT /players/:id
router.put('/:id', (req, res) => {
  // Lógica para actualizar los detalles de un jugador específico por su ID con los datos proporcionados en el cuerpo de la solicitud
  // y enviar la respuesta con los detalles actualizados
  const playerId = req.params.id;
  res.json({ message: `Jugador con ID ${playerId} actualizado correctamente` });
});

// Ruta: DELETE /players/:id
router.delete('/:id', (req, res) => {
  // Lógica para eliminar un jugador específico por su ID desde la base de datos o almacenamiento
  // y enviar la respuesta con un mensaje de éxito
  const playerId = req.params.id;
  res.json({ message: `Jugador con ID ${playerId} eliminado correctamente` });
});

module.exports = router;
