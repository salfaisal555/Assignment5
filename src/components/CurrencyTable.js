import React, { useState, useEffect } from "react";

const CurrencyTable = () => {
  const [rates, setRates] = useState([]);
  const apiKey = process.env.REACT_APP_CURRENCY_API_KEY;

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.currencyfreaks.com/latest?apikey=86a255d5a80e474bbb9eca59aa9336ac`
        );
        const data = await response.json();
        const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];
        const filteredRates = currencies.map((currency) => {
          const exchangeRate = parseFloat(data.rates[currency]);
          return {
            currency,
            exchangeRate,
            weBuy: (exchangeRate * 1.05).toFixed(4),
            weSell: (exchangeRate * 0.95).toFixed(4),
          };
        });
        setRates(filteredRates);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, [apiKey]);

  return (
    <div className="container mt-5">
      <div className="text-center bg-warning text-white py-4 rounded">
        <h1>Currency Exchange Rates</h1>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-hover table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.currency}>
                <td>{rate.currency}</td>
                <td>{rate.weBuy}</td>
                <td>{rate.exchangeRate.toFixed(4)}</td>
                <td>{rate.weSell}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3">
          Rates are based on 1 USD. This application uses API from
          https://currencyfreaks.com
        </p>
      </div>
    </div>
  );
};

export default CurrencyTable;
