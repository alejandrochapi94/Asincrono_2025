// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para analizar JSON

// Base de datos ficticia
let users = [
  { id: 1, name: 'Juan', age: 25 },
  { id: 2, name: 'María', age: 30 },
];

// Endpoint para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Endpoint para agregar un nuevo usuario
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1; // Asignar un ID único
  users.push(newUser);
  res.status(201).json(newUser);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

