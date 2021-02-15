import React from 'react';
import './FrontSide.css';

const FrontSide = ({
    date,
    icon,
    temperature,
    summary,
    apparentTemperature,
    currentCityName
}) => {
    return (
        <div className='card'>
            <div className='card-row'>
                <div className='card-day'>{date.format('dddd')}</div>
                <div className='card-day'>{date.format('MMM Do')}</div>
            </div>
            <div>{icon}</div>
            <div className='card-row'>
                <div className='card-temperature'>
                    {`${temperature} °`}
                    <span className='small'>
                        {`/${apparentTemperature} °`}
                    </span>
                </div>
                <div className='card-weather'>{summary}</div>
            </div>
            <div className="card-line"></div>
            <div className="card-row">
                <div className='card-city'>{currentCityName}</div>
                <button>Options</button>
            </div>
        </div>
    );
}


export default FrontSide;