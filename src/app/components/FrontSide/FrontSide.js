import React, {Component} from 'react';
import FrontSideView from '../FrontSideView';
import Spinner from '../Spinner';
import {getWeather} from '../services/api';


const setDaily = (arr) => {
    const newArr = [];
    // погода на 5 дней
    for (let i = 0; i < 5; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}
const setHourly = (arr) => {
    const newArr = [];
    // погода на ближайшие 15 часов, показывает каждые 3 часа
    for (let i = 2; i < 16; i+=3) {
        newArr.push(arr[i]);
    }
    return newArr;
}
export default class FrontSide extends Component {

    state = {
        currentWeather: null, 
        prevCity: null, 
        weatherList: null,
        loading: true,
        activeButton: "hourly"
    };

    updateWeather = () => {
        const {currentCity, units, currentLang} = this.props;
        const {lon, lat} = currentCity;
        if (currentCity.id) {
            getWeather(lat, lon, currentLang, units)
            .then(weather => {
                this.setState({
                    currentWeather: weather,
                    weatherList: this.state.activeButton === "hourly" ? setHourly(weather.hourly) : setDaily(weather.daily),
                    loading: false
                })
            })
        }
    }

    onDaily = () => {
        const daily = setDaily(this.state.currentWeather.daily);
        this.setState({
            weatherList: daily,
            activeButton: "daily"
        })
    }

    onHourly = () => {
        const hourly = setHourly(this.state.currentWeather.hourly);
        this.setState({
            weatherList: hourly,
            activeButton: "hourly"
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentCity.id !== prevState.prevCity) {
            return {
                prevCity: nextProps.currentCity.id,
                currentWeather: null,
                loading: true
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

        if (this.state.loading) {
            return <Spinner/>
        }

        if (!this.state.currentWeather) {
            return null;
        };

        const {currentLang, currentCity, onClick} = this.props;
        const {currentWeather, weatherList, activeButton} = this.state;

        return (
            <FrontSideView
                currentLang={currentLang}
                currentWeather={currentWeather.current}
                currentCityName={currentCity.name}
                onClick={onClick}
                weatherList={weatherList}
                activeButton={activeButton}
                onDaily={this.onDaily}
                onHourly={this.onHourly}
            />
        );
    }
} 