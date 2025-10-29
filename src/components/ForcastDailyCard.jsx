import WeatherIcon from "../components/WeatherIcon";
const ForcastDailyCard = ( {time, temp, desc, icon} ) => {
	return (
		<>
			<div className="flex flex-col items-center justify-center gap-2 p-2 pb-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
				<div>
					<WeatherIcon iconCode={icon}/>
				</div>
				<div>
					{time}
				</div>
				<div className="text-[3rem] p-4">
					{temp}°C
				</div>
				<div>
					{desc}
				</div>
			</div>
		</>
	);
}

export default ForcastDailyCard;