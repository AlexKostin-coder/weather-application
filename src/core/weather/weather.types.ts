import { WeatherActionTypes } from './weather.const';

export interface ForecastWeather {
  current: {
    dt: number,
    weather: Array<{
      icon: string,
      main: string
    }>,
    temp: number,
  },
  daily: Array<{
    dt: number,
    weather: Array<{
      icon: string,
      main: string
    }>,
    temp: {
      day: number,
      min: number,
      max: number,
    }
  }>,
  hourly: Array<{
    temp: number,
  }>
}
export interface GetCurrentWeatherInCityByName {
  type: WeatherActionTypes.GET_CURRENT_WEATHER,
  payload: {
    [key: number]: {}
  },
}

export interface RemoveCityAction {
  type: WeatherActionTypes.REMOVE_CITY,
  payload: { id: number },
}

export interface GetForecastWeatherCity {
  type: WeatherActionTypes.GET_WEATHER_CITY,
  payload: any
};

export type WeatherActions = GetForecastWeatherCity;

export type WeatherShortActions = GetCurrentWeatherInCityByName | RemoveCityAction;