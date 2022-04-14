import {
  FC,
  useState,
  MouseEvent
} from 'react';

import { useNavigate } from "react-router-dom";

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
interface CardCityProps {
  id: number,
  name: string,
  country: string,
  temperature: number,
  speedWind: number,
  weatherInfo: string,
  iconId: string,
  coord: {
    lat: string,
    lon: string,
  }
  onRefresh: () => void,
  onRemove: () => void,
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
    coord,
    onRefresh,
    onRemove,
  } = props;

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClickCard = () => {
    navigate(`/weather-application/${id}?lat=${coord.lat}&lon=${coord.lon}`)
  }

  const habdleRemoveCard = (event: MouseEvent<HTMLLIElement>) => {
    onRemove();
    handleClose(event);
  }

  const handleRefreshCard = (event: MouseEvent<HTMLLIElement>) => {
    onRefresh();
    handleClose(event);
  }

  return (
    <Card sx={{
      width: 350,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      mr: 1,
      mb: 1,
    }}
      onClick={handleClickCard}
    >
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
        <MenuItem onClick={handleRefreshCard}>
          <RefreshIcon
            color="action"
            sx={{ mr: 1 }}
          />
          <Typography
            color="text.secondary"
          >
            Оновити дані
          </Typography>
        </MenuItem>
        <MenuItem onClick={habdleRemoveCard}>
          <DeleteIcon
            color="action"
            sx={{ mr: 1 }}
          />
          <Typography
            color="text.secondary"
          >Видалити</Typography>
        </MenuItem>
      </Menu>
    </Card>
  );
}

export default CardCity;