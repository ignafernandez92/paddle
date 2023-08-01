const express = require('express');
const router = express.Router();

// Ruta: GET /courts
router.get('/', (req, res) => {
  // Lógica para obtener la lista de canchas desde la base de datos o almacenamiento
  // y enviarla como respuesta en formato JSON
  res.json({ message: 'Lista de canchas' });
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
