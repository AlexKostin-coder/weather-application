import {
  FC,
  useEffect,
} from 'react';
import {
  useParams,
  useSearchParams
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getForecastWeatherCity,
  getCurrentWeatherInCityByCityId
} from '../core/weather/weather.actions';
import {
  currentWeatherSelector,
  forecastWeatherSelector
} from '../core/weather/weather.selectors';
import { useTypedSelector } from '../core/redux/hooks';
import {
  getNameDay,
  getNameMonth
} from '../core/tools';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardMedia from '@mui/material/CardMedia';


const DetailWeatherCity: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const currentWeather = useTypedSelector(currentWeatherSelector);
  const forecastWeather = useTypedSelector(forecastWeatherSelector);

  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  const cityInfo = currentWeather[params.cityId];

  useEffect(() => {
    dispatch(getCurrentWeatherInCityByCityId(parseInt(params.cityId, 10)));
    dispatch(getForecastWeatherCity({ lat, lon }));
  }, []);

  return (
    <Card >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <div>
            <Typography
              variant="h5"
            >
              {getNameDay(forecastWeather.current?.dt, { shortDate: false })}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              {getNameMonth(forecastWeather.current?.dt)}
            </Typography>
            <Typography sx={{
              fontSize: 12,
              display: 'flex',
              alignItems: 'center'
            }}
            >
              <LocationOnIcon fontSize='small' />
              {cityInfo?.name}, {cityInfo?.sys.country}
            </Typography>
            {
              forecastWeather.current?.weather[0].icon &&
              <CardMedia
                component="img"
                sx={{
                  width: 90,
                  height: 90,
                }}
                image={`http://openweathermap.org/img/w/${forecastWeather.current?.weather[0].icon}.png`}
                alt="icon"
              />
            }
            <Typography
              sx={{
                fontSize: 24,
              }}
            >
              {forecastWeather.current?.temp} °C
            </Typography>
            <Typography>
              {forecastWeather.current?.weather[0].main}
            </Typography>
          </div>
          {
            forecastWeather.daily?.map((item) => {
              return (
                <Card
                  key={item.dt}
                  sx={{ m: .4, textAlign: 'center' }}
                >
                  {
                    item?.weather[0].icon &&
                    <CardMedia
                      component="img"
                      sx={{
                        width: 60,
                        height: 60,
                        m: 'auto',
                      }}
                      image={`http://openweathermap.org/img/w/${item?.weather[0].icon}.png`}
                      alt="icon"
                    />
                  }
                  <CardContent sx={{
                    py: 0,
                    px: 1
                  }}>
                    <Typography sx={{ fontSize: 14 }}>
                      {getNameDay(item.dt, { shortDate: true })}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      {item.temp.day} °C
                    </Typography>
                  </CardContent>
                </Card>
              )
            })
          }
        </Box>
      </CardContent>
    </Card>
  );
}

export default DetailWeatherCity;