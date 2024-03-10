// App.jsx
import { useState, } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// import search from './assets/search.png'
import sun from './assets/sun.png'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from 'react-router-dom';
import {
  // Container,
  Typography,
  TextField,
  Button,
  // Paper,
  Grid,
  // BottomNavigation,
  // BottomNavigationAction,
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

  // const uvIndex =2;
  const temp = weatherData?.current?.temp;
  const dt = weatherData?.current?.dt;
  const sunrise = weatherData?.current?.sunrise;
  const sunset = weatherData?.current?.sunset;

  return (
    <div>
      <div className="input-container">

        
        <div className="search">
        <TextField
          label="Search"
          variant="outlined"
          value={location}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="City, Postcode"
          className="MuiTextField-root"
        />
        </div>
        {/* <img src={search} alt="" /> */}
        <Button
          variant="contained"
          onClick={handleFetchData}
          className="MuiButton-root"
        >
         Search
        </Button>
      </div>
     <div className="bottom">
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
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* <Container className="container"> */}
      {/* <Paper  className="paper" > */}
      {/* <Typography  sx={{ color: 'orange' }}> */}
      <div className="headers">
        <div className="logo">
          <img src={sun} alt="" />  SunSafeFamilies
        </div>
        <div className="tabs">
          <NavLink to="/">Home</NavLink> 
          <span>| </span>
          <NavLink to="/info">Info</NavLink>
          <Routes>

          </Routes>
        </div>
      </div>
      {/* </Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </Grid>
      </Grid>
      {/* </Paper> */}

      {/* <BottomNavigation
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
      </BottomNavigation> */}
      {/* </Container> */}
    </Router>
  );
}

export default App;