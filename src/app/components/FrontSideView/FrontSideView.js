import React from 'react';
import WeatherIcon from '../WeatherIcon';
import WeatherList from '../WeatherList';
import './FrontSide.scss';
import optionsImage from './options.svg';

const FrontSideView = ({day, date, icon, temperature, summary, apparentTemperature, currentCityName, onClick, daily}) => {

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
                    {`${parseInt(temperature)}°`}
                    <span className='small'>
                        {`/${parseInt(apparentTemperature)}°`}
                    </span>
            </div>
            <WeatherIcon icon={icon} width='120px'/>
            <div className='card-row'>
                <div className='card-weather'>{ucFirst(summary)}</div>
            </div>
            <div className="card-list">
                <WeatherList weatherList={daily}/>
            </div>
            <div className='card-footer'>
                <div className="card-line"></div>
                <div className="card-row">
                    <div className='card-city'>{currentCityName}</div>
                    <button className='card-options' onClick={onClick}>
                        <img src={optionsImage} alt="options" width={32}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FrontSideView;