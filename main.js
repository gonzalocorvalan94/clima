const inputCiudad = document.querySelector('.ciudad');
const btnBuscar = document.querySelector('.buscar');
const resultado = document.querySelector('.resultado');

const API_KEY = '74430648597a7998d3c7a536ec12e2a0';

btnBuscar.addEventListener('click', async () => {
  const ciudad = inputCiudad.value.trim();

  if (ciudad === '') {
    resultado.textContent = 'Por favor, ingrese una ciudad';
    resultado.classList.remove('oculto');
    return;
  }

  try {
    resultado.textContent = 'Buscando clima...';
    resultado.classList.remove('oculto');

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error('Ciudad no encontrada');
    }

    const data = await response.json();

    resultado.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperatura: ${data.main.temp} °C</p>
      <p>Humedad: ${data.main.humidity}%</p>
      <p>Viento: ${data.wind.speed} m/s</p>
      <p>Estado: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    resultado.textContent = 'Error: ' + error.message;
  }
});
