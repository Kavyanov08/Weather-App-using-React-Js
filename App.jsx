import { useEffect, useState } from 'react'
import './App.css'
import searchicon from './assets/search.png'
import clear from './assets/clear.png'
import clouds from './assets/clouds.png'
import drizzleicon from './assets/drizzleicon.png'
import rain from './assets/rain.png'
import windicon from './assets/windicon.png'
import snow from './assets/snow.png'
import humidityicon from './assets/humidityicon.png'
import mist from './assets/mist.png'

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
   <>
   <div className='image'>
     <img src={icon} alt="image" />
   </div>
   <div className='temp'>{temp}°C</div>
   <div className='location'>{city}</div>
   <div className='country'>{country}</div>
   <div className='cord'>
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>longitude</span>
      <span>{log}</span>
    </div>
   </div>
   <div className='data-container'>
   <div className='element'>
      <img src={humidityicon} alt="humidity" className='icon'/>
      <div className='data'>
        <div className='humidity-percent'>{humidity}%</div>
        <div className='text'>Humidity</div>
      </div>
      </div>
    <div className='element'>
      <img src={windicon} alt="wind" className='icon'/>
      <div className='data'>
        <div className='wind-percent'>{wind}km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
    </div>
   </div>
   </>
  )
  }

function App() {
  let api_key="af60ce71bdde41c1ef67dde11025188a"
 const[text,setText]=useState('Chennai')

 const[icon,setIcon]=useState(snow)
 const[temp,setTemp]=useState(0)
 const[city,setCity]=useState('')
 const[country,setCountry]=useState('')
 const[lat,setLat]=useState(0)
 const[log,setLog]=useState(0)
 const[humidity,setHumidity]=useState(0)
 const[wind,setWind]=useState(0)

 const[citynotfound,setCitynotfound]=useState(false)
 const[loading,setLoading]=useState(false)
 const[error,setError]=useState(null)

 const weatherIconmap={
  "01d":clear,
  '01n':clear,
  '02d':clouds,
  '02n':clouds,
  '03d':drizzleicon,
  '03n':drizzleicon,
  '04d':drizzleicon,
  '04n':drizzleicon,
  '09d':rain,
  '09n':rain,
  '10d':rain,
  '10n':rain,
  '13d':snow,
  '13n':snow,
  '15d':mist,
  '15n':mist
 }

 const search =async()=>{
  setLoading(true)
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`
  try{
    let res=await fetch(url)
    let data= await res.json()
    if(data.cod==='404'){
      console.error("City Not Found")
      setCitynotfound(true)
      setLoading(false)
      return
    }
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setTemp(Math.floor(data.main.temp))
    setCity(data.name)
    setCountry(data.sys.country)
    setLat(data.coord.lat)
    setLog(data.coord.lon)

    const weatherIconcode=data.weather[0].icon
    setIcon(weatherIconmap[weatherIconcode] || clear )
    setCitynotfound(false)
  }
  catch(error){
    console.error('An Error Occurred',error.message)
    setError('An error occured while fetching data')
  }
  finally{
    setLoading(false)
  }
}
const handlecity=(e)=>{
  setText(e.target.value)
}
const handlekeydown=(e)=>{
  if(e.key==='Enter'){
    search()
  }
}
  useEffect(()=>{
    search()
  },[])
  return (
    <>
     <div className='container'>
      <div className='input-container'>
        <input type="text" className='cityinput' placeholder='Search City' onChange={handlecity} 
        value={text} onKeyDown={handlekeydown}/>
        <div className='search-icon'><img src={searchicon} alt="search" onClick={()=>search()}/></div>
      </div>
            
      {loading && <div className='loading-message'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {citynotfound && <div className='city-not-found'>City Not Found</div>}

      {!loading && !citynotfound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log}
      humidity={humidity} wind={wind}/>}

      <p className='copyright'>Designed by <span>Kavya_krishnan</span></p>
     </div>
    </>
  )
}

export default App
