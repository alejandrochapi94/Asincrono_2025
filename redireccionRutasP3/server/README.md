# Flujo del programa:
Acceso a /p1:

El servidor genera un token JWT al cargar /p1.
El token se guarda en una cookie visible (no httpOnly).
En el navegador, el token se puede ver usando document.cookie.
Redirección a /p2:

Cuando el usuario hace clic en el botón, se redirige a /p2.
El middleware en el servidor valida el token JWT de la cookie.
Si el token es válido, el servidor sirve p2.html.
Si no es válido, el servidor redirige de nuevo a /p1.

Diagrama visual de flujo de trabajo
Usuario entra a `/p1` en el navegador
   ↓
Servidor genera un token JWT y lo guarda como una cookie
   ↓
Servidor sirve `p1.html` al navegador
   ↓
Usuario ve `p1.html` y hace clic en el botón para ir a `/p2`
   ↓
Middleware verifica la cookie con el token JWT:
   - Si es válida: Servir `p2.html`
   - Si no es válida: Redirigir a `/p1`
