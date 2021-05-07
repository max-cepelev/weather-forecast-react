import React, {Component} from 'react';
import FrontSideView from '../FrontSideView';
import {getWeather} from '../services/api';


export default class FrontSide extends Component {

    state = {
        currentWeather: null, 
        prevCity: null, 
        weatherList: null,
        activeButton: "hourly"
    };

    updateWeather = () => {
        const {currentCity, units, currentLang} = this.props;
        const {lon, lat} = currentCity;
        getWeather(lat, lon, currentLang, units)
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
            weatherList: daily,
            activeButton: "daily"
        })
    }

    onHourly = () => {
        const hourly = [];
        // погода на ближайшие 15 часов, показывает каждые 3 часа
        for (let n = 2; n < 16; n+=3) {
            hourly.push(this.state.currentWeather.hourly[n]);
        }
        this.setState({
            weatherList: hourly,
            activeButton: "hourly"
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentCity.id !== prevState.prevCity) {
            return {
                prevCity: nextProps.currentCity.id,
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

        const {name} = this.props.currentCity;

        return (
            <FrontSideView
                currentLang={this.props.currentLang}
                currentWeather={this.state.currentWeather.current}
                currentCityName={name}
                onClick={this.props.onClick}
                weatherList={this.state.weatherList}
                activeButton={this.state.activeButton}
                onDaily={this.onDaily}
                onHourly={this.onHourly}
            />
        );
    }
} 