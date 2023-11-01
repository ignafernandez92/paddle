
const express = require('express');
const router = express.Router();
const connection = require('../db');
require('dotenv').config();

router.get('/:clubId', (req, res) => {
  try {
    const club_id = req.params.clubId;
    const query = `SELECT * FROM courts WHERE club_id = ?`;
    
    // No need to call connection.connect() here as it's typically done globally when setting up the database connection.

    connection.query(query, [club_id], (error, results) => {
      if (error) {
        res.status(400).json({ message: 'Error al obtener la lista de canchas', error });
      } else {
        res.status(200).json({ message: 'Lista de canchas', courts: results });
      }

      // Close the connection after the query is complete.
      connection.end();
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener la lista de canchas', error });
  }
});

router.get('/:id', (req, res) => {
  const courtId = req.params.id;
  const query = 'SELECT * FROM courts WHERE court_id = ?';
  
  // No need to call connection.connect() here as it's typically done globally when setting up the database connection.

  connection.query(query, courtId, (error, results) => {
    if (error) {
      console.error('Error al buscar la cancha:', error);
      return res.status(500).json({ message: 'Error al buscar la cancha' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Cancha no encontrada' });
    }

    const courtDetails = results[0];
    res.json({ court: courtDetails });

    connection.end();
  });
});
// Ruta: POST /courts
router.post('/', (req, res) => {
  const { club_id, court_number } = req.body;

  if (!club_id || !court_number) {
    return res.status(400).json({ message: 'Se requieren club_id y court_number' });
  }

  const newCourt = {
    club_id,
    court_number,
  };

  const query = 'INSERT INTO courts SET ?';

  connection.query(query, newCourt, (error, results) => {
    if (error) {
      console.error('Error al agregar una cancha:', error);
      return res.status(500).json({ message: 'Error al agregar una cancha' });
    }

    const insertedCourt = {
      court_id: results.insertId,
      ...newCourt,
    };

    res.status(201).json({ message: 'Cancha agregada exitosamente', court: insertedCourt });
  });
});

router.put('/:id', (req, res) => {
  const courtId = req.params.id;
  const { club_id, court_number } = req.body;

  if (!club_id || !court_number) {
    return res.status(400).json({ message: 'Se requieren club_id y court_number para la actualización' });
  }

  const checkCourt = 'SELECT * FROM courts WHERE court_id = ?';
  connection.query(checkCourt, courtId, (error, results) => {
    if (error) {
      console.error('Error al buscar la cancha:', error);
      return res.status(500).json({ message: 'Error al buscar la cancha' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Cancha no encontrada' });
    }

    const updateQuery = 'UPDATE courts SET club_id = ?, court_number = ? WHERE court_id = ?';
    connection.query(updateQuery, [club_id, court_number, courtId], (error, results) => {
      if (error) {
        console.error('Error al actualizar la cancha:', error);
        return res.status(500).json({ message: 'Error al actualizar la cancha' });
      }

      res.json({ message: `Cancha con ID ${courtId} actualizada correctamente` });
    });
  });
});

// Ruta: DELETE /courts/:id
router.delete('/:id', (req, res) => {
  const courtId = req.params.id;
  const checkQuery = 'SELECT * FROM courts WHERE court_id = ?';
  connection.query(checkQuery, courtId, (error, results) => {
    if (error) {
      console.error('Error al buscar la cancha:', error);
      return res.status(500).json({ message: 'Error al buscar la cancha' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Cancha no encontrada' });
    }

    const deleteCourt = 'DELETE FROM courts WHERE court_id = ?';
    connection.query(deleteCourt, courtId, (error, results) => {
      if (error) {
        console.error('Error al eliminar la cancha:', error);
        return res.status(500).json({ message: 'Error al eliminar la cancha' });
      }

      res.json({ message: `Cancha con ID ${courtId} eliminada correctamente` });
    });
  });
});

module.exports = router;
