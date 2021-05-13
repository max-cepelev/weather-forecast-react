import React from 'react';
import WeatherIcon from '../WeatherIcon';

const WeatherList = ({weatherList, getNewDate}) => {
    
    const getWeekDay = (date) => {
        let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return days[date.getDay()];
    }

    if (weatherList[0].temp.day) {
        return (
            weatherList.map(item =>
                    <div key={item.dt} className='card-item flexfont16'>
                        <div className="title">{`${getWeekDay(getNewDate(item.dt))}, ${getNewDate(item.dt).getDate()}`}</div>
                        <WeatherIcon icon={item.weather[0].icon} width='40px'/>
                        <div className=''>
                            {`${parseInt(item.temp.max)}`}
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
                    <div key={item.dt} className='card-item flexfont16'>
                        <div className="title">{getNewDate(item.dt).toLocaleString('ru', {hour: 'numeric', minute: 'numeric'})}</div>
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