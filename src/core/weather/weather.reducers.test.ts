import {
  forecast_weather,
  current_weather
} from './weather.reducers';
import {
  initialForecastWeatherState,
  WeatherActionTypes
} from './weather.const';

describe('TEST', () => {
  it('has a default states forecase reducers', () => {
    expect(forecast_weather(undefined, { type: WeatherActionTypes.GET_WEATHER_CITY, payload: {} })).toEqual(initialForecastWeatherState)
  });
});