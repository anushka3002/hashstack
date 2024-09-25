import { CURRENCY_DATA, CURRENCY_DATA_FAIL, CURRENCY_DATA_SUCCESS, CURRENCY_DETAIL, CURRENCY_DETAIL_FAIL, CURRENCY_DETAIL_SUCCESS, EXCHANGE_DATA, EXCHANGE_DATA_FAIL, EXCHANGE_DATA_SUCCESS, HISTORIC_EXCHANGE, HISTORIC_EXCHANGE_FAIL, HISTORIC_EXCHANGE_SUCCESS } from "../constant/currencyConstant"

export const currencyReducer = (state = {data:[]},action) =>{
    switch(action.type){
        case CURRENCY_DATA:
            return {
                loading : true,
                data : []
            }
        case CURRENCY_DATA_SUCCESS:
            return{
                loading:false,
                data : action.payload
            }
        case CURRENCY_DATA_FAIL:
            return{
                loading:false,
                data:action.payload
            }
        default:
            return state;
    }
}

export const exchangeReducer = (state = {exchangeData:[]},action) =>{
    switch(action.type){
        case EXCHANGE_DATA:
            return {
                loading : true,
                exchangeData : []
            }
        case EXCHANGE_DATA_SUCCESS:
            return{
                loading:false,
                exchangeData : action.payload
            }
        case EXCHANGE_DATA_FAIL:
            return{
                loading:false,
                exchangeData:action.payload
            }
        default:
            return state;
    }
}

export const historicExchangeReducer = (state = {historicData:[]},action) =>{
    switch(action.type){
        case HISTORIC_EXCHANGE:
            return {
                loading : true,
                historicData : []
            }
        case HISTORIC_EXCHANGE_SUCCESS:
            return{
                loading:false,
                historicData : action.payload
            }
        case HISTORIC_EXCHANGE_FAIL:
            return{
                loading:false,
                historicData:action.payload
            }
        default:
            return state;
    }
}

export const currencyDetailReducer = (state = {currencyDetailData:[]},action) =>{
    switch(action.type){
        case CURRENCY_DETAIL:
            return {
                loading : true,
                currencyDetailData : []
            }
        case CURRENCY_DETAIL_SUCCESS:
            return{
                loading:false,
                currencyDetailData : action.payload
            }
        case CURRENCY_DETAIL_FAIL:
            return{
                loading:false,
                currencyDetailData:action.payload
            }
        default:
            return state;
    }
}