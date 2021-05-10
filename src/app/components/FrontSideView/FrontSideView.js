import React from 'react';
import WeatherIcon from '../WeatherIcon';
import WeatherList from '../WeatherList';
import './FrontSide.scss';
import optionsImage from './options.svg';

const FrontSideView = ({currentLang, currentWeather, currentCityName, onClick, weatherList, activeButton, onDaily, onHourly}) => {

    const ucFirst = (str) => {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    const getNewDate = (date) => {
        return new Date(date * 1000)
    }

    const {temp, feels_like, dt} = currentWeather;
    const {icon, description} = currentWeather.weather[0];
    const day = getNewDate(dt).toLocaleString(`${currentLang}`, {weekday: 'long'});
    const date = getNewDate(dt).toLocaleString(`${currentLang}`, {day: 'numeric', month: 'long'});

    return (
        <div className={`card is-${icon}`}>
            <div className='card-row'>
                <div className='card-day flexfont24'>{ucFirst(day)}</div>
                <div className='card-day flexfont24'>{date}</div>
            </div>
            <div className='card-temperature'>
                    {`${parseInt(temp)}°`}
                    <WeatherIcon icon={icon} width='80px'/>
            </div>
            <div className='card-weather'>{ucFirst(description)}</div>
            <div className="small">{`Ощущается как ${parseInt(feels_like)}°`}</div>
            <div className="card-row">
                <div className={`card-select ${activeButton === "hourly" && "active"}`} onClick={onHourly}>По часам</div>
                <div className={`card-select ${activeButton === "daily" && "active"}`} onClick={onDaily}>По дням</div>
            </div>
            <div className="card-row">
                <WeatherList weatherList={weatherList} getNewDate={getNewDate}/>
            </div>
            <div className='card-row card-footer'>
                <h1 className='card-city flexfont24'>{currentCityName}</h1>
                <button className='card-options' onClick={onClick}>
                    <img src={optionsImage} alt="options" width={32}/>
                </button>
            </div>
        </div>
    );
}

export default FrontSideView;