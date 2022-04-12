import { FC } from 'react';
import { useParams } from 'react-router-dom';

const DetailWeatherCity: FC = () => {
  const params = useParams();
  return (
    <div>Detail {params.cityId}</div>
  );
}

export default DetailWeatherCity;