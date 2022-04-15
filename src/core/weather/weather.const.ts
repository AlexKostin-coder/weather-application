import { ForecastWeather } from "./weather.types";

export enum WeatherActionTypes {
  GET_WEATHER_CITY = 'GET_WEATHER_CITY',
  GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER',
  REMOVE_CITY = 'REMOVE_CITY',
}

export const initialWeatherCurrentState = {};
export const initialForecastWeatherState: ForecastWeather = {
  current: {
    dt: 0,
    weather: [
      {
        icon: '',
        main: '',
      }
    ],
    temp: 0,
  },
  daily: [
    {
      dt: 0,
      weather: [
        {
          icon: '',
          main: '',
        }
      ],
      temp: {
        day: 0,
        min: 0,
        max: 0,
      }
    }
  ],
  hourly: [
    {
      dt: 0,
      temp: 0,
    }
  ]
};
