import { useEffect, useRef } from "react";
import { IDailyWeather, IHourlyWeather } from "../../interfaces/Weather";
import WeatherItem from "./WeatherItem";

const WeatherList = ({
  forecast,
}: {
  forecast: IHourlyWeather[] | IDailyWeather[];
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollLeft = 0;
    }
  }, [forecast]);
  return (
    <div className="scroll" ref={componentRef}>
      {forecast.map((weather) => (
        <WeatherItem key={weather.dt} forecastItem={weather} />
      ))}
    </div>
  );
};

export default WeatherList;
