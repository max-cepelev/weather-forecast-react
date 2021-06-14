import WeatherItem from './WeatherItem';

const WeatherList = ({weatherList, getNewDate}) => {
    return (
        <div className="scroll">
            {weatherList.map(item => (<WeatherItem key={item.dt} getNewDate={getNewDate} weatherItem={item}/>))}
        </div>
    )
}

export default WeatherList;