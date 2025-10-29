const WeatherError = ({ error }) => {
	return(
		/*<div className="flex flex-col items-center justify-center px-[4rem] h-[350px] border-t-4 border-grey-600 rounded-2xl shadow-lg w-full">*/
		<div className="flex flex-col items-center justify-center h-[350px] w-full">
	      <h2 className="mt-4 text-lg font-medium tracking-wide">
	        {error}
	      </h2>
	    </div>
	)
}

export default WeatherError;