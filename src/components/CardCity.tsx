import {
  FC,
  useState
} from 'react';
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

const CardCity: FC = () => {

  const [weatherData, setWeatherData] = useState({
    name: "",
    weather: [
      {
        main: "",
        icon: "",
      }
    ],
    main: {
      temp: 0,
    },
    sys: {
      country: ''
    },
    wind: {
      speed: 0,
    }
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Link to="/">
      <Card sx={{
        p: 1,
        maxWidth: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
      }}>
        {
          weatherData.name ? (
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
                  {weatherData.name}, {weatherData.sys.country}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  {Math.floor(weatherData.main.temp)} °C
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {weatherData.weather[0].main}
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
                  {weatherData.wind.speed} м/с
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{
                  width: 160,
                  height: 160,
                  objectFit: 'cover'
                }}
                image={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
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