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

async function weatherdata(){
  try
  {
    const response=await Axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=fcc5ecc229f0424fd881a9e2ed96e7cf')
    setData(response.data);

    }

  catch(error)
    {
        console.log("Error fetching data",error)
    }
}
// useEffect(()=>{
//  weatherdata();
// },[data]);

useEffect(()=>{
  weatherdata();
  console.log(data);
  
 },[data]);
 

  return (

    <div className='flex items-center flex-col h-[800px] w-svw bg-[image:var(--image-url)] bg-cover bg-no-repeat bg-center bg-fixed'
      style= {{'--image-url': `url(${bg})`}} 
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
  <Rain numDrops="30" />
</div>
       {/* <Rain numDrops="30" className='animation-duration: 2.5s h-full w-full' /> */}

      {/* <TbBrandReact  className="text-blue-600 text-[80px] scale-100 mt-2 transition duration-300 hover:text-[#0F52BA] hover:scale-140 hover:drop-shadow-lg " /> */}
      <h1 className='kom text-[100px]    hover:pointer-cursor  hover:scale-105 transition-transform duration-200 hover:text-blue-950'>Komal's Weather App</h1>
      <div className='h-min/h/screen w-[400px] shadow-lg shadow-black/100 p-6 rounded-2xl backdrop-blur '> 
      {/* <Rain numDrops="30" className='animation-duration: 2.5s h-full w-full' /> */}

                  {data ? (
                    <div >
                          <div className='flex justify-center text-[200px] transition duration-300 hover:scale-140 hover:text-slate-800 hover:drop-shadow  '>
                          <TiWeatherCloudy />
                          </div>
                          
                          <div className='flex flex-col items-center mt-4'>
                              <p className='fav text-8xl mb-2  font-bold text-amber-50'>{data.main.temp}K</p>
                              <h2 className='font-bold fav text-4xl mb-2  '>{data.name}</h2>
                              <p className='fav text-0xl mb-2 text-amber-50'>{data.weather[0].description}</p>
                          </div>
                          <div className='flex justify-around mt-10 fav '>
                              <div  className='flex flex-col items-center'>
                                   <WiHumidity className='text-6xl  transition duration-300 hover:scale-140 hover:text-slate-900' />
                                   <p className='font-bold '> {data.main.humidity}%</p>
                              </div>
                              <div className='flex flex-col items-center'>
                                  <FaWind className='text-5xl transition duration-300 hover:scale-140 hover:text-slate-900' />
                                  <p className='font-bold mt-2'>{data.wind.speed} m/s</p>
                              </div>
                              <div className='flex flex-col items-center'>
                                  <RiCompass2Line  className='text-5xl transition duration-300 hover:scale-140 hover:text-slate-900'/>
                                 <p className='font-bold mt-2'>{data.main.pressure} hPa</p>
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
