// App.jsx
import { useState, } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// import search from './assets/search.png'
import sun from './assets/sun.png'
import hat from './assets/hat.png'
import shirt from './assets/shirt.png'
import suncream from './assets/suncream.png'
import sunglasses from './assets/sunglasses.png'
import umbrella from './assets/umbrella.png'
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
//import MyArcProgress from './Arc';
import {Info} from './Info';
import './App.css'; // Make sure to include the CSS file
import ProgressBar from './Progress';
import Thirdpage from './Third';

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

  //const colors=['#9af5b2','#feec98','#ffd799','#ffaead','#d4adfe']
  //const words=['LOW','Moderate','High',' Very High','Extreme']

  const getuvIndex = (uvIndex:any)=>{

    if(uvIndex>=1&&uvIndex<3){
      return (<span><span  style={{color: '#9af5b2'}}>LOW</span> | <span style={{color: '#9af5b2'}}>{uvIndex}</span></span>)
    }else  if(uvIndex>=3&&uvIndex<6 ){
      return (<span><span style={{color: '#feec98'}}>Moderate</span> | <span style={{color: '#feec98'}}>{uvIndex}</span></span>)
    }else  if(uvIndex>=6&&uvIndex<8){
      return (<span><span style={{color: '#ffd799'}}>High</span> | <span style={{color: '#ffd799'}}>{uvIndex}</span></span>)
    }else  if(uvIndex>=8&&uvIndex<11){
      return (<span><span style={{color: '#ffaead'}}>Very High</span> | <span style={{color: '#ffaead'}}>{uvIndex}</span></span>)
    }else  if(uvIndex>=11){
      return (<span><span style={{color: '#d4adfe'}}>Extreme</span> | <span style={{color: '#d4adfe'}}>{uvIndex}</span></span>)
    }

  }

  const getcolor =(uvIndex:any) =>{
    if(uvIndex>=1&&uvIndex<3){
      return '#9af5b2'
    }else  if(uvIndex>=3&&uvIndex<6){
      return '#feec98'
    }else  if(uvIndex>=6&&uvIndex<8 ){
      return '#ffd799'
    }else  if(uvIndex>=8&&uvIndex<11){
      return '#ffaead'
    }else  if(uvIndex>=11){
      return '#d4adfe'
    }
  }

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
            {/* <Typography variant="h2">UV Index:</Typography> */}

            <div className="progressBox">
              {
                (getuvIndex(uvIndex))
              }
            
            </div>
            <div>
              <ProgressBar value={uvIndex / 12*100} color={getcolor(uvIndex)} />
            </div>

            <div>
              {
                uvIndex<3?(
                  <div className="ProtectionNotRequired"><span>Sun Protection Not.Required </span></div>
                )
                :(
                  <div className="ProtectionRequired">
                    <span> Sun Protection Required </span>
                    <div>
                      <img src={hat} alt="" />
                      <img src={shirt} alt="" />
                      <img src={suncream} alt="" />
                      <img src={sunglasses} alt="" />
                      <img src={umbrella} alt="" />
                    </div>
                  </div>
                )
              }
            </div>


            {/* <MyArcProgress
            progress={uvIndex / 12}
            currentText={uvIndex.toFixed(1)}
          /> */}
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
          <span>| </span>
          <NavLink to="/thirdpage">UV Data Analysis</NavLink>
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
            <Route path="/thirdpage" element={<Thirdpage/>} />
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