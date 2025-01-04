const btnGetUsers = document.getElementById('btn-get-users');

btnGetUsers.addEventListener('click', async () => {
  try {
    // Hacer una petición fetch a la ruta /api/users
    const response = await fetch('/api/users');
    //recuperar la respuesta y convertirla en en un objeto
    //1
    //console.log("respuesta server", response)
    const users = await response.json();

    // Mostrar los datos por consola
    console.log(users, typeof users);
  } catch (error) {
    console.error('Error:', error);
  }
});

// Obtén el botón por su id
const btnSetUsers = document.getElementById('btn-set-users');

// Agrega un evento de clic al botón
btnSetUsers.addEventListener('click', async () => {
  // Crea un objeto con los datos del usuario
  const newUser = {
    id: 1,
    name: 'Nuevo usuario',
    age: 20
  };
  //console.log("Data consola", newUser);

  try {
    // Utiliza la API Fetch para enviar una petición POST a la ruta /api/users
    const response = await fetch('/api/setusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    //console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

// Obtén el botón por su id
const btnGetData1 = document.getElementById('btn-get-data1');

// Agrega un evento de clic al botón
btnGetData1.addEventListener('click', async () => {
  try {
    // Utiliza la API Fetch para enviar una petición GET
    const response = await fetch('/api/users/data1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Verifica si la petición fue exitosa
    if (response.ok) {
      // Obtiene el JSON de la respuesta
      const data = await response.text();

      // Muestra el código de estado y el mensaje en la consola
      console.log(`Código de estado: ${response.status}`);
      console.log(`Mensaje: ${data}`);
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
});


// Obtén el botón por su id
const btnGetData2 = document.getElementById('btn-get-data2');

// Agrega un evento de clic al botón
btnGetData2.addEventListener('click', async () => {
  try {
    // Utiliza la API Fetch para enviar una petición GET
    const response = await fetch('/api/users/data2', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Verifica si la petición fue exitosa
    if (response.ok) {
      // Obtiene el JSON de la respuesta
      const data = await response.json();

      // Muestra el código de estado y el mensaje en la consola
      console.log(`Código de estado: ${response.status}`);
      console.log(`Mensaje: ${data.message}`);
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
});

// Obtén el botón por su id
const btnGetData3 = document.getElementById('btn-get-data3');

// Agrega un evento de clic al botón
btnGetData3.addEventListener('click', async () => {
  try {
    // Utiliza la API Fetch para enviar una petición GET
    const response = await fetch('/api/users/data3', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html'
      }
    });

    // Verifica si la petición fue exitosa
    if (response.ok) {
      // Obtiene el texto HTML de la respuesta
      const data = await response.text();

      // Muestra los datos en la consola
      console.log(data);

      // Puedes insertar el HTML en un elemento del DOM
      const div = document.getElementById('div-data');
      div.innerHTML = data;
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
});

// Obtén el botón por su id
const btnGetData4 = document.getElementById('btn-get-data4');

// Agrega un evento de clic al botón
btnGetData4.addEventListener('click', async () => {
  try {
    // Utiliza la API Fetch para enviar una petición GET
    const response = await fetch('/api/users/data4', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html'
      }
    });

    // Verifica si la petición fue exitosa
    if (response.ok) {
      // Obtiene el HTML de la respuesta
      const html = await response.text();

      // Muestra el HTML en la consola
      console.log(html);


      document.body.innerHTML = html;
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
});

// Obtén el botón por su id
const btnGetData5 = document.getElementById('btn-get-data5');

// Agrega un evento de clic al botón
btnGetData5.addEventListener('click', async () => {
  try {
    // Utiliza la API Fetch para enviar una petición GET
    const response = await fetch('/api/users/data5', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf'
      }
    });

    // Verifica si la petición fue exitosa
    if (response.ok) {
      // Obtiene el PDF de la respuesta
      const pdf = await response.blob();

      // Crea un enlace para descargar el PDF
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdf);
      link.download = 'respuestasServidor.pdf';
      link.click();
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
});