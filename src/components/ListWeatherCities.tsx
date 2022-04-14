import {
  FC,
  useEffect,
  useState,
  ChangeEvent
} from 'react';
import {
  useDispatch,
} from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

import {
  getCurrentWeatherInCityByName,
  removeCity
} from '../core/weather/weather.actions';
import { useTypedSelector } from '../core/redux/hooks';
import { currentWeatherSelector } from '../core/weather/weather.selectors';
import { setProgress } from '../core/progress/progress.actions';

import CardCity from './CardCity';
import { WeatherActionTypes } from '../core/weather/weather.const';

const ListWeatherCities: FC = () => {
  const dispatch = useDispatch();
  const weatherShort = useTypedSelector(currentWeatherSelector);
  const [cityName, setCityName] = useState('');

  const getAllDataWeatherCities = async () => {
    try {
      const cities = localStorage.getItem('cities');
      if (!cities) {
        return;
      }
      const a = [];
      cities
        .split(",")
        .map((name) => {
          dispatch(getCurrentWeatherInCityByName(name));
        });
    } catch (err) {
      console.log('getAllDataWeatherCities', err);
    }
  }

  useEffect(() => {
    getAllDataWeatherCities();
  }, []);

  const handleChangeCityName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCityName(value);
  }

  const handleWeatherCity = async (name: string) => {
    try {
      dispatch(setProgress(true, WeatherActionTypes.GET_CURRENT_WEATHER));
      await dispatch(getCurrentWeatherInCityByName(name));
      dispatch(setProgress(false, WeatherActionTypes.GET_CURRENT_WEATHER));
    } catch (err) {
      console.log('handleSearchCity', err);
    }
  }

  const handleSearchCity = async () => {
    try {
      await dispatch(getCurrentWeatherInCityByName(cityName));
      const cities = localStorage.getItem('cities');
      if (!cities) {
        return localStorage.setItem('cities', cityName);
      }
      const citiesName = [cities, cityName];
      localStorage.setItem('cities', citiesName.join(","));
      setCityName('');
    } catch (err) {
      console.log('handleSearchCity', err);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Input
          placeholder="Name city"
          value={cityName}
          onChange={handleChangeCityName}
        />
        <Button
          disabled={!cityName.length}
          variant="text"
          onClick={handleSearchCity}
        >Search</Button>
      </Box>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        m: 1,
      }}
      >
        {
          Object.keys(weatherShort).map((cityId) => {
            const {
              id,
              name,
              sys,
              main,
              wind,
              weather,
              coord
            } = weatherShort[cityId];
            return (
              <CardCity
                key={cityId}
                id={id}
                name={name}
                country={sys.country}
                temperature={main.temp}
                speedWind={wind.speed}
                weatherInfo={weather[0].main}
                iconId={weather[0].icon}
                coord={coord}
                onRefresh={() => { handleWeatherCity(name) }}
                onRemove={() => { dispatch(removeCity(id, name)) }}
              />
            )
          })
        }
      </Box>
    </>
  );
}

export default ListWeatherCities;