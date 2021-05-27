import WeatherIcon from '../WeatherIcon';
import WeatherList from '../WeatherList';
import Wind from '../Wind/Wind';
import './FrontSide.scss';
import optionsImage from './options.svg';

const FrontSideView = ({currentLang, currentWeather, currentCityName, onClick, weatherList, activeButton, onDaily, onHourly}) => {

    const ucFirst = (str) => {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    const getNewDate = (date) => {
        return new Date(date * 1000)
    }

    const {temp, feels_like, dt, humidity, wind_deg, wind_speed} = currentWeather;
    const {id, icon, description} = currentWeather.weather[0];
    const day = getNewDate(dt).toLocaleString(`${currentLang}`, {weekday: 'long'});
    const date = getNewDate(dt).toLocaleString(`${currentLang}`, {day: 'numeric', month: 'long'});

    return (
        <div className={`card is-${icon}`}>
            <div className='card-row'>
                <div className='card-day flexfont24'>{ucFirst(day)}</div>
                <div className='card-day flexfont24'>{date}</div>
            </div>
            <div className='card-temperature'>
                    {`${parseInt(temp)}°`}
                    <WeatherIcon icon={id >= 800 ? icon : id} width='80px'/>
            </div>
            <div className="small">{`Ощущается как ${parseInt(feels_like)}°`}</div>
            <div className='card-weather'>{ucFirst(description)}</div>
            <div className="card-row card-conditions flexfont16">
                <div className="card-row card-conditions">
                    <img src="icons/humidity.svg" alt="humidity"/>
                    <span> - </span>
                    <div>  {`${humidity}%`}</div>
                </div>
                <div className="card-row card-conditions">
                    <img src="icons/wind.svg" alt="wind" />
                    <span> - </span>
                    <Wind deg={wind_deg} speed={wind_speed} classes="wind" arrowHeight="18px"/>
                </div>
            </div>
            <div className="card-row">
                <div className={`card-select ${activeButton === "hourly" && "active"}`} onClick={onHourly}>По часам</div>
                <div className={`card-select ${activeButton === "daily" && "active"}`} onClick={onDaily}>По дням</div>
            </div>
            <div className="scroll">
                {weatherList.map(weatherItem => (<WeatherList key={weatherItem.dt} weatherItem={weatherItem} getNewDate={getNewDate}/>))}
            </div>
            <div className='card-row card-footer'>
                <h1 className='card-city flexfont24'>{currentCityName}</h1>
                <button className='card-options' onClick={onClick}>
                    <img src={optionsImage} alt="options" width={32}/>
                </button>
            </div>
        </div>
    );
}

export default FrontSideView;