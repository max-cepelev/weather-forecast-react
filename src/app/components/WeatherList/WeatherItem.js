import './weatherList.scss';
import WeatherIcon from '../WeatherIcon';
import Wind from '../Wind/Wind';

const WeatherItem = ({weatherItem, getNewDate}) => {
    
    const getWeekDay = (date) => {
        let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return days[date.getDay()];
    }
    const {dt, weather, temp, wind_deg, wind_speed} = weatherItem;
    let title = "";
    let tempView = "";
    let weatherIcon = weather[0].id >= 800 ? weather[0].icon : weather[0].id;
    if (weatherItem.temp.day) {
        title = `${getWeekDay(getNewDate(dt))}, ${getNewDate(dt).getDate()}`;
        tempView  = `${parseInt(temp.max)}/${parseInt(temp.min)}°`
    } else {
        title = getNewDate(dt).toLocaleString('ru', {hour: 'numeric', minute: 'numeric'});
        tempView = `${parseInt(temp)}°`;
    }
    return (
        <div className='weather-list flexfont16'>
            <p className="title">{title}</p>
            <WeatherIcon icon={weatherIcon} width='40px'/>
            <p>{tempView}</p>
            <Wind deg={wind_deg} speed={wind_speed} classes="wind wind-mini" arrowHeight="12px"/>
        </div>
    )
}

export default WeatherItem;