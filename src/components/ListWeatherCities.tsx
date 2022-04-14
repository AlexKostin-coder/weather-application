import {
  FC,
  useEffect,
  useState,
  ChangeEvent
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

import { getWeatherCityShort } from '../core/weather/weather.actions';
import { weatherShortSelector } from '../core/weather/weather.selectors';

import CardCity from './CardCity';

const ListWeatherCities: FC = () => {
  const dispatch = useDispatch();
  const weatherShort = useSelector(weatherShortSelector);
  const [citiesName, setCitiesName] = useState(['London', 'Lityn', 'New York', 'Kalynivka']);
  const [cityName, setCityName] = useState('');

  const getAllDataWeatherCities = async () => {
    try {
      citiesName.map((name) => {
        dispatch(getWeatherCityShort(name));
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

  const handleSearchCity = async () => {
    try {
      await dispatch(getWeatherCityShort(cityName));
    } catch (err) {
      console.log('handleSearchCity', err);
    }
  }

  return (
    <>
      <Input
        placeholder="Name city"
        value={cityName}
        onChange={handleChangeCityName}
      />
      <Button
        disabled={!cityName.length}
        variant="contained"
        onClick={handleSearchCity}
      >Search</Button>
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
              weather
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
              />
            )
          })
        }
      </Box>
    </>
  );
}

export default ListWeatherCities;