import {
  FC,
  useEffect
} from 'react';
import { useDispatch } from 'react-redux';
import { getWeatherCity } from '../core/weather/weather.actions';

const ListWeatherCities: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeatherCity("London"));
  }, []);

  return (
    <div>123</div>
  );
}

export default ListWeatherCities;