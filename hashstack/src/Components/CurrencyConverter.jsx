import bg from "../images/bg.png";
import exchange from "../images/svg/exchange.svg";
import dropdownup from "../images/svg/dropdownup.svg";
import dropdown from "../images/svg/dropdown.svg";
import { useState } from "react";
import { currencies } from "../constant";

const CurrencyConverter = () => {
  const [sourceValue, setSourceValue] = useState("USD");
  const [targetValue, setTargetValue] = useState("INR");
  const [currencyDropdown, setCurrencyDropdown] = useState("");

  return (
    <div onClick={(e)=>{e.stopPropagation();setCurrencyDropdown('')}} className="flex w-full h-full relative">
      <div className="w-full h-[400px] relative">
        <div
          className="w-full h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/premium-photo/abstract-108-background-wallpaper-gradient_792836-190218.jpg)",
          }}
        >
          <div className="flex">
            <div className="w-full">
              <p className="text-3xl poppins-bold text-white pt-20 font-bold text-center">
                Seamless Currency Conversion
              </p>
              <p className="text-lg text-center poppins-regular text-white pt-3">
                Convert currencies effortlessly in real-time with the most
                accurate rates, tailored for your financial needs.
              </p>
            </div>
          </div>
          <div className="mt-20 mx-auto bg-white rounded-lg shadow-lg w-[80%] py-20 px-10">
            <form>
              <div className="flex flex-wrap w-full justify-between">
                <div className="w-[320px]">
                  <p className="poppins-medium">Amount</p>
                  <div className="w-[100%] flex border rounded-md shadow-sm mt-1">
                    <p className="my-auto ml-2">$</p>
                    <input className="w-[89%] pr-1 py-3" name="amount" />
                  </div>
                </div>
                <div className="w-[320px] relative">
                  <p className="poppins-medium">Source currency</p>
                  <div
                    onClick={(e) =>{e.stopPropagation();
                      currencyDropdown === "source"
                        ? setCurrencyDropdown("")
                        : setCurrencyDropdown("source")
                    }}
                    className="w-[100%] flex border rounded-md shadow-sm mt-1"
                  >
                    <input
                      value={sourceValue}
                      className="w-[89%] ml-1 px-1 py-3 focus:outline-none"
                      name="source"
                    />
                    <img width="24px" className="mr-2" src={dropdown} />
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out transform ${
                      currencyDropdown === "source"
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0"
                    } origin-top`}
                  >
                    <div className="shadow-md rounded-md mt-1 absolute w-full bg-white">
                      {currencies.map((e) => {
                        return (
                          <div
                            key={e.currency}
                            className="flex pl-2 py-2 cursor-pointer hover:bg-[#F7F6FE]"
                          >
                            <img
                              className="my-auto"
                              width="20px"
                              src={e.image}
                              alt={e.country}
                            />
                            <p className="text-sm my-auto ml-2">
                              {e.currency} -
                            </p>
                            <p className="text-xs my-auto ml-1">{e.country}</p>
                            <p className="text-xs my-auto ml-1">
                              ({e.symbolName})
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="border cursor-pointer mt-7 px-4 rounded-full items-center justify-center flex">
                  <img width={"16px"} src={exchange} />
                </div>
                <div className="w-[320px] relative">
                  <p className="poppins-medium">Target currency</p>
                  <div
                    onClick={(e) =>{e.stopPropagation();
                      currencyDropdown === "target"
                        ? setCurrencyDropdown("")
                        : setCurrencyDropdown("target")
                    }}
                    className="w-[100%] flex border rounded-md shadow-sm mt-1"
                  >
                    <input
                      value={targetValue}
                      className="w-[89%] ml-1 px-1 py-3 focus:outline-none"
                      name="target"
                    />
                    <img width="24px" className="mr-2" src={dropdown} />
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out transform ${
                      currencyDropdown === "target"
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0"
                    } origin-top`}
                  >
                    <div className="shadow-md rounded-md mt-1 absolute w-full bg-white">
                      {currencies.map((e) => {
                        return (
                          <div
                            key={e.currency}
                            className="flex pl-2 py-2 cursor-pointer hover:bg-[#F7F6FE]"
                          >
                            <img
                              className="my-auto"
                              width="20px"
                              src={e.image}
                              alt={e.country}
                            />
                            <p className="text-sm my-auto ml-2">
                              {e.currency} -
                            </p>
                            <p className="text-xs my-auto ml-1">{e.country}</p>
                            <p className="text-xs my-auto ml-1">
                              ({e.symbolName})
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between mt-6">
                <p>1000</p>
              </div>
              <div className="w-full flex justify-between mt-6">
                <div className="p-2 rounded-md purple-100-bg flex">
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
                    clicking convert.
                  </p>
                </div>
                <button className="bg-[#4336C4] text-white text-md poppins-medium px-6 py-3 rounded-md">
                  Convert
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
