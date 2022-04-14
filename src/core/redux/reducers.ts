import { combineReducers } from "redux";
import * as Weather from '../weather/weather.reducers';
import * as Progress from '../progress/progress.redusers';

export const rootReducer = combineReducers({
  ...Weather,
  ...Progress,
});

export type RootState = ReturnType<typeof rootReducer>;