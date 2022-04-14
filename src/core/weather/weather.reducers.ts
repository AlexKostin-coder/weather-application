import {
  GET_WEATHER_CITY,
  GET_WEATHER_CITY_SHORT,
} from "./weather.const";

export const weather_short = (state = {}, action: any) => {
  switch (action.type) {
    case GET_WEATHER_CITY_SHORT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: return state;
  }
}

export const weather = (state = {}, action: any) => {
  switch (action.type) {
    case GET_WEATHER_CITY: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: return state;
  }
}