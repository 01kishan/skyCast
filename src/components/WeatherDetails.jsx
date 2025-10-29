import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WeatherIcon from "../components/WeatherIcon";
import formatDateTime from "../util/formatDateTime.js";
import { getCurrentLocation } from "../util/getLocation";
import WeatherLoader from "../components/loaders/WeatherLoader";
import WeatherError from "../components/WeatherError";

const WeatherDetails = () => {
	const [coords, setCoords] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [weatherData, setWeatherData] = useState(null);

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
	const fetchWeatherData = async () => {
	  try {
	    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=b826a2d76df886a79a8567411ceb3f6a&units=metric`);
	    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=b826a2d76df886a79a8567411ceb3f6a&units=metric`);
	    const data = await response.json();
	    setWeatherData(data);
	    setError(null);
	  }
	  catch(error){
	    console.error("Error fetching weather:", error);
	    setError(error);
	  }
	  finally {
	  	setIsLoading(false);
	  }
	} 
	if (coords?.latitude && coords?.longitude) {
	  fetchWeatherData();
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
						<span className="text-md">{weatherData.name}, {weatherData.sys.country}</span>
					</div>
					<div className="flex items-center justify-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
						  	<path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
						  	<path fillRule="evenodd" d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z" clipRule="evenodd" />
						</svg>

						<span className="text-[14px]">
							{formatDateTime(weatherData.dt, 1)}
						</span>
					</div>
					<div className="flex flex-col mt-12 mb-12">
						<div className="flex gap-6">
							<div>
								<span className="text-[8rem]">
									{Math.round(weatherData?.main.temp)}
									<span className="text-[18px]">°C</span>
								</span>
							</div>
							<div>
								<WeatherIcon iconCode={weatherData?.weather[0].icon}/>
							</div>
						</div>
						<span className="text-[2rem]">
							{weatherData?.weather[0].main}
						</span>
						<span className="text-[12px] mt-1">
							{weatherData?.weather[0].description}
						</span>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-2">
					<div className="flex flex-col gap-6 pt-6 items-center justify-center">
						<div className="flex flex-col gap-2">
							<span className="flex gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							  		<path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9" />
								</svg>
								<span >Humidity</span>
							</span>
							<span className="text-[24px] mt-1">
								{weatherData?.main.humidity}%
							</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="flex gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								  	<path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
								</svg>
								<span>Wind</span>
							</span>
							<span className="text-[24px] mt-1">
								{weatherData?.wind.speed}km/h
							</span>
						</div>
					</div>
					<div className="flex flex-col gap-6 pt-6 items-center justify-center">
						<div className="flex flex-col gap-2">
							<span className="flex gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								  <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
								</svg>
								<span>Max Temprature</span>
							</span>
							<span className="text-[24px] mt-1">
								{Math.round(weatherData?.main.temp_max)}°C
							</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="flex gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								  <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
								</svg>
								<span>Min. Temprature</span>
							</span>
							<span className="text-[24px] mt-1">
								{Math.round(weatherData?.main.temp_min)}°C
							</span>
						</div>
					</div>
				</div>
			</div>
			
		</>
	)
}
export default WeatherDetails;