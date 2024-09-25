import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { currencyReducer, exchangeReducer, historicExchangeReducer } from './reducer/currencyReducer';

const reducer = combineReducers({
  currencyData: currencyReducer,
  exchangeData: exchangeReducer,
  historicData: historicExchangeReducer
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
