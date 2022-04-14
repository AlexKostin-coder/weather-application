import {
  WeatherActionTypes,
  initialWeatherShortState,
  initialWeatherState,
} from './weather.const';
import {
  WeatherShortActions,
  WeatherActions,
} from './weather.types';

export const current_weather = (state = initialWeatherShortState, action: WeatherShortActions) => {
  switch (action.type) {
    case WeatherActionTypes.GET_CURRENT_WEATHER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case WeatherActionTypes.REMOVE_CITY: {
      return {
        ...Object.keys(state)
          .filter((cityId) => parseInt(cityId, 10) !== action.payload.id)
          .reduce((acc, cityId) => {
            acc[cityId] = state[cityId];
            return acc;
          }, {}),
      }
    }
    default:
      return state;
  }
}

export const forecast_weather = (state = initialWeatherState, action: WeatherActions) => {
  switch (action.type) {
    case WeatherActionTypes.GET_WEATHER_CITY: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}