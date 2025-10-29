function WeatherIcon({ iconCode }) {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return <img src={iconUrl} alt="weather icon" />;
}

export default WeatherIcon;