const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const port = 3000; 

app.use(express.json());
//app.use(express.text());
app.use(morgan('dev')); //common dev short tiny combined

// Sirve archivos estáticos desde la carpeta "public"
// Servir la carpeta "public" como estática
app.use(express.static(path.join(__dirname, '../public')));

// Ruta por defecto (opcional) para redirigir al index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/principal', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/principal.html'));
  });

app.get('/bienvenida', (req, res) => {
    res.send("Bienvenidos a la ruta raíz de la api");
  });

//Peticion de datos

// Base de datos ficticia
let users = [
    { id: 1, name: 'Juan', age: 25 },
    { id: 2, name: 'María', age: 30 },
  ];

console.log(users)
  // Endpoint para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/setusers', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(202).json(newUser);
  });

//Respondiendo diferentes tipos de datos desde el servidor

// Endpoint para retornar un código de estado y un mensaje
app.get('/api/users/data1', (req, res) => {
  res.status(203).send("hola mundo");
});  

// Endpoint para retornar un JSON y un código de estado
app.get('/api/users/data2', (req, res) => {
  res.status(203).json({"message": "hola mundo que tal"});
});
// Endpoint para retornar un bloque HTML y mostrarlo en el DOM
app.get('/api/users/data3', (req, res) => {
  res.type('text/html').send('<h1>Hola vengo desde el servidor</h1>');
});

//Endpoint para res.redirect(301, 'http://otrositio.com')

app.get('/api/users/data4', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/paginaRedireccionada.html'));
});


//endpoint para pedir un documento pdf almacenado en el servidor
app.get('/api/users/data5', (req, res) => {
  const filePath = path.join(__dirname, '../respuestasServidor.pdf');
  res.sendFile(filePath);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
  console.log(`http://localhost:${port}`);
});