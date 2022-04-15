import { useState, useEffect } from "react";
import { getWeather } from "../../services/getData";
import { useAppSelector } from "../../hooks/redux";
import {
  IDailyWeather,
  IHourlyWeather,
  IWeatherData,
} from "../../interfaces/Weather";
import Spinner from "../Spinner";
import FrontSideView from "../FrontSideView";

const setHourly = (arr: IHourlyWeather[]) => {
  const newArr = [];
  // погода на ближайшие 24 часа
  for (let i = 0; i < 24; i = i + 2) {
    newArr.push(arr[i]);
  }
  return newArr;
};

export default function FrontSide({ onClick }: { onClick: () => void }) {
  const [weather, setWeather] = useState<IWeatherData | null>(null);
  const [forecast, setForecast] = useState<IHourlyWeather[] | IDailyWeather[]>(
    []
  );
  const [loading, setLoadig] = useState(true);

  const {
    lang,
    currentCity,
    currentLocation,
    units,
    loading: isLoading,
    activeForecast,
  } = useAppSelector((store) => store.optionsReducer);

  let city = currentCity || currentLocation;

  useEffect(() => {
    setLoadig(true);
    if (city) {
      const { longitude, latitude } = city;
      getWeather(latitude, longitude, lang, units)
        .then((weather) => {
          setWeather(weather);
          setLoadig(false);
        })
        .catch((error) => {
          setLoadig(false);
          console.log(error);
        });
    }
  }, [city, lang, units]);

  useEffect(() => {
    if (weather) {
      activeForecast === "daily"
        ? setForecast(weather.daily)
        : setForecast(setHourly(weather.hourly));
    }
  }, [weather, activeForecast]);

  if (loading || isLoading) return <Spinner />;

  return (
    weather && (
      <FrontSideView
        currentWeather={weather.current}
        currentCityName={city.name}
        forecast={forecast}
        onClick={onClick}
      />
    )
  );
}
