import { useState, useEffect } from 'react'
import Spinner from '../Spinner'
import FrontSideView from '../FrontSideView'
import {getWeather} from '../../services/getData'

const setHourly = (arr) => {
    const newArr = [];
    // погода на ближайшие 24 часа
    for (let i = 0; i < 24; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}

export default function FrontSide({options, onClick}) {

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState("hourly");
    const [forecastList, setForecastList] = useState(null);
    const [loading, setLoadig] = useState(true);

    const {lang, units, currentCity, currentLocation} = options;

    let city = currentCity || currentLocation;

    // Выбор периода прогноза погоды
    // Select the weather forecast period
    const onDaily = () => {
        const daily = weather.daily;
        setForecastList(daily);
        setForecast("daily");
        document.querySelector('.scroll').scrollLeft = 0;
    }

    const onHourly = () => {
        const hourly = setHourly(weather.hourly);
        setForecastList(hourly);
        setForecast("hourly")
        document.querySelector('.scroll').scrollLeft = 0;
    }

    // Обновляем погоду при изменении параметров
    // Updating the weather when changing parameters
    useEffect(() => {
        setLoadig(true)
        if (city) {
            const {lon, lat} = city;
            getWeather(lat, lon, lang, units)
                .then(weather => {
                    setWeather(weather);
                    setForecastList(setHourly(weather.hourly));
                    setLoadig(false);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [city, lang, units])

    return (
        <>
            {loading ? <Spinner/> :
                <FrontSideView
                    currentLang={lang}
                    currentWeather={weather.current}
                    currentCityName={city.name}
                    onClick={onClick}
                    weatherList={forecastList}
                    activeButton={forecast}
                    onDaily={onDaily}
                    onHourly={onHourly}
                />
            }
        </>
    );
} 