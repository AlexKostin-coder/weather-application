import {
  FC,
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import Box from '@mui/material/Box';

import { getWeatherCityShort } from '../core/weather/weather.actions';
import { weatherShortSelector } from '../core/weather/weather.selectors';

import CardCity from './CardCity';

const ListWeatherCities: FC = () => {
  const dispatch = useDispatch();
  const weatherShort = useSelector(weatherShortSelector);
  const [citiesName, setCitiesName] = useState(['London', 'Lityn']);

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
    // dispatch(getWeatherCityShort("London"));
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
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
  );
}

export default ListWeatherCities;