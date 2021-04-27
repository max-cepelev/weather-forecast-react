import React, {Component} from 'react';
import FrontSideView from '../FrontSideView';
import {getResource} from '../services/api';


export default class FrontSide extends Component {

    state = {currentWeather: null, prevCity: null};

    updateWeather = () => {
        const {currentCity, units, currentLang} = this.props;
        const {lon, lat} = currentCity;
        getResource(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=fcf8724495fdc0ffd44f1c13dde3b8df&lang=${currentLang}&units=${units}`)
            .then(weather => {this.setState({currentWeather: weather})});
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
        console.log(this.state.currentWeather);
        this.state.currentWeather.daily.forEach(data => {
            console.log(new Date(data.dt * 1000));
        })
        const {city} = this.props.currentCity;
        const {temp, feels_like, dt} = this.state.currentWeather.current;
        const {icon, description} = this.state.currentWeather.current.weather[0];
        const day = new Date(dt * 1000).toLocaleString(`${this.props.currentLang}`, {weekday: 'long'});
        const date = new Date(dt * 1000).toLocaleString(`${this.props.currentLang}`, {day: 'numeric', month: 'long'});
        const daily = this.state.currentWeather.daily;

        return (
            <FrontSideView
                day={day}
                date={date}
                icon={icon}
                temperature={temp}
                apparentTemperature={feels_like}
                summary={description}
                currentCityName={city}
                daily={daily}
            />
        );
    }
} 