import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import store from "./core/redux/store";
import Container from "@mui/material/Container";
import ListWeatherCities from './components/ListWeatherCities';
import DetailWeatherCity from './components/DetailWeatherCity';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Router>
          <Routes>
            <Route path="weather-application" element={<ListWeatherCities />} />
            <Route path="weather-application/:cityId" element={<DetailWeatherCity />} />
          </Routes>
        </Router>
      </Container>
    </Provider >
  );
}

export default App;
