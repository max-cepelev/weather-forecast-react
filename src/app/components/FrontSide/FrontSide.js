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

    const [state, setState] = useState({
        weather: null,
        forecast: null,
        activeForecast: "hourly"
    });

    const [loading, setLoadig] = useState(true);

    const {lang, units, currentCity, currentLocation} = options;

    const {weather, activeForecast, forecast} = state;

    let city = currentCity || currentLocation;

    // Выбор периода прогноза погоды
    // Select the weather forecast period
    const handleSetForecast = (forecast) => {
        if (forecast === "hourly") {
            setState(prevState => {
                return {
                    ...prevState,
                    forecast: setHourly(weather.hourly),
                    activeForecast: "hourly"
                }
            })
        } else {
            setState(prevState => {
                return {
                    ...prevState,
                    forecast: weather.daily,
                    activeForecast: "daily"
                }
            })
        }
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
                    setState(prevState => {
                        return {
                            ...prevState,
                            weather: weather,
                            forecast: prevState.activeForecast === "hourly" ? setHourly(weather.hourly) : weather.daily
                        }
                    })
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
                    forecast={forecast}
                    activeForecast={activeForecast}
                    handleSetForecast={handleSetForecast}
                />
            }
        </>
    );
} 