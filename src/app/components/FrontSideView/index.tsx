import getDateFromUtc from '../../helpers/getDateFromUtc'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  ICurrentWeather,
  IDailyWeather,
  IHourlyWeather,
} from '../../interfaces/Weather'
import { optionsActions } from '../../store/reducers/OptionsSlice'
import WeatherIcon from '../WeatherIcon'
import WeatherList from '../WeatherList'
import Wind from '../Wind'
import './FrontSide.scss'
import optionsImage from './options.svg'

interface Props {
  currentWeather: ICurrentWeather
  currentCityName: string
  forecast: IHourlyWeather[] | IDailyWeather[]
  onClick: () => void
}

const ucFirst = (str: string) => {
  if (!str) return str
  return str[0].toUpperCase() + str.slice(1)
}

export default function FrontSideView({
  currentWeather,
  currentCityName,
  onClick,
  forecast,
}: Props) {
  const { temp, feels_like, dt, humidity, wind_deg, wind_speed } =
    currentWeather
  const { activeForecast, lang } = useAppSelector(
    (store) => store.optionsReducer
  )
  const { setDaily, setHourly } = optionsActions
  const dispath = useAppDispatch()
  const { id, icon, description } = currentWeather.weather[0]
  const day = getDateFromUtc(dt).toLocaleString(`${lang}`, {
    weekday: 'long',
  })
  const date = getDateFromUtc(dt).toLocaleString(`${lang}`, {
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className={`card is-${icon}`}>
      <div className="card-row">
        <div className="card-day flexfont24">{ucFirst(day)}</div>
        <div className="card-day flexfont24">{date}</div>
      </div>
      <div className="card-temperature">
        {temp.toFixed(0)}°
        <WeatherIcon icon={id >= 800 ? icon : id.toString()} width="80px" />
      </div>
      <div className="small">Ощущается как {feels_like.toFixed(0)}°</div>
      <div className="card-weather">{ucFirst(description)}</div>
      <div className="card-row card-conditions flexfont16">
        <div className="card-row card-conditions">
          <img src="icons/humidity.svg" alt="humidity" />
          <span> - </span>
          <div>{humidity}%</div>
        </div>
        <div className="card-row card-conditions">
          <img src="icons/wind.svg" alt="wind" />
          <span> - </span>
          <Wind
            deg={wind_deg}
            speed={wind_speed}
            classes="wind"
            // arrowHeight="18px"
          />
        </div>
      </div>
      <div className="card-row">
        <div
          className={`card-select ${activeForecast === 'hourly' && 'active'}`}
          onClick={() => dispath(setHourly())}
        >
          По часам
        </div>
        <div
          className={`card-select ${activeForecast === 'daily' && 'active'}`}
          onClick={() => dispath(setDaily())}
        >
          По дням
        </div>
      </div>
      <WeatherList forecast={forecast} />
      <div className="card-row card-footer">
        <h1 className="card-city flexfont24">{currentCityName}</h1>
        <button className="card-options" onClick={onClick}>
          <img src={optionsImage} alt="options" width={32} />
        </button>
      </div>
    </div>
  )
}
