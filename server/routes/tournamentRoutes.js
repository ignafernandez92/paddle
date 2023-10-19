

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
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
    const { startDate, endDate,user_id, numberOfPairs, numberOfCourts,  } = req.body;

    console.log('Received a POST request to create a tournament:', req.body);

    const currentTimestamp = new Date().toISOString();

    // You should set up authentication to get the creator_id.
    // Replace 'req.user.creator_id' with the actual way you get the creator_id.

    console.log('Values to be sent to the database:');
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
    console.log('number_ofCourts:', numberOfCourts);
    console.log('number_ofPairs:', numberOfPairs);
    console.log('creator_id:', user_id);
    console.log('currentTimestamp:', currentTimestamp);

    const query = `INSERT INTO tournaments (start_date, end_date, creator_id, created_at, updated_at, number_of_courts, number_of_pairs)
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
        res.status(201).json({
          tournament: {
            id: results.insertId,
            start_date: startDate,
            end_date: endDate,
            number_ofCourts: numberOfCourts,
            number_ofPairs: numberOfPairs,
            creator_id: user_id,
          },
        });
      }
    });
  } catch (error) {
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
