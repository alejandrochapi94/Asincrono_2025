const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbconnect = require('./config');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//app.use(express.cookieParser());

app.use(express.json());
app.use(express.text());
app.use('/api', userRoutes);

const port = 3000;

// creamos la ruta de la api
app.get('/', (req, res) => {
    res.send('SERVER TASK MANAGER');
});

// Servir la carpeta "public" como estática
app.use(express.static(path.join(__dirname, '../public')));

const authMiddleware = require('./middlewares/auth');

app.get('/notas', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notas.html'));
});

// Ruta por defecto (opcional) para redirigir al index.html
app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});

dbconnect();