import React, {Component} from 'react';
import FrontSideView from '../FrontSideView';
import {getResource} from '../services/api';


export default class FrontSide extends Component {

    state = {currentWeather: null, prevCity: null, weatherList: null};

    updateWeather = () => {
        const {currentCity, units, currentLang} = this.props;
        const {lon, lat} = currentCity;
        getResource(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=fcf8724495fdc0ffd44f1c13dde3b8df&lang=${currentLang}&units=${units}`)
            .then(weather => {
                const hourly = [];
                for (let n = 2; n < 16; n+=3) {
                    hourly.push(weather.hourly[n]);
                }
                this.setState({
                    currentWeather: weather,
                    weatherList: hourly
                })
            });
    }

    onDaily = () => {
        const daily = [];
        // погода на 5 дней
        for (let i = 0; i < 5; i++) {
            daily.push(this.state.currentWeather.daily[i]);
        }
        this.setState({
            weatherList: daily
        })
    }

    onHourly = () => {
        const hourly = [];
        // погода на ближайшие 15 часов, показывает каждые 3 часа
        for (let n = 2; n < 16; n+=3) {
            hourly.push(this.state.currentWeather.hourly[n]);
        }
        this.setState({
            weatherList: hourly
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentCity.city !== prevState.prevCity) {
            return {
                prevCity: nextProps.currentCity.city,
                currentWeather: null
            }
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentWeather) {
            return null;
        }
        if (this.props.currentLang !== prevProps.currentLang) {
            this.updateWeather();
        }
        this.updateWeather();
    }

    componentDidMount() {
        this.updateWeather();
    }

    render() {
        if (!this.state.currentWeather) {
            return null;
        };

        const {city} = this.props.currentCity;

        return (
            <FrontSideView
                currentLang={this.props.currentLang}
                currentWeather={this.state.currentWeather.current}
                currentCityName={city}
                weatherList={this.state.weatherList}
                onDaily={this.onDaily}
                onHourly={this.onHourly}
            />
        );
    }
} 