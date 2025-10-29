import Spinner from "../loaders/Spinner";

const WeatherLoader = () => {
  return (
    /*<div className="flex flex-col items-center justify-center h-[350px] border-t-4 border-grey-600 rounded-2xl shadow-md w-full">*/
    <div className="flex flex-col items-center justify-center h-[350px] w-full">
      <Spinner />
      <h2 className="mt-4 text-lg font-medium tracking-wide animate-pulse">
        Loading...
      </h2>
    </div>
  );
};

export default WeatherLoader;
