import {
  createStore,
  applyMiddleware
} from "redux";

import { rootReducer } from "./reducers";

import api from '../api';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const store = createStore(rootReducer, composeWithDevTools({})(applyMiddleware(thunk.withExtraArgument(api))));

export default store;