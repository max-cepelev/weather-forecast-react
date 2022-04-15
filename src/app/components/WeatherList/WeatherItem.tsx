import './weatherList.scss'
import WeatherIcon from '../WeatherIcon'
import Wind from '../Wind'
import { IDailyWeather, IHourlyWeather } from '../../interfaces/Weather'
import getDateFromUtc from '../../helpers/getDateFromUtc'

export default function WeatherItem({
  forecastItem,
}: {
  forecastItem: IHourlyWeather | IDailyWeather
}) {
  const getWeekDay = (date: Date) => {
    let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    return days[date.getDay()]
  }

  const { dt, weather, temp, wind_deg, wind_speed } = forecastItem

  let title = ''
  let tempView = ''
  let weatherIcon = weather[0].id >= 800 ? weather[0].icon : weather[0].id

  if (typeof temp !== 'number') {
    title = `${getWeekDay(getDateFromUtc(dt))}, ${getDateFromUtc(dt).getDate()}`
    tempView = `${temp.max.toFixed()}/${temp.min.toFixed()}°`
  } else {
    title = getDateFromUtc(dt).toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric',
    })
    tempView = `${temp.toFixed()}°`
  }
  return (
    <div className="weather-list flexfont16">
      <p className="title">{title}</p>
      <WeatherIcon icon={weatherIcon.toString()} width="40px" />
      <p>{tempView}</p>
      <Wind
        deg={wind_deg}
        speed={wind_speed}
        classes="wind wind-mini"
        // arrowHeight="12px"
      />
    </div>
  )
}
