import React from 'react';
import WeatherIcon from '../WeatherIcon';
import WeatherList from '../WeatherList';
import './FrontSide.scss';
import optionsImage from './options.svg';

const FrontSideView = ({currentLang, currentWeather, currentCityName, onClick, weatherList, onDaily, onHourly}) => {

    const {temp, feels_like, dt} = currentWeather;
    const {icon, description} = currentWeather.weather[0];
    const day = new Date(dt * 1000).toLocaleString(`${currentLang}`, {weekday: 'long'});
    const date = new Date(dt * 1000).toLocaleString(`${currentLang}`, {day: 'numeric', month: 'long'});

    function ucFirst(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    return (
        <div className={`card is-${icon}`}>
            <div className='card-row'>
                <div className='card-day'>{ucFirst(day)}</div>
                <div className='card-day'>{date}</div>
            </div>
            <div className='card-temperature'>
                    {`${parseInt(temp)}°`}
                    <WeatherIcon icon={icon} width='80px'/>
            </div>
            <div className='card-weather'>{ucFirst(description)}</div>
            <div className="small">{`Ощущается как: ${parseInt(feels_like)}°`}</div>
            <div className="card-row">
                <div className="card-select" onClick={onHourly}>По часам</div>
                <div className="card-select" onClick={onDaily}>По дням</div>
            </div>
            <div className="card-list">
                <WeatherList weatherList={weatherList}/>
            </div>
            <div className='card-footer'>
                <div className='card-city'>{currentCityName}</div>
                <button className='card-options' onClick={onClick}>
                    <img src={optionsImage} alt="options" width={32}/>
                </button>
            </div>
        </div>
    );
}

export default FrontSideView;