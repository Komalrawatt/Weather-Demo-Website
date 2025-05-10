import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios';
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { RiCompass2Line } from "react-icons/ri";
import bg from './bg1.png';
import { TbBrandReact } from "react-icons/tb";
import { TiWeatherCloudy } from "react-icons/ti";
import { FaSmileWink } from "react-icons/fa";


import React from "react";
import Rain from "react-rain-animation";
import "react-rain-animation/lib/style.css";
import Footer from './Footer';

function App() {
  const [data, setData] = useState(null)

  async function weatherdata() {
    try {
      const response = await Axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=fcc5ecc229f0424fd881a9e2ed96e7cf')
      setData(response.data);

    }

    catch (error) {
      console.log("Error fetching data", error)
    }
  }
  // useEffect(()=>{
  //  weatherdata();
  // },[data]);

  useEffect(() => {
    weatherdata();
    console.log(data);

  }, [data]);


  return (

    <div
      className="flex flex-col items-center h-[1000px] w-screen 
             bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ '--image-url': `url(${bg})` }}
    >

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <Rain numDrops="50" />
      </div>
      {/* <Rain numDrops="30" className='animation-duration: 2.5s h-full w-full' /> */}

      {/* <TbBrandReact  className="text-blue-600 text-[80px] scale-100 mt-2 transition duration-300 hover:text-[#0F52BA] hover:scale-140 hover:drop-shadow-lg " /> */}
      <h1 className=" kom xs:text-[100px]  lg:text-[150px] 
               font-bold text-center transition-transform duration-200 
               hover:scale-105  hover:text-slate-800 cursor-pointer mt-5">
         ClimaCast
      </h1>
      <div className='lg-h-min/h/screen xs-h-[400px] xs-w-[500px] lg-w-[500px] shadow-lg shadow-black/100 p-6 rounded-2xl backdrop-blur '>
        {/* <Rain numDrops="30" className='animation-duration: 2.5s h-full w-full' /> */}

        {data ? (

          <div className="px-4 py-6">
            {/* Weather Icon */}
            <div className="flex justify-center text-[100px] sm:text-[150px] md:text-[200px] transition duration-300 hover:scale-125 hover:text-slate-800 hover:drop-shadow">
              <TiWeatherCloudy />
            </div>

            {/* Temperature & Location */}
            <div className="flex flex-col items-center mt-4 text-center">
              <p className="saira text-4xl sm:text-6xl md:text-8xl mb-2 font-bold text-amber-50">
                {data.main.temp}K
              </p>
              <h2 className="font-bold fav text-2xl sm:text-3xl md:text-4xl mb-2">
                {data.name}
              </h2>
              <p className="fav text-base sm:text-lg text-amber-50">
                {data.weather[0].description}
              </p>
            </div>

            {/* Humidity, Wind, Pressure */}
            <div className="flex flex-col sm:flex-row justify-around items-center mt-10 gap-6 sm:gap-0 fav">
              {/* Humidity */}
              <div className="flex flex-col items-center">
                <WiHumidity className="text-4xl sm:text-5xl md:text-6xl transition duration-300 hover:scale-125 hover:text-slate-900" />
                <p className="font-bold mt-1 sm:mt-2">{data.main.humidity}%</p>
              </div>

              {/* Wind Speed */}
              <div className="flex flex-col items-center">
                <FaWind className="text-4xl sm:text-5xl transition duration-300 hover:scale-125 hover:text-slate-900" />
                <p className="font-bold mt-1 sm:mt-2">{data.wind.speed} m/s</p>
              </div>

              {/* Pressure */}
              <div className="flex flex-col items-center">
                <RiCompass2Line className="text-4xl sm:text-5xl transition duration-300 hover:scale-125 hover:text-slate-900" />
                <p className="font-bold mt-1 sm:mt-2">{data.main.pressure} hPa</p>
              </div>
            </div>
          </div>

        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='spinner'>
            </div>

            <p className='fav flex flex-col justify-center items-center p-2'>Excited...
              <span className='text-3xl mt-2'><FaSmileWink /></span>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>

  )
}

export default App;
