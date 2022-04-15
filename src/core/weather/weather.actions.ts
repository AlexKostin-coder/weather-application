import { Dispatch } from "redux";

import { RootState } from './../redux/reducers';
import { API_KEY } from "../environment";
import { WeatherActionTypes } from './weather.const';
import {
  GetCurrentWeatherInCityByName,
  GetForecastWeatherCity
} from './weather.types';

export const getCurrentWeatherInCityByName = (cityName: string) => async (
  dispatch: Dispatch<GetCurrentWeatherInCityByName>,
  getState: RootState,
  api: any
) => {
  try {
    const res = await api('GET', `weather?q=${cityName}&units=metric&lang=ua&appid=${API_KEY}`);
    return dispatch({
      type: WeatherActionTypes.GET_CURRENT_WEATHER,
      payload: {
        [res.data.id]: { ...res.data }
      },
    });
  } catch (err) {
    console.log('getCurrentWeatherInCityByName', err);
    throw new Error('Помилка пошуку');
  }
};

export const getCurrentWeatherInCityByCityId = (cityId: number) => async (
  dispatch: Dispatch<GetCurrentWeatherInCityByName>,
  getState: RootState,
  api: any
) => {
  try {
    const res = await api('GET', `weather?id=${cityId}&units=metric&lang=ua&appid=${API_KEY}`);
    return dispatch({
      type: WeatherActionTypes.GET_CURRENT_WEATHER,
      payload: {
        [res.data.id]: { ...res.data }
      },
    });
  } catch (err) {
    console.log('getCurrentWeatherInCityByName', err);
    throw new Error('Помилка пошуку');
  }
};

export const getForecastWeatherCity = ({ lon, lat }: { lon: string, lat: string }) => async (
  dispatch: Dispatch<GetForecastWeatherCity>,
  getState: RootState,
  api: any
) => {
  try {
    const res = await api('GET', `onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    return dispatch({
      type: WeatherActionTypes.GET_WEATHER_CITY,
      payload: { ...res.data },
    });
  } catch (err) {
    console.log('getWeatherCity', err);
  }
}

export const removeCity = (id: number, name: string) => {
  const cities = localStorage.getItem('cities');
  const newCities = cities
    .split(",")
    .filter(cityName => name !== cityName)
    .join(",");

  localStorage.setItem('cities', newCities);
  return {
    type: WeatherActionTypes.REMOVE_CITY,
    payload: { id },
  }
}