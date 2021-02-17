import React, {Component} from 'react';
import FrontSideView from './FrontSideView';
import moment from 'moment';
import {getResource} from '../services/api';


export default class FrontSide extends Component {

    state = {currentWeather: null, prevCityId: null}
    udateWether = () => {
        const   {currentCity, lang, units} = this.props;
        const city = localStorage.getItem('cityId') ? localStorage.getItem('cityId') : currentCity.id;
        getResource(`https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=fcf8724495fdc0ffd44f1c13dde3b8df&lang=${lang}&units=${units}`).then(weather => {
            this.setState({currentWeather: weather});
            console.log(weather);
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentCity.id !== prevState.prevCityId) {
            return {
                prevCityId: nextProps.currentCity.id, 
                currentWeather: null
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentWeather) {
            return null;
        }
        this.udateWether();
    }

    componentDidMount() {
        this.udateWether();
    }

    render() {
        if (!this.state.currentWeather) {
            return null;
        }
        const {name} = this.state.currentWeather;
        const {temp, feels_like} = this.state.currentWeather.main;
        const {icon, description} = this.state.currentWeather.weather[0];

        return (
            <FrontSideView
                date={moment()}
                icon={icon}
                temperature={temp}
                apparentTemperature={feels_like}
                summary={description}
                currentCityName={name}
                onClick={this.props.onClick}
            />
        );
    }
} 