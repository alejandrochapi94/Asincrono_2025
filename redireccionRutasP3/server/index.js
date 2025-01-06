const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'mi_clave_secreta'; // Clave secreta para firmar el token JWT

// Middleware para parsear cookies
app.use(cookieParser());

// Sirve los archivos estáticos de la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para validar el token en la cookie
function validateToken(req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.redirect('/p1'); // Redirige a p1 si no hay token
  }

  // Verifica el token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect('/p1'); // Redirige a p1 si el token no es válido
    }

    // Si el token es válido, continúa
    req.user = decoded; // Puedes guardar la información del usuario si es necesario
    next();
  });
}

// Ruta para generar el token y establecer la cookie al cargar /p1
app.get('/p1', (req, res) => {
  // Genera un token JWT
  const token = jwt.sign({ username: 'usuario1' }, SECRET_KEY, { expiresIn: '1h' });

  // Establece la cookie con el token
  res.cookie('authToken', token, { httpOnly: false }); // No usar httpOnly para que sea visible en el navegador

  // Sirve el archivo p1.html
  res.sendFile(path.join(__dirname, '../public/p1.html'));
});

// Ruta protegida para servir p2.html
app.get('/p2', validateToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/p2.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
