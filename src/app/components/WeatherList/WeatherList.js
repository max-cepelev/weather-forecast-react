import React from 'react';
import WeatherIcon from '../WeatherIcon';

const WeatherList = ({weatherList}) => {

    return (
        weatherList.map((item, index) =>
                <div key={index}>
                    <WeatherIcon icon={item.weather[0].icon} width='40px'/>
                    <div className='card-temperature'>
                        {`${parseInt(item.temp.day)}°`}
                        <span className='small'>
                            {`/${parseInt(item.feels_like.day)}°`}
                        </span>
                    </div>
                </div>
        )
    )
}

export default WeatherList;