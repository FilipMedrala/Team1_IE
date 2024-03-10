// App.jsx
import { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import MyArcProgress from './Arc';
import Info from './Info';
import './App.css'; // Make sure to include the CSS file

interface WeatherData {
  current?: {
    temp: number;
    uvi: number;
    dt: number;
    sunrise: number;
    sunset: number;
  };
}

function Home() {
  const [location, setLatitude] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<WeatherData>(
        `http://localhost:8080/api/weather/${location}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
    }
  };

  const handleFetchData = () => {
    fetchData();
  };

  const uvIndex = weatherData?.current?.uvi;
  const temp = weatherData?.current?.temp;
  const dt = weatherData?.current?.dt;
  const sunrise = weatherData?.current?.sunrise;
  const sunset = weatherData?.current?.sunset;

  return (
    <div>
      <div className="input-container">
        <TextField
          label="Search"
          variant="outlined"
          value={location}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="City, Postcode"
          className="MuiTextField-root"
        />
        <Button
          variant="contained"
          onClick={handleFetchData}
          className="MuiButton-root"
        >
          Fetch Weather
        </Button>
      </div>
      {error && <Typography className="error">{error}</Typography>}
      {uvIndex !== undefined && (
        <div>
          <Typography variant="h2">UV Index:</Typography>
          <MyArcProgress
            progress={uvIndex / 12}
            currentText={uvIndex.toFixed(1)}
          />
          <Typography>Temperature: {temp}</Typography>
          <Typography>DT: {dt}</Typography>
          <Typography>Sunrise: {sunrise}</Typography>
          <Typography>Sunset: {sunset}</Typography>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Container className="container">
        <Paper elevation={3} className="paper" sx={{ backgroundColor: 'lightblue' }}>
          <Typography variant="h1" sx={{ color: 'orange' }}>
            Weather Data
          </Typography>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/info">Info</Link>
              </li>
            </ul>
          </nav>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/info" element={<Info />} />
              </Routes>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Router>
  );
}

export default App;
