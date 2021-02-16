import React from 'react';
import WeatherIcon from './WeatherIcon';
import './FrontSide.css';
import optionsImage from './options.svg';

const FrontSide = ({date, icon, temperature, summary, apparentTemperature, currentCityName, onClick}) => {

    return (
        <div className={`card is-${icon}`}>
            <div className='card-row'>
                <div className='card-day'>{date.format('dddd')}</div>
                <div className='card-day'>{date.format('MMM Do')}</div>
            </div>
            <WeatherIcon icon={icon}/>
            <div className='card-row'>
                <div className='card-temperature'>
                    {`${parseInt(temperature)}°`}
                    <span className='small'>
                        {`/${parseInt(apparentTemperature)}°`}
                    </span>
                </div>
                <div className='card-weather'>{summary}</div>
            </div>
            <div className="card-line"></div>
            <div className="card-row">
                <div className='card-city'>{currentCityName}</div>
                <button className='card-options' onClick={onClick}>
                    <img src={optionsImage} alt="options" width={32}/>
                </button>
            </div>
        </div>
    );
}

export default FrontSide;