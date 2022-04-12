import { API_KEY } from "../environment";
import { setProgress } from "../progress/progress.actions";
import { GET_WEATHER_CITY } from "./weather.const";

export const getWeatherCity = (city: string = "") => async (dispatch: any, getState: any, api: any) => {
  try {
    if (!city) {
      throw new Error('Назва міста відсутня!')
    }
    dispatch(setProgress(true, GET_WEATHER_CITY));
    const res = await api('GET', `/weather?q=${city}&units=metric&lang=ua&appid=${API_KEY}`);
    dispatch({
      type: GET_WEATHER_CITY,
      payload: {
        [res.data.id]: { ...res.data }
      },
    });
    dispatch(setProgress(false, GET_WEATHER_CITY));
  } catch (err) {
    console.log('getWeatherCity', err);
  }
};