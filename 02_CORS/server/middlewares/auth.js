const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    
    if (!req.cookies) {
        return res.status(401).json({ message: 'Acceso denegado. No se han enviado cookies.' });
    }
    
    const token = req.cookies.token6; // Leer el token desde la cookie
    if (!token) {
        return res.redirect('/inicio');
        //return res.status(401).json({ message: 'Acceso denegado. No estás autenticado.' });
    }

    try {
        // Decodificar el token
        const decoded = jwt.decode(token, { complete: true });
        console.log('Payload del token:', decoded.payload);
        // Verificar la firma del token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Error al verificar el token:', err);
                return res.status(403).json({ message: 'Token inválido o expirado.' });
            }
            req.user = decoded; // Adjuntar datos del usuario al request
            next(); // Continuar al siguiente middleware o controlador
        });
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;