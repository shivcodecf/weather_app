

import axios from 'axios'
import React, { useState } from 'react'
import './App.css'
import './index.css';
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import { BsCloudsFill, BsSnow2, BsFillCloudSunFill, BsFillCloudLightningRainFill, BsFillCloudFog2Fill,  BsCloudyFill} from "react-icons/bs";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const[weather,setweather]=useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9524591053a520cd7a745f52eb88da01`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  // string check
  function getIcon(state: string){
    switch(state.toLowerCase()){
        case 'snow':
            return <BsSnow2/>
        case 'rain':
            return  <BsFillCloudLightningRainFill className='icon' fontSize='large' style={{color:'white'}}/>
        case 'fog':
            return <BsFillCloudFog2Fill className='icon' fontSize='large' style={{color:'white'}}/>
        case 'wind':
            return <BsFillCloudFog2Fill className='icon' fontSize='large' style={{color:'white'}}/>
        case 'cloudy':
            return <BsCloudyFill/>
            case 'clouds':
              return <BsFillCloudSunFill className='icon' fontSize='large' style={{color:'white'}}/>
        case 'partly-cloudy-day':
            return <BsCloudyFill/>
        case 'partly-cloudy-night':
            return <BsCloudyFill className='icon' fontSize='large' style={{color:'white'}}/>
        case 'clear':
            return <WbSunnyOutlinedIcon className='icon' fontSize='large' style={{color:'white'}}/> 
        case 'clear-night':
            return<BsCloudsFill className='icon' fontSize='large' style={{color:'white'}}/>
        default:
        return<BsCloudsFill className='icon' fontSize='large' style={{color:'white'}}/>
      
      }
}
  return (
    <div className="App">
       <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Search Location.....'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name?<p>{data.name.toUpperCase()}</p>:null}
          </div>
          <div className="temp">
          
           { data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}

           {data.weather?<div className="des">  {getIcon(data.weather[0].main)}    </div>:null}
    


           
            

          
          </div>
          
          <div className="description">
            {data.weather? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name ? 
        
          <div className="bottom">
            <div className="feels">
              {data.main? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <ThermostatOutlinedIcon className='icon' fontSize='large' style={{color:'white'}}/>
            </div>
            <div className="humidity">
              {data.main? <p className='bold'>{data.main.humidity}%</p> : null}
              <WaterIcon className='icon' fontSize='large' style={{color:'violet'}}/>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} mph</p> : null}
              <AirIcon className='icon' fontSize='large'style={{color:'yellow'}}/>
            </div>
          </div>
        : null}



      </div>
    </div>
  );
}

export default App;
