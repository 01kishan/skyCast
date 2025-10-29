
import WeatherDetails from "../components/WeatherDetails";

const Weather = () => {  
  return (
    <div className="m-4 md:m-6 lg:m-12 min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">🌦️ Weather</h1>
        <WeatherDetails />
      </div>
    </div>
  );
};

export default Weather;
