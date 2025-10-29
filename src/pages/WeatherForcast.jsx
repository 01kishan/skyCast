import WeatherForcastDetails from "../components/WeatherForcastDetails";

const WeatherForcast = () => {  
  return (
    <div className="m-4 md:m-6 lg:m-12 min-h-screen">
      <div className="flex flex-col items-center justify-center mt-[44px]">
        <h1 className="text-2xl font-bold mb-4">🌦️ Forecast</h1>
        <WeatherForcastDetails />
      </div>
    </div>
  );
};

export default WeatherForcast;
