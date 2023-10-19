
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../db'); 


router.get('/', (req, res) => {
  try {
    const query = 'SELECT * FROM users where role =  "player"'; 
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching players:', error);
        return res.status(500).json({ message: 'Error fetching players', error });
      }

      res.json({ message: 'Lista de jugadores', players: results });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});


router.get('/:id', (req, res) => {
  try {
    const playerId = req.params.id;

    const query = 'SELECT * FROM users WHERE user_id = ?';
    connection.query(query, [playerId], (error, results) => {
      if (error) {
        console.error('Error fetching player details:', error);
        return res.status(500).json({ message: 'Error fetching player details', error });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Player not found' });
      }

      res.json({ message: 'Player details', player: results[0] });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});


router.post('/', (req, res) => {
  try {
    const { f_name, l_name, email, password, dni, date_of_birth, role } = req.body;

    if (!f_name || !l_name || !email || !password || !dni || !date_of_birth || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const currentTimestamp = new Date().toISOString();
    const query = `INSERT INTO users (f_name, l_name, email, password, dni, date_of_birth, created_at, updated_at, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [f_name, l_name, email, password, dni, date_of_birth, currentTimestamp, currentTimestamp, role];
    console.log(req.body);

    connection.query(query, values, (userError, userResults) => {
      if (userError) {
        console.error('Error inserting new user:', userError);
        return res.status(500).json({ message: 'Error al registrar el usuario', error: userError });
      }

      if (role === 'player') {
        const { category, dominant_hand, position } = req.body;

        createPlayer(userResults.insertId, category, dominant_hand, position, () => {
          getPlayersAndSendResponse(res, userResults.insertId);
        });
      } else {
        res.status(201).json({ message: 'Usuario creado correctamente', user: { id: userResults.insertId, f_name, l_name, date_of_birth, dni, role } });
      }
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});

async function createPlayer(user_id, category, dominant_hand, position) {
  const query = `
    INSERT INTO players (user_id, category, dominant_hand, position)
    VALUES (?, ?, ?, ?)
  `;
  
  const values = [user_id, category, dominant_hand, position];

  connection.query(query, values, (playerError, playerResults) => {
    if (playerError) {
      console.error('Error creating player:', playerError);
      // Handle the error, such as returning an error response or throwing an exception
    } else {
      console.log('Player created successfully:', playerResults);
      // Return the response for player creation (if needed)
    }
  });
}


router.put('/:id', (req, res) => {
  try {
    const playerId = req.params.id;
    const { f_name, l_name, email, password, dni, date_of_birth, role } = req.body;

    if (!f_name || !l_name || !email || !password || !dni || !date_of_birth || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

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


router.delete('/:id', (req, res) => {
  try {
    const playerId = req.params.id;

    // First, delete the player record
    const playerQuery = 'DELETE FROM players WHERE user_id = ?';
    connection.query(playerQuery, [playerId], (playerError, playerResults) => {
      if (playerError) {
        console.error('Error deleting player:', playerError);
        return res.status(500).json({ message: 'Error deleting player', error: playerError });
      }

      // Second, delete the user record
      const userQuery = 'DELETE FROM users WHERE user_id = ?';
      connection.query(userQuery, [playerId], (userError, userResults) => {
        if (userError) {
          console.error('Error deleting user:', userError);
          return res.status(500).json({ message: 'Error deleting user', error: userError });
        }

        if (userResults.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Player and associated user deleted successfully' });
      });
    });
  } catch (error) {
    console.error('Error while processing request:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }

});

module.exports = router;
