import axios from "axios";
import {
  CURRENCY_DATA,
  CURRENCY_DATA_FAIL,
  CURRENCY_DATA_SUCCESS,
  CURRENCY_DETAIL,
  CURRENCY_DETAIL_FAIL,
  CURRENCY_DETAIL_SUCCESS,
  EXCHANGE_DATA,
  EXCHANGE_DATA_FAIL,
  EXCHANGE_DATA_SUCCESS,
  HISTORIC_EXCHANGE,
  HISTORIC_EXCHANGE_FAIL,
  HISTORIC_EXCHANGE_SUCCESS,
} from "../constant/currencyConstant";

export const currencyAction = () => async (dispatch) => {
  try {
    dispatch({
      type: CURRENCY_DATA,
    });
    const data = await axios.get("https://api.frankfurter.app/latest");
    dispatch({
      type: CURRENCY_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CURRENCY_DATA_FAIL,
      payload: error,
    });
  }
};

export const exchangeAction = (source, target, amount) => async (dispatch) => {
  try {
    dispatch({
      type: EXCHANGE_DATA,
    });
    const data = await axios.get(
      `https://api.frankfurter.app/latest?from=${source}&to=${target}`
    );
    const finalAmount = data?.data?.rates[target] * Number(amount);
    dispatch({
      type: EXCHANGE_DATA_SUCCESS,
      payload: finalAmount,
    });
  } catch (error) {
    dispatch({
      type: EXCHANGE_DATA_FAIL,
      payload: error,
    });
  }
};

export const historicExchangeAction =
  (startDate, endDate, baseCurrency, targetCurrency) => async (dispatch) => {
    try {
      dispatch({
        type: HISTORIC_EXCHANGE,
      });
      
      const data = await axios.get(
        `https://api.frankfurter.app/${startDate}..${endDate}?from=${baseCurrency}&to=${targetCurrency}`
      );
      dispatch({
        type: HISTORIC_EXCHANGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: HISTORIC_EXCHANGE_FAIL,
        payload: error,
      });
    }
  };

  export const currencyDetailAction = () => async (dispatch) => {
    try {
      dispatch({
        type: CURRENCY_DETAIL,
      });
      
      const data = await axios.get(
        `https://restcountries.com/v3.1/all`
      );
      dispatch({
        type: CURRENCY_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CURRENCY_DETAIL_FAIL,
        payload: error,
      });
    }
  };
