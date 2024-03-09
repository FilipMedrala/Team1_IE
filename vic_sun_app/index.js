const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises; // Use fs.promises for async file operations

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('react-app/dist'));
const port = process.env.PORT || 8080;

// Geocoding into Weather APIs
app.get('/api/weather/:loc', async (req, res) => {
  try {
    const openWeatherKey = '5f216d3d453686cd5a10ab63e77bd4e5';
    const location = req.params.loc;

    // Geocoding URL
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${1}&appid=${openWeatherKey}`;
    const locationResponse = await axios.get(geocodingUrl);

    // Extracting latitude and longitude from the geocoding response
    const { lat, lon } = locationResponse.data[0];
    console.log(lat, lon);

    // Weather API URL
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherKey}`;
    const weatherResponse = await axios.get(weatherUrl);
    console.log(weatherResponse.data);

    // Save the weather data to a file
    const filename = `weather_data_${location}.json`;
    await saveDataToFile(weatherResponse.data, filename);

    res.send(weatherResponse.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to save data to a file
const saveDataToFile = async (data, filename) => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filename, jsonString, 'utf8');
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    console.error('Error saving data to file:', error);
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
