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
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import MyArcProgress from './Arc';
import Info from './Info';
import './App.css'; // Make sure to include the CSS file

interface WeatherData {
  current?: {
    temp: number;
    uvi: number;
    dt?: number;
    sunrise?: number;
    sunset?: number;
  };
}

function formatTime(timestamp?: number): string {
  if (timestamp === undefined) {
    return "N/A";
  }

  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
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
          <Typography>DT: {formatTime(dt)}</Typography>
          <Typography>Sunrise: {formatTime(sunrise)}</Typography>
          <Typography>Sunset: {formatTime(sunset)}</Typography>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Container className="container" sx={{ width: '60%', margin: 'auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Paper elevation={3} className="paper" sx={{ backgroundColor: 'lightblue', minWidth: '100%', flex: '1' }}>
          <Typography variant="h1" sx={{ color: 'orange' }}>
            Weather Data
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/info" element={<Info />} />
              </Routes>
            </Grid>
          </Grid>
        </Paper>

        <BottomNavigation
          showLabels
          sx={{
            backgroundColor: 'orange',
            position: 'sticky',
            bottom: 0,
            width: '100%',
            minHeight: '70px',
          }}
        >
          <BottomNavigationAction component={Link} to="/" label="Home" sx={{ color: 'white', width: '50%' }} />
          <BottomNavigationAction component={Link} to="/info" label="Info" sx={{ color: 'white', width: '50%' }} />
        </BottomNavigation>
      </Container>
    </Router>
  );
}

export default App;
