import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { currencyReducer, exchangeReducer, historicExchangeReducer } from './reducer/currencyReducer';

const reducer = combineReducers({
  currencyData: currencyReducer,
  exchangeData: exchangeReducer,
  historicData: historicExchangeReducer
});

let initialState = {};
const middleware = [thunk];

// Create store with middleware and Redux DevTools
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
