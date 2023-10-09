// routes/playerRoutes.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db'); // Import the connection object


// Ruta: GET /players
router.get('/', (req, res) => {
  try {
    // Query the database to retrieve the list of players
    const query = 'SELECT * FROM users where role =  "player"'; // Modify this query according to your table structure
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching players:', error);
        return res.status(500).json({ message: 'Error fetching players', error });
      }

      // Send the list of players as a JSON response
      res.json({ message: 'Lista de jugadores', players: results });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});


// Ruta: GET /players/:id
router.get('/:id', (req, res) => {
  try {
    const playerId = req.params.id;

    // Query the database to retrieve the details of the player with the specified ID
    const query = 'SELECT * FROM users WHERE user_id = ?';
    connection.query(query, [playerId], (error, results) => {
      if (error) {
        console.error('Error fetching player details:', error);
        return res.status(500).json({ message: 'Error fetching player details', error });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Player not found' });
      }

      // Send the player details as a JSON response
      res.json({ message: 'Player details', player: results[0] });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});


// Ruta: POST /players
router.post('/', (req, res) => {
  try {
    // Obtener los datos del nuevo jugador desde el cuerpo de la solicitud
    const { f_name, l_name, email, password, dni, date_of_birth, role } = req.body;

    // Check if all required fields are present in the request body
    if (!f_name || !l_name || !email || !password || !dni || !date_of_birth || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const currentTimestamp = new Date().toISOString();
    // Insertar el nuevo jugador en la base de datos
    const query = `INSERT INTO users (f_name, l_name, email, password, dni, date_of_birth, created_at, updated_at, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [f_name, l_name, email, password, dni, date_of_birth,currentTimestamp,currentTimestamp, role ];
    console.log(req.body);
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error inserting new player:', error);
        return res.status(500).json({ message: 'Error al registrar el jugador', error });
      } else {
        res.status(201).json({ message: 'Jugador creado correctamente', player: { id: results.insertId, f_name, l_name, date_of_birth, dni, role } });
      }
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});


// Ruta: PUT /players/:id
router.put('/:id', (req, res) => {
  try {
    const playerId = req.params.id;
    const { f_name, l_name, email, password, dni, date_of_birth, role } = req.body;

    // Check if all required fields are present in the request body
    if (!f_name || !l_name || !email || !password || !dni || !date_of_birth || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Update the player's details in the database, including updated_at
    const query = `
      UPDATE users
      SET f_name = ?, l_name = ?, email = ?, password = ?, dni = ?, date_of_birth = ?, role = ?, updated_at = NOW()
      WHERE user_id = ?
    `;
    const values = [f_name, l_name, email, password, dni, date_of_birth, role, playerId];
    
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating player:', error);
        return res.status(500).json({ message: 'Error updating player', error });
      }
      
      res.json({ message: `Jugador con ID ${playerId} actualizado correctamente` });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});


// Ruta: DELETE /players/:id
router.delete('/:id', (req, res) => {
  try {
    const playerId = req.params.id;

    // Query the database to delete the player with the specified ID
    const query = 'DELETE FROM users WHERE user_id = ?';
    connection.query(query, [playerId], (error, results) => {
      if (error) {
        console.error('Error deleting player:', error);
        return res.status(500).json({ message: 'Error deleting player', error });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Player not found' });
      }

      // Send a success response
      res.json({ message: 'Player deleted successfully' });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});

module.exports = router;
