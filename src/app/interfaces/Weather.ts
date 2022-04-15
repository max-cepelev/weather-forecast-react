export interface IWeather {
  description: string
  icon: string
  id: number
  main: string
}

export interface IDailyTemp {
  day: number
  eve: number
  max: number
  min: number
  morn: number
  night: number
}

export interface IDailyFeelsLike {
  day: number
  eve: number
  morn: number
  night: number
}

export interface IWeatherBase {
  clouds: number
  dew_point: number
  dt: number
  humidity: number
  pressure: number
  uvi: number
  weather: IWeather[]
  wind_deg: number
  wind_speed: number
}

export interface ICurrentWeather extends IWeatherBase {
  sunrise: number
  sunset: number
  visibility: number
  feels_like: number
  temp: number
}

export interface IDailyWeather extends IWeatherBase {
  moon_phase: number
  moonrise: number
  moonset: number
  feels_like: IDailyFeelsLike
  pop: number
  temp: IDailyTemp
  sunrise: number
  sunset: number
  wind_gust: number
}

export interface IHourlyWeather extends IWeatherBase {
  pop: 0
  visibility: number
  wind_gust: number
  temp: number
  feels_like: number
}

export interface IWeatherData {
  current: ICurrentWeather
  daily: IDailyWeather[]
  hourly: IHourlyWeather[]
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
}
