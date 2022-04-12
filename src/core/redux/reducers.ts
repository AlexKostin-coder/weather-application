import { combineReducers } from "redux";
import * as Weather from '../weather/weather.reducers';
import * as Progress from '../progress/progress.redusers';

const rootReducer = combineReducers({
  ...Weather,
  ...Progress,
});

export default rootReducer;