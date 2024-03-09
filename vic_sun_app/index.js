const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('react-app/dist'));
const port = process.env.PORT || 8080;

// Geocoding into Weather APIs
app.get('/api/weather/:loc', async (req, res) => {
  try {
    const open_weather_key = 'YOUR API KEY HERE';
    const location = req.params.loc;

    // Geocoding URL
    const geocoding_url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${1}&appid=${open_weather_key}`;
    const location_response = await axios.get(geocoding_url);

    // Extracting latitude and longitude from the geocoding response
    const { lat, lon } = location_response.data[0];
    console.log(lat, lon)

    // Weather API URL
    const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${open_weather_key}`;
    const weather_response = await axios.get(weather_url);

    res.send(weather_response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
