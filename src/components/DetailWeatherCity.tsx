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
import Stack from '@mui/material/Stack';


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
    <>
      <Card>
        <CardContent sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <Box>
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
            <Typography sx={{ fontSize: 24 }}>
              {forecastWeather.current?.temp} °C
            </Typography>
            <Typography>
              {forecastWeather.current?.weather[0].main}
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
          >
            {
              forecastWeather.daily?.map((item) => {
                return (
                  <Card
                    key={item.dt}
                    sx={{ textAlign: 'center', p: 0, m: 0 }}
                  >
                    {
                      item?.weather[0].icon &&
                      <CardMedia
                        component="img"
                        sx={{
                          width: 80,
                          height: 80,
                          m: 'auto',
                        }}
                        image={`http://openweathermap.org/img/w/${item?.weather[0].icon}.png`}
                        alt="icon"
                      />
                    }
                    <CardContent sx={{ px: 1, py: 0 }}>
                      <Typography sx={{ fontSize: 16 }}>
                        {getNameDay(item.dt, { shortDate: true })}
                      </Typography>
                      <Typography sx={{ fontSize: 18, p: 0, m: 0 }}>
                        {item.temp.day} °C
                      </Typography>
                      <Typography sx={{ fontSize: 12 }}>
                        {item.temp.min} / {item.temp.max}
                      </Typography>
                    </CardContent>
                  </Card>
                )
              })
            }
          </Stack>
        </CardContent>
      </Card>
      <Stack
        direction="row"
        spacing={.1}
        sx={{
          position: "relative",
          justifyContent: 'center',
        }}
      >
        {
          forecastWeather.hourly?.filter((item, index) => index < 16).map((item) => {
            return (
              <Box sx={{
                backgroundColor: '#c1c1c1',
                px: 2,
                // position: 'absolute',
                top: Math.floor(item.temp),
              }}>
                <Typography fontSize={12}>
                  {Math.floor(item.temp)}
                </Typography>
              </Box>
            )
          })
        }
      </Stack>
    </>
  );
}

export default DetailWeatherCity;