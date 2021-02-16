import React, {Component} from 'react';
import FrontSideView from './FrontSideView';
import moment from 'moment';
import {getResource} from '../services/api';


export default class FrontSide extends Component {

    state = {currentWeather: null}

    componentDidMount() {
        const   {city, lang, units} = this.props;
        getResource(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=fcf8724495fdc0ffd44f1c13dde3b8df&lang=${lang}&units=${units}`).then(weather => {
            this.setState({currentWeather: weather});
            console.log(weather);
        });
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