import React, {Component} from 'react';
import './FrontSide.css';
import {getResource} from '../services/api';
import optionsImage from './options.svg';

export default class FrontSide extends Component {

    state = {currentWeather: null}

    componentDidMount() {
        let city = this.props.cities[666].id;
        getResource(`https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=fcf8724495fdc0ffd44f1c13dde3b8df`).then(weather => {
            this.setState({currentWeather: weather.currently})
        });
    }

    render() {
        const {date, temperature, summary, apparentTemperature, currentCityName} = this.props;
        return (
            <div className='card is-clear-day'>
                <div className='card-row'>
                    <div className='card-day'>{date.format('dddd')}</div>
                    <div className='card-day'>{date.format('MMM Do')}</div>
                </div>
                <img src="/icons/clear-day.svg" alt="clear-day" width={120}/>
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
                    <button className='card-options'>
                        <img src={optionsImage} alt="options" width={32}/>
                    </button>
                </div>
            </div>
        );
    }
}