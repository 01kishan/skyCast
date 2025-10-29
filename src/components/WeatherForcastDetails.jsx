import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WeatherIcon from "../components/WeatherIcon";
import formatDateTime from "../util/formatDateTime.js";
import { getCurrentLocation } from "../util/getLocation";
import WeatherLoader from "../components/loaders/WeatherLoader";
import WeatherError from "../components/WeatherError";
import ForcastDailyCard from "../components/ForcastDailyCard";

const WeatherForcastDetails = () => {
	const [coords, setCoords] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [forecastData, setForecastData] = useState(null);

	useEffect(() => {
	getCurrentLocation()
	  .then((location) => {
	    setCoords(location);
	    setError(null);
	  })
	  .catch((err) => {
	  	setIsLoading(false);
	    setError(err)
	  });
	}, []);

	useEffect(() => {
	const fetchForecastData = async () => {
	  try {
	    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&cnt=5&appid=b826a2d76df886a79a8567411ceb3f6a`);
	    if (!response.ok) {
		    throw new Error(`Something went wrong ⚠️`);
		    return;
		}
	    const data = await response.json();
	    setForecastData(data);
	    setError(null);
	  }
	  catch(error){
	    console.error(error);
	    setError(error.message || "Something went wrong while fetching data");
	  }
	  finally {
	  	setIsLoading(false);
	  }
	} 
	if (coords?.latitude && coords?.longitude) {
	  fetchForecastData();
	}
	}, [coords])

	if(isLoading) 
	{
		return(
			<WeatherLoader />
		);
		
	}
	if(error)
	{
		return (
			<WeatherError error={error} /> 
		);
	}

	return (
		<>
			{/*<div className="shadow-xl rounded-lg pt-[2rem] px-[4rem] pb-[4rem] border-t-4 border-purple-200 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">*/}
			<div className="w-full">
				<div className="flex flex-col items-center justify-center gap-2 mb-[2.5rem]">
					<div className="flex items-center justify-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
						  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
						</svg>
						<span className="text-md">{forecastData.city.name}, {forecastData.city.country}</span>
					</div>
					<div className="flex items-center justify-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
						  	<path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
						  	<path fillRule="evenodd" d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z" clipRule="evenodd" />
						</svg>
						<span className="text-[14px]">
							{formatDateTime(forecastData.list[0].dt, 1)}
						</span>
					</div>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{forecastData?.list?.map((dayData, index) => {
					  	const time = formatDateTime(dayData.dt, 2)
						const temp = Math.round(dayData.main.temp - 273.15); // Kelvin → °C
						const desc = dayData.weather[0].main;
						const icon = dayData.weather[0].icon;
						return (
						    <ForcastDailyCard
						      key={index}
						      time={time}
						      temp={temp}
						      desc={desc}
						      icon={icon}
						    />
						);
					})}
				</div>
			</div>
			
		</>
	)
}
export default WeatherForcastDetails;