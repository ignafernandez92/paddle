const express = require('express');
const router = express.Router();

// Ruta: GET /matches
router.get('/', (req, res) => {
  // Lógica para obtener la lista de partidos desde la base de datos o almacenamiento
  // y enviarla como respuesta en formato JSON
  res.json({ message: 'Lista de partidos' });
});

// Ruta: GET /matches/:id
router.get('/:id', (req, res) => {
  // Lógica para obtener los detalles de un partido específico por su ID desde la base de datos o almacenamiento
  // y enviarlos como respuesta en formato JSON
  const matchId = req.params.id;
  res.json({ message: `Detalles del partido con ID ${matchId}` });
});

// Ruta: POST /matches
router.post('/', (req, res) => {
  // Lógica para crear un nuevo partido con los datos proporcionados en el cuerpo de la solicitud
  // y enviar la respuesta con los detalles del partido creado
  res.json({ message: 'Partido creado correctamente' });
});

// Ruta: PUT /matches/:id
router.put('/:id', (req, res) => {
  // Lógica para actualizar los detalles de un partido específico por su ID con los datos proporcionados en el cuerpo de la solicitud
  // y enviar la respuesta con los detalles actualizados
  const matchId = req.params.id;
  res.json({ message: `Partido con ID ${matchId} actualizado correctamente` });
});

// Ruta: DELETE /matches/:id
router.delete('/:id', (req, res) => {
  // Lógica para eliminar un partido específico por su ID desde la base de datos o almacenamiento
  // y enviar la respuesta con un mensaje de éxito
  const matchId = req.params.id;
  res.json({ message: `Partido con ID ${matchId} eliminado correctamente` });
});

module.exports = router;