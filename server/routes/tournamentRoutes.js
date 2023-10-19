

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db');
require('dotenv').config();


router.get('/', (req, res) => {

  res.json({ message: 'Lista de torneos' });
});


router.get('/:id', (req, res) => {
 
  const tournamentId = req.params.id;
  res.json({ message: `Detalles del torneo con ID ${tournamentId}` });
});

// Ruta: POST /tournaments
router.post('/', (req, res) => {
  try {
    const { startDate, endDate, user_id, numberOfPairs, numberOfCourts } = req.body;

    console.log('Received a POST request to create a tournament:', req.body);

    const currentTimestamp = new Date().toISOString();

    console.log('Values to be sent to the database:');
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
    console.log('number_ofCourts:', numberOfCourts);
    console.log('number_ofPairs:', numberOfPairs);
    console.log('user_id:', user_id); 
    console.log('currentTimestamp:', currentTimestamp);

    const query = `INSERT INTO tournaments (start_date, end_date, creator_id, created_at, updated_at, number_of_courts, tournament_type)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      startDate,
      endDate,
      user_id, 
      currentTimestamp,
      currentTimestamp,
      numberOfCourts,
      numberOfPairs
    ];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error creating tournament:', error);
        res.status(400).json({ message: 'Error al registrar el torneo', error });
      } else {
        console.log('Tournament successfully created in the database.');
        res.status(201).json({
          tournament: {
            id: results.insertId,
            start_date: startDate,
            end_date: endDate,
            number_ofCourts: numberOfCourts,
            number_ofPairs: numberOfPairs,
            user_id: user_id, // Use user_id instead of creator_id
          },
        });
      }
    });
  } catch (error) {
    console.error('Exception caught while creating a tournament:', error);
    res.status(400).json({ message: 'Error al registrar el torneo', error });
  }
});




router.put('/:id', (req, res) => {

  const tournamentId = req.params.id;
  res.json({ message: `Torneo con ID ${tournamentId} actualizado correctamente` });
});


router.delete('/:id', (req, res) => {
 
  const tournamentId = req.params.id;
  res.json({ message: `Torneo con ID ${tournamentId} eliminado correctamente` });
});

module.exports = router;
