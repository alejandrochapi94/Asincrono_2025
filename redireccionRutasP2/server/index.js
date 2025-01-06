const express = require('express');
const path = require('path');
const app = express();

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para /p1 que envía p1.html
app.get('/p1', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/p1.html'));
});

// Ruta para /p2 que envía p2.html
app.get('/p2', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/p2.html'));
});

// Ruta que redirige a /p2
app.get('/redirect-to-p2', (req, res) => {
  res.redirect('/p2'); // Redirige al usuario a la ruta /p2
});

// Servidor escuchando en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
