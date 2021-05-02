import React from 'react';
import WeatherIcon from '../WeatherIcon';

const WeatherList = ({weatherList}) => {

    if (weatherList[0].temp.day) {
        return (
            weatherList.map(item =>
                    <div key={item.dt} className='card-item'>
                        <div className="title">{new Date(item.dt * 1000).toLocaleString('ru', {day: 'numeric', month: 'numeric'})}</div>
                        <WeatherIcon icon={item.weather[0].icon} width='40px'/>
                        <div className=''>
                            {`${parseInt(item.temp.max)}°`}
                            <span className='small'>
                                {`/${parseInt(item.temp.min)}°`}
                            </span>
                        </div>
                    </div>
            )
        )
    } else {
        return (
            weatherList.map(item =>
                    <div key={item.dt} className='card-item'>
                        <div className="title">{new Date(item.dt * 1000).toLocaleString('ru', {hour: 'numeric', minute: 'numeric'})}</div>
                        <WeatherIcon icon={item.weather[0].icon} width='40px'/>
                        <div className=''>
                            {`${parseInt(item.temp)}°`}
                        </div>
                    </div>
            )
        )
    }
}

export default WeatherList;