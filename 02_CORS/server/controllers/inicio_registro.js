const mongoose = require('mongoose');
const model_user = require('../models/model_user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();




// creamos la funcion para registrar un usuario

// Ruta de registro
exports.Registro = async (req, res) => {
    const {name, email, password } = req.body;

    // Validar datos
    if ( !name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await mongoose.model('User').findOne({ email: email });
    if (existingUser) {
        return res.status(409).json({ message: 'El usuario ya existe.' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en la base de datos
    const newUser = new mongoose.model('User')({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
};


// funcion para logear un usuario

// Ruta de inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Buscar usuario en la base de datos
    const user = await mongoose.model('User').findOne({ email: email });
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Generar JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Expira en 1 hora
    });

    // Configurar cookie con el token
    //res.header('Access-Control-Allow-Private-Network', 'true');
    res.cookie('token6', token, {
      credentials: true,
      httpOnly: false,
      secure: true, // Usa true en producción con HTTPS
      maxAge: 3600000, // 1 hora
      sameSite: 'None',
      path: '/',
      //domain: 'alejandrochapi94.github.io'
    });
    

    //res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; Max-Age=3600000; SameSite=None; Path=/`);

    res.json({ message: 'Inicio de sesión exitoso.' });
    //res.status(307).setHeader('Location', '/notas.html').send();

    //res.redirect('/notas.html'); // Redireccionar al usuario utilizando un enlace relativo
};
