Flujo del programa:
El usuario accede a /p1.
Al hacer clic en el botón, el cliente envía una solicitud GET a /generate-token.
El servidor genera un token JWT, lo guarda en una cookie, y redirige al usuario a /p2.
El middleware validateToken verifica la cookie antes de servir la página /p2.
Si el token es válido, el usuario accede a la página.
Si el token no es válido o no existe, se redirige de vuelta a /p1.

Ventajas de este enfoque:
Seguridad: El token está protegido en una cookie httpOnly, lo que evita que sea accesible desde el frontend.
Escalabilidad: Puedes agregar más validaciones o usar el contenido del JWT (como roles de usuario).
Simplicidad: La lógica está bien separada entre cliente y servidor.