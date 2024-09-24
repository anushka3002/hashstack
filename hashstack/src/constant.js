import AUDFlag from './images/AUDFlag.png'
import USFlag from './images/USFlag.png'
import EURFlag from './images/EURFlag.jpg'
import IndiaFlag from './images/IndiaFlag.png'

export const currencies = [
  {
    country: "United States",
    currency: "USD",
    symbol: "$",
    image: USFlag,
    symbolName: "Dollar",
    exchangeRateToEUR: 0.95,
    exchangeRateToINR: 80.05,
    exchangeRateToAUD: 1.56,
  },
  {
    country: "European Union",
    currency: "EUR",
    symbol: "€",
    image: EURFlag,
    symbolName: "Euro",
    exchangeRateToUSD: 1.05,
    exchangeRateToINR: 87.45,
    exchangeRateToAUD: 1.65,
  },
  {
    country: "India",
    currency: "INR",
    symbol: "₹",
    image: IndiaFlag,
    symbolName: "Rupee",
    exchangeRateToUSD: 0.012,
    exchangeRateToEUR: 0.011,
    exchangeRateToAUD: 0.0188,
  },
  {
    country: "Australia",
    currency: "AUD",
    symbol: "A$",
    image: AUDFlag,
    symbolName: "Dollar",
    exchangeRateToUSD: 0.67,
    exchangeRateToEUR: 0.61,
    exchangeRateToINR: 53.12,
  },
];
