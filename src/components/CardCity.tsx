import {
  FC,
  useState,
  MouseEvent
} from 'react';

import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AirIcon from '@mui/icons-material/Air';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';

import { progressSelector } from '../core/progress/progress.selectors';
import { GET_WEATHER_CITY_SHORT } from '../core/weather/weather.const';


interface CardCityProps {
  id: number,
  name: string,
  country: string,
  temperature: number,
  speedWind: number,
  weatherInfo: string,
  iconId: string,
}

const CardCity: FC<CardCityProps> = (props) => {

  const {
    id,
    name,
    country,
    temperature,
    speedWind,
    weatherInfo,
    iconId,
  } = props;

  const progress = useSelector(progressSelector);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Link to={`/weather-detail/${id}`}>
      <Card sx={{
        width: 350,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        mr: 1,
        mb: 1,
      }}>
        {
          !progress.elementsProgress[GET_WEATHER_CITY_SHORT] ? (
            <>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    maxHeight: 60,
                    overflow: 'hidden'
                  }}
                >
                  {name}, {country}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  {Math.floor(temperature)} °C
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {weatherInfo}
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  <AirIcon sx={{ mr: .5, }} />
                  {speedWind} м/с
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{
                  width: 160,
                  height: 160,
                  objectFit: 'cover'
                }}
                image={`http://openweathermap.org/img/w/${iconId}.png`}
                alt="icon"
              />
              <IconButton
                size="large"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  p: .8,
                }}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <RefreshIcon
                    color="action"
                    sx={{ mr: 1 }}
                  />
                  <Typography
                    color="text.secondary"
                  >Оновити дані</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <DeleteIcon
                    color="action"
                    sx={{ mr: 1 }}
                  />
                  <Typography
                    color="text.secondary"
                  >Видалити</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <CircularProgress />
          )
        }
      </Card>
    </Link>
  );
}

export default CardCity;