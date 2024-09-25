import bg from "../images/bg-image.avif";
import usd from "../images/USFlag.png";
import ind from "../images/IndiaFlag.png";
import exchange from "../images/svg/exchange.svg";
import dropdownup from "../images/svg/dropdownup.svg";
import dropdown from "../images/svg/dropdown.svg";
import xCircle from "../images/svg/x-circle.svg";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector} from  "react-redux"
import { currencyAction, currencyDetailAction, exchangeAction, historicExchangeAction } from "../action/currencyAction";
import HistoricData from "./HistoricData";
import { formatDate } from "../constant";

const CurrencyConverter = () => {
  const {exchangeData}  = useSelector(state => state.exchangeData)
  const {currencyDetailData}  = useSelector(state => state.currencyDetailData)
  const [sourceSymbol, setSourceSymbol] = useState('$')
  const [targetSymbol, setTargetSymbol] = useState('₹')
 const [sourceName,setSourceName] =useState('United States Dollar')
 const [sourceImage,setSourceImage] =useState('usd')
 const [targetName,setTargetName] =useState('Indian Rupee')
 const [targetImage,setTargetImage] =useState('ind')
 
  const [sourceValue, setSourceValue] = useState('USD');
  const [targetValue, setTargetValue] = useState('INR');
  const [currencyDropdown, setCurrencyDropdown] = useState("");
  const [convertFlag, setConvertFlag] = useState(false);
  const [currencyError, setCurrencyError] = useState('')
  const [convertedValue, setConvertedValue] = useState(0);
  const [trackExchange, setTrackExchange] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  var exchangeRatesApi = require("exchange-rates-api")
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    dispatch(currencyAction())
    dispatch(currencyDetailAction())
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  },[])

  const today = new Date();
    const changedTime = new Date(today);
    const endDate = formatDate(today);
    changedTime.setDate(today.getDate() - 365);
    const startDate = formatDate(changedTime);

  const onSubmit = (data) => {
    if(sourceValue == targetValue){
      setCurrencyError('Please select different target currency')
    }else{
      setCurrencyError('')
      const amountValue = data.amount;
      setConvertFlag(true);
      dispatch(exchangeAction(sourceValue, targetValue, amountValue))
    }
  };

  useEffect(()=>{
    setConvertedValue(exchangeData)
  },[exchangeData])

  useEffect(() => {
    const updateValue = () => {
      setConvertedValue((prevValue) => {
        let valueToUse = prevValue === 0 ? 0.01 : prevValue;
        const changeFactor = 1 + (Math.random() < 0.5 ? -0.03 : 0.03);
        let newValue = valueToUse * changeFactor;
        return Math.max(0.01, Math.round(newValue * 100) / 100);
      });
    };
    const intervalId = setInterval(updateValue, 1000);
    return () => clearInterval(intervalId);
  }, [exchangeData]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setCurrencyDropdown("");
      }}
      className="flex w-full h-full"
    >
      <div className="w-full h-[400px]">
        <div
          className="w-full h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              `url(${bg})`,
          }}
        >
          <div className="flex">
            <div className="w-full px-4">
              <p className="poppins-regular text-white mt-4 text-center md:text-left">Currency.ex | Hashstack</p>
              <p className={`text-3xl transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-30'} poppins-bold text-white pt-10 md:pt-20 font-bold text-center`}>
                Seamless Currency Conversion
              </p>
              <p className={`text-lg text-center transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-30'} poppins-regular text-white pt-3`}>
                Convert currencies effortlessly in real-time with the most
                accurate rates, tailored for your financial needs.
              </p>
            </div>
          </div>
          <div className="mt-20 mx-auto bg-white rounded-lg shadow-lg w-[100%] md:w-[80%] pt-5 pb-20 px-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap w-full justify-between">
                <div className="w-[320px] pt-5">
                  <p className="poppins-medium">Amount</p>
                  <div className="w-[100%] flex border rounded-md shadow-sm mt-1">
                    <p className="my-auto ml-2">{sourceSymbol}</p>
                    <input
                      {...register("amount", {
                        pattern: {
                          value: /^[0-9]*\.?[0-9]*$/,
                          message: "Please enter a valid amount",
                        },
                      })}
                      className="w-[89%] bg-white ml-[1px] py-3 focus:outline-none"
                      name="amount"
                    />
                    {watch('amount') &&
                      <img
                        onClick={() => setValue("amount", "")}
                        className="mr-2 cursor-pointer"
                        src={xCircle}
                      />
                    }
                  </div>
                  {errors.amount && (
                    <p className="red-100 text-xs mt-1">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                {/* source currency */}
                <div className="w-[320px] relative pt-5">
                  <p className="poppins-medium">Source currency</p>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      currencyDropdown === "source"
                        ? setCurrencyDropdown("")
                        : setCurrencyDropdown("source");
                    }}
                    className="w-[100%] flex border rounded-md shadow-sm mt-1"
                  >
                    <div className="my-auto ml-2"><img width={'20px'} className="my-auto" height={'20px'} src={sourceImage == 'usd' ? usd : sourceImage == 'ind' ? ind : sourceImage}/></div>
                    <input
                      value={
                        sourceValue + ' ' + sourceName + ' ' + '(' + sourceSymbol + ')'
                      }
                      readOnly={true}
                      className="w-[89%] ml-1 py-3 focus:outline-none"
                      name="source"
                    />
                    <img width="24px" className="mr-2" src={currencyDropdown === "source" ? dropdownup : dropdown} />
                  </div>
                  {currencyDropdown === "source" && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="shadow-md z-20 rounded-md mt-1 absolute w-full bg-white max-h-[250px] overflow-y-scroll"
                      >
                        {Object.keys(exchangeRatesApi.currencies).map((e)=>{
                          const matchedCurrencyDetail =currencyDetailData?.data && currencyDetailData?.data.find(
                            (item) => item.currencies && item.currencies[e]
                          );                          
                        return(e != 'HRK' && <div onClick={() => {
                          setValue("source", e);
                          setSourceSymbol(matchedCurrencyDetail?.currencies[e].symbol)
                          setSourceValue(e);
                          setTrackExchange(false);
                          setSourceName(matchedCurrencyDetail?.currencies[e].name);
                          setSourceImage(matchedCurrencyDetail?.flags?.png)
                          setCurrencyDropdown("");
                          e == targetValue ? setCurrencyError('Please select different target currency') : setCurrencyError('')
                        }} className="hover:bg-[#F7F6FE] text-sm my-auto pl-2 py-2 cursor-pointer flex">
                        <div className="h-[10px] mt-1"><img width={'20px'} className="my-auto" src={matchedCurrencyDetail?.flags?.png}/></div>
                        <p className="mx-2 my-auto">{e}</p>
                              {currencyDetailData?.data && <p className="mr-2">{matchedCurrencyDetail?.currencies[e].name}</p>}
                              {currencyDetailData?.data && <p>({matchedCurrencyDetail?.currencies[e].symbol})</p>}
                        </div>)})}
                      </div>
                  )}
                </div>

                {/* exchange values */}
                <div
                  onClick={() => {
                    setConvertFlag(false);
                    setTrackExchange(false);
                    setTargetValue(sourceValue);
                    setSourceValue(targetValue);
                    setSourceSymbol(targetSymbol);
                    setTargetSymbol(sourceSymbol);
                    setTargetImage(sourceImage);
                    setSourceImage(targetImage);
                    setSourceName(targetName);
                    setTargetName(sourceName)
                  }}
                  className={`mx-auto md:mx-0 cursor-pointer mt-7 ${
                    errors.amount || currencyError ? "mb-5" : ""
                  } px-4 rounded-full items-center justify-center flex`}
                >
                  <img width={"16px"} src={exchange} />
                </div>

                  {/* target currency */}
                <div className="w-[320px] relative pt-5">
                  <p className="poppins-medium">Target currency</p>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      currencyDropdown === "target"
                        ? setCurrencyDropdown("")
                        : setCurrencyDropdown("target");
                    }}
                    style={{zIndex:0}}
                    className="w-[100%] z-10 flex border rounded-md shadow-sm mt-1"
                  >
                    <div className="my-auto ml-2"><img width={'20px'} className="my-auto" height={'20px'} src={targetImage == 'ind' ? ind : targetImage == 'usd' ? usd : targetImage}/></div>
                    <input
                      readOnly={true}
                      value={
                        targetValue + ' ' + targetName + ' ' + '(' + targetSymbol + ')'
                      }
                      className="w-[89%] bg-white ml-1 px-1 py-3 focus:outline-none"
                      name="target"
                    />
                    <img width="24px" className="mr-2" src={currencyDropdown === "target" ? dropdownup : dropdown} />
                  </div>
                  {currencyError && (
                    <p className="red-100 text-xs mt-1">
                      {currencyError}
                    </p>
                  )}

                  {currencyDropdown === "target" && (
                      <div
                      onClick={(e) => e.stopPropagation()}
                      className="shadow-md z-20 rounded-md mt-1 absolute w-full bg-white max-h-[250px] overflow-y-scroll"
                    >
                      {Object.keys(exchangeRatesApi.currencies).map((e)=>{
                        const matchedCurrencyDetail =currencyDetailData?.data && currencyDetailData?.data.find(
                          (item) => item.currencies && item.currencies[e]
                        );                          
                      return(e != 'HRK' && <div onClick={() => {
                        setValue("target", e);
                        setTargetValue(e);
                        setTargetName(matchedCurrencyDetail?.currencies[e].name);
                        setTargetImage(matchedCurrencyDetail?.flags?.png)
                        setTargetSymbol(matchedCurrencyDetail?.currencies[e].symbol)
                        setTrackExchange(false);
                        setCurrencyDropdown("");
                        e == targetValue ? setCurrencyError('Please select different target currency') : setCurrencyError('')
                      }} className="hover:bg-[#F7F6FE] text-sm my-auto pl-2 py-2 cursor-pointer flex">
                      <div className="h-[10px] mt-1"><img width={'20px'} className="my-auto" src={matchedCurrencyDetail?.flags?.png}/></div>
                      <p className="mx-2 my-auto">{e}</p>
                            {currencyDetailData?.data && <p className="mr-2">{matchedCurrencyDetail?.currencies[e].name}</p>}
                            {currencyDetailData?.data && <p>({matchedCurrencyDetail?.currencies[e].symbol})</p>}
                      </div>)})}
                    </div>
                  )}
                </div>
              </div>

              {/* show final value */}
              {convertFlag && (
                <div className="w-full mt-6">
                  <p className="text-3xl gray-700 mt-1 poppins-semibold">
                    {targetSymbol} {convertedValue ?? 0}
                  </p>
                </div>
              )}

              <div className="w-full flex flex-wrap justify-between">
                <div className="p-2 rounded-md purple-100-bg flex mt-6">
                  <div className="my-auto mr-2">
                    <img
                      width={"16px"}
                      height={"16px"}
                      src="https://cdn.icon-icons.com/icons2/67/PNG/512/info_13213.png"
                    />
                  </div>
                  <p className="text-xs gray-200">
                    Stay ahead of the market by analyzing historical exchange
                    rate trends.
                    <br />
                    Make informed decisions by viewing past performance after
                    proceeding with convert.
                  </p>
                </div>
                <div className="flex mt-6">
                {convertFlag && <div
                onClick={()=>{setTrackExchange(true); dispatch(historicExchangeAction(startDate,endDate,sourceValue,targetValue))}}
                  className={`blue-300
                  duration-300 mr-5 text-white text-md cursor-pointer leading-none poppins-medium px-6 pt-4 pb-3 rounded-md`}
                >
                  Track Exchange
                </div>}
                <button
                  disabled={watch("amount") == "" ? true : false}
                  className={`${
                    watch("amount") == "" ? "bg-[#B2C2FE]" : "blue-300"
                  } duration-300 text-white text-md poppins-medium px-6 py-3 rounded-md`}
                >
                  Convert
                </button>
                </div>
              </div>
            </form>
            <div className="mt-6 z-10">
            {trackExchange && <HistoricData sourceValue={sourceValue} targetValue={targetValue}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
