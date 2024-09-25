import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { historicExchangeAction } from "../action/currencyAction";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formattedDate, formatDate } from "../constant";
import "./DatePicker.css";
import ErrorModal from "./ErrorModal";
import { useDisclosure } from "@chakra-ui/react";

const HistoricData = ({ sourceValue, targetValue }) => {
  const { historicData } = useSelector((state) => state.historicData);
  const dispatch = useDispatch();
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [chartView, setChartView] = useState(true);
  const [selectedTime, setSelectedTime] = useState("1Y");
  const [errorValue, setErrorValue] = useState("empty");
  const timeRange = ["1W", "1M", "1Y", "2Y", "5Y", "10Y"];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [options, setOptions] = useState({
    chart: {
      type: "line",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy",
      },
    },
    dataLabels: {
      enabled: false,
    },
    rangeSelector: {
      selected: 1,
    },
    colors: ["#6A83DF"],
    series: [
      {
        name: "Exchange Rate",
        data: historicData?.data
          ? Object.entries(historicData?.data?.rates).map(([date, rateObj]) => {
              const currency = Object.keys(rateObj)[0];
              return {
                x: date,
                y: rateObj[currency],
              };
            })
          : [],
      },
    ],
  });

  const handleTimeRange = (e) => {
    setSelectedTime(e);
    const today = new Date();
    const changedTime = new Date(today);
    const endDate = formatDate(today);
    if (e == "1W") {
      changedTime.setDate(today.getDate() - 7);
    } else if (e == "1M") {
      changedTime.setDate(today.getDate() - 30);
    } else if (e == "1Y") {
      changedTime.setDate(today.getDate() - 365);
    } else if (e == "2Y") {
      changedTime.setDate(today.getDate() - 365 * 2);
    } else if (e == "5Y") {
      changedTime.setDate(today.getDate() - 365 * 5);
    } else if (e == "10Y") {
      changedTime.setDate(today.getDate() - 3650);
    }
    const startDate = formatDate(changedTime);
    dispatch(
      historicExchangeAction(startDate, endDate, sourceValue, targetValue)
    );
  };

  const handleTimeInput = () => {
    const start = formatDate(startValue);
    const end = formatDate(endValue);
    if (new Date(start) > new Date(end)) {
      setErrorValue("greater");
      onOpen();
    } else if (startValue == "" || endValue == "") {
      setErrorValue("empty");
      onOpen();
    } else {
      setSelectedTime("");
      dispatch(historicExchangeAction(start, end, sourceValue, targetValue));
    }
  };

  useEffect(() => {
    setOptions({
      ...options,
      series: [
        {
          name: "Exchange Rate",
          data: historicData?.data
            ? Object.entries(historicData?.data?.rates).map(
                ([date, rateObj]) => {
                  const currency = Object.keys(rateObj)[0];
                  return {
                    x: date,
                    y: rateObj[currency],
                  };
                }
              )
            : [],
        },
      ],
    });
  }, [dispatch, historicData]);

  return (
    <div>
      <ErrorModal errorValue={errorValue} isOpen={isOpen} onClose={onClose} />
      <div className={`${chartView ? '' : 'sticky top-0 bg-white'}`}>
        <div className="border-y-[0.1px] bg-white border-slate-200 flex flex-wrap justify-between mb-5">
          <div className="flex flex-wrap justify-center my-9">
            {timeRange.map((e) => {
              return (
                <div
                  onClick={() => handleTimeRange(e)}
                  className={`my-auto py-1 ${
                    selectedTime == e ? " purple-200-bg text-white" : ""
                  } cursor-pointer duration-300 font-medium mx-1 px-3 text-sm rounded-[20px]`}
                >
                  {e}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap my-auto py-5">
            <div className="flex">
            <div className="mr-3">
              <p className="gray-200 text-sm poppins-regular mb-1">
                Start Date
              </p>
              <ReactDatePicker
                className="z-20 border p-2 rounded-md text-sm poppins-regular"
                selected={startValue}
                onChange={(date) => setStartValue(date)}
                placeholderText="DD/MM/YY"
              />
            </div>
            <div className="mr-3">
              <p className="gray-200 text-sm poppins-regular mb-1">End Date</p>
              <ReactDatePicker
                className="z-20 border p-2 rounded-md text-sm poppins-regular"
                selected={endValue}
                onChange={(date) => setEndValue(date)}
                placeholderText="DD/MM/YY"
                popperClassName="datepicker-popper"
              />
            </div>
            </div>
            <div
              onClick={() => {
                startValue && endValue
                  ? handleTimeInput()
                  : setErrorValue("empty");
                onOpen();
              }}
              className="border mx-auto rounded-md border-[#4336C4] mt-6 px-3 cursor-pointer duration-300 hover:text-white hover:bg-[#4336C4] text-[#4336C4]"
            >
              <p className="my-1">Apply</p>
            </div>
          </div>
        </div>
        <div className="flex bg-white justify-between pt-4 pb-6 mb-4">
          <div className="poppins-semibold gray-700 text-2xl">
            {sourceValue} to {targetValue} {chartView ? "Chart" : "Table"}
          </div>
          <div
            onClick={() => setChartView(!chartView)}
            className="border rounded-md border-[#4336C4] my-auto px-3 cursor-pointer duration-300 hover:text-white hover:bg-[#4336C4] text-[#4336C4]"
          >
            <p className="my-auto py-2 poppins-regular text-sm leading-none">
              View {chartView ? "table" : "chart"}
            </p>
          </div>
        </div>
      </div>
      <div id="chart">
        {chartView ? (
          <Chart
            options={options}
            series={options.series}
            type="line"
            height="350"
          />
        ) : (
          <table className="border w-full">
            <thead>
              <tr className="poppins-regular">
                <th className="py-2 border-slate-300">Time range</th>
                <th className="py-2 border-slate-300">Currency rates</th>
              </tr>
            </thead>
            <tbody>
              {historicData?.data &&
                Object.entries(historicData?.data?.rates).map(
                  ([key, value]) => (
                    <tr key={key} className="text-center text-[14px]">
                      <td className="py-3 gray-700 border poppins-regular">
                        {formattedDate(key)}
                      </td>
                      <td className="py-2 gray-700 border poppins-regular">
                        {Object.values(value)}
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HistoricData;
