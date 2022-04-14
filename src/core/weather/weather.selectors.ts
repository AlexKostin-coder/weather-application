import { RootState } from './../redux/reducers';
export const currentWeatherSelector = (state: RootState) => state.current_weather;
export const forecastWeatherSelector = (state: RootState) => state.forecast_weather;