import { GET_WEATHER_CITY } from "./weather.const";

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