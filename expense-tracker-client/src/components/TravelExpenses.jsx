import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth/AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";

export default function Travel() {
  const { logoutSuccess } = useContext(AuthContext);

  // create state to store form data
  const [formData, setFormData] = useState({});

  const [tripName, setTripName] = useState("");
  const [currency, setCurrency] = useState("");
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/travel/displayTrips", {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> get trips res: ", res);
        setTrips(res.data);
      })
      .catch((error) => {
        console.error(">>> get trips error: ", error);
      });
  }, []);

  const handleTripNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleFilterExpenses = (selectedTripName) => {
    setSelectedTrip(selectedTripName);
  };

  const handleFormChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/travel/insertExpense", formData, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> create expense res: ", res);
        window.location.reload();
      })
      .catch((error) => {
        console.error(">>> create expense error: ", error);
      });
  };

  const limitTwoDP = (e) => {
    const t = e.target.value;

    if (t.indexOf(".") >= 0 && t.substr(t.indexOf(".") + 1).length > 2)
      e.target.value =
        t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3);
  };

  const categoryOptions = [
    { value: "f&b", label: "F&B" },
    { value: "transport", label: "Transport" },
    { value: "accommodation", label: "Accommodation" },
    { value: "groceries", label: "Groceries" },
    { value: "shopping", label: "Shopping" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health & Fitness", label: "Health & Fitness" },
    { value: "others", label: "Others" },
  ];

  const currencyOptions = [
    { value: "ADP", label: "ADP" },
    { value: "AED", label: "AED" },
    { value: "AFA", label: "AFA" },
    { value: "ALL", label: "ALL" },
    { value: "AMD", label: "AMD" },
    { value: "ANG", label: "ANG" },
    { value: "AOA", label: "AOA" },
    { value: "ARS", label: "ARS" },
    { value: "ATS", label: "ATS" },
    { value: "AUD", label: "AUD" },
    { value: "AWG", label: "AWG" },
    { value: "AZM", label: "AZM" },
    { value: "BAM", label: "BAM" },
    { value: "BBD", label: "BBD" },
    { value: "BDT", label: "BDT" },
    { value: "BEF", label: "BEF" },
    { value: "BGL", label: "BGL" },
    { value: "BGN", label: "BGN" },
    { value: "BHD", label: "BHD" },
    { value: "BIF", label: "BIF" },
    { value: "BMD", label: "BMD" },
    { value: "BND", label: "BND" },
    { value: "BOB", label: "BOB" },
    { value: "BOV", label: "BOV" },
    { value: "BRL", label: "BRL" },
    { value: "BSD", label: "BSD" },
    { value: "BTN", label: "BTN" },
    { value: "BWP", label: "BWP" },
    { value: "BYB", label: "BYB" },
    { value: "BZD", label: "BZD" },
    { value: "CAD", label: "CAD" },
    { value: "CDF", label: "CDF" },
    { value: "CHF", label: "CHF" },
    { value: "CLF", label: "CLF" },
    { value: "CLP", label: "CLP" },
    { value: "CNH", label: "CNH" },
    { value: "CNY", label: "CNY" },
    { value: "COP", label: "COP" },
    { value: "CRC", label: "CRC" },
    { value: "CUP", label: "CUP" },
    { value: "CVE", label: "CVE" },
    { value: "CYP", label: "CYP" },
    { value: "CZK", label: "CZK" },
    { value: "DEM", label: "DEM" },
    { value: "DJF", label: "DJF" },
    { value: "DKK", label: "DKK" },
    { value: "DOP", label: "DOP" },
    { value: "DZD", label: "DZD" },
    { value: "ECS", label: "ECS" },
    { value: "ECV", label: "ECV" },
    { value: "EEK", label: "EEK" },
    { value: "EGP", label: "EGP" },
    { value: "ERN", label: "ERN" },
    { value: "ESP", label: "ESP" },
    { value: "ETB", label: "ETB" },
    { value: "EUR", label: "EUR" },
    { value: "FIM", label: "FIM" },
    { value: "FJD", label: "FJD" },
    { value: "FKP", label: "FKP" },
    { value: "FRF", label: "FRF" },
    { value: "GBP", label: "GBP" },
    { value: "GEL", label: "GEL" },
    { value: "GHC", label: "GHC" },
    { value: "GIP", label: "GIP" },
    { value: "GMD", label: "GMD" },
    { value: "GNF", label: "GNF" },
    { value: "GRD", label: "GRD" },
    { value: "GTQ", label: "GTQ" },
    { value: "GWP", label: "GWP" },
    { value: "GYD", label: "GYD" },
    { value: "HKD", label: "HKD" },
    { value: "HNL", label: "HNL" },
    { value: "HRK", label: "HRK" },
    { value: "HTG", label: "HTG" },
    { value: "HUF", label: "HUF" },
    { value: "IDE", label: "IDE" },
    { value: "IDR", label: "IDR" },
    { value: "IEP", label: "IEP" },
    { value: "ILS", label: "ILS" },
    { value: "INR", label: "INR" },
    { value: "IQD", label: "IQD" },
    { value: "IRR", label: "IRR" },
    { value: "ISK", label: "ISK" },
    { value: "ITL", label: "ITL" },
    { value: "JMD", label: "JMD" },
    { value: "JOD", label: "JOD" },
    { value: "JPY", label: "JPY" },
    { value: "KES", label: "KES" },
    { value: "KGS", label: "KGS" },
    { value: "KHR", label: "KHR" },
    { value: "KMF", label: "KMF" },
    { value: "KPW", label: "KPW" },
    { value: "KRW", label: "KRW" },
    { value: "KWD", label: "KWD" },
    { value: "KYD", label: "KYD" },
    { value: "KZT", label: "KZT" },
    { value: "LAK", label: "LAK" },
    { value: "LBP", label: "LBP" },
    { value: "LKR", label: "LKR" },
    { value: "LRD", label: "LRD" },
    { value: "LSL", label: "LSL" },
    { value: "LTL", label: "LTL" },
    { value: "LUF", label: "LUF" },
    { value: "LVL", label: "LVL" },
    { value: "LYD", label: "LYD" },
    { value: "MAD", label: "MAD" },
    { value: "MDL", label: "MDL" },
    { value: "MGF", label: "MGF" },
    { value: "MKD", label: "MKD" },
    { value: "MMK", label: "MMK" },
    { value: "MNT", label: "MNT" },
    { value: "MOP", label: "MOP" },
    { value: "MRO", label: "MRO" },
    { value: "MTL", label: "MTL" },
    { value: "MUR", label: "MUR" },
    { value: "MVR", label: "MVR" },
    { value: "MWK", label: "MWK" },
    { value: "MXN", label: "MXN" },
    { value: "MXV", label: "MXV" },
    { value: "MYR", label: "MYR" },
    { value: "MZM", label: "MZM" },
    { value: "NAD", label: "NAD" },
    { value: "NGN", label: "NGN" },
    { value: "NIO", label: "NIO" },
    { value: "NLG", label: "NLG" },
    { value: "NOK", label: "NOK" },
    { value: "NPR", label: "NPR" },
    { value: "NZD", label: "NZD" },
    { value: "OMR", label: "OMR" },
    { value: "PAB", label: "PAB" },
    { value: "PEN", label: "PEN" },
    { value: "PGK", label: "PGK" },
    { value: "PHP", label: "PHP" },
    { value: "PKR", label: "PKR" },
    { value: "PLN", label: "PLN" },
    { value: "PTE", label: "PTE" },
    { value: "PYG", label: "PYG" },
    { value: "QAR", label: "QAR" },
    { value: "RMB", label: "RMB" },
    { value: "RON", label: "RON" },
    { value: "RUB", label: "RUB" },
    { value: "RUR", label: "RUR" },
    { value: "RWF", label: "RWF" },
    { value: "RYR", label: "RYR" },
    { value: "SAR", label: "SAR" },
    { value: "SBD", label: "SBD" },
    { value: "SCR", label: "SCR" },
    { value: "SDP", label: "SDP" },
    { value: "SEK", label: "SEK" },
    { value: "SGD", label: "SGD" },
    { value: "SHP", label: "SHP" },
    { value: "SIT", label: "SIT" },
    { value: "SKK", label: "SKK" },
    { value: "SLL", label: "SLL" },
    { value: "SOS", label: "SOS" },
    { value: "SRG", label: "SRG" },
    { value: "STD", label: "STD" },
    { value: "SVC", label: "SVC" },
    { value: "SYP", label: "SYP" },
    { value: "SZL", label: "SZL" },
    { value: "THB", label: "THB" },
    { value: "TJR", label: "TJR" },
    { value: "TMM", label: "TMM" },
    { value: "TND", label: "TND" },
    { value: "TOP", label: "TOP" },
    { value: "TPE", label: "TPE" },
    { value: "TRL", label: "TRL" },
    { value: "TRY", label: "TRY" },
    { value: "TTD", label: "TTD" },
    { value: "TWD", label: "TWD" },
    { value: "TZS", label: "TZS" },
    { value: "UAH", label: "UAH" },
    { value: "UGX", label: "UGX" },
    { value: "USD", label: "USD" },
    { value: "USN", label: "USN" },
    { value: "USS", label: "USS" },
    { value: "UYU", label: "UYU" },
    { value: "UZS", label: "UZS" },
    { value: "VEB", label: "VEB" },
    { value: "VND", label: "VND" },
    { value: "VUV", label: "VUV" },
    { value: "WST", label: "WST" },
    { value: "XAF", label: "XAF" },
    { value: "XAG", label: "XAG" },
    { value: "XAU", label: "XAU" },
    { value: "XCD", label: "XCD" },
    { value: "XDR", label: "XDR" },
    { value: "XEU", label: "XEU" },
    { value: "XOF", label: "XOF" },
    { value: "XPD", label: "XPD" },
    { value: "XPF", label: "XPF" },
    { value: "XPT", label: "XPT" },
    { value: "YER", label: "YER" },
    { value: "YUN", label: "YUN" },
    { value: "ZAR", label: "ZAR" },
    { value: "ZMK", label: "ZMK" },
    { value: "ZRN", label: "ZRN" },
    { value: "ZWD", label: "ZWD" },
  ];

  // Get user current monthly expenses
  const [expenseNames, setExpenseNames] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/travel/displayAll", {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> get expense res: ", res);
        setExpenseNames(res.data);
      })
      .catch((error) => {
        console.error(">>> get expense error: ", error);
      });
  }, []);

  console.info(expenseNames);

  return (
    <div>
      <h2>Travel Expense Tracker</h2>
      <button onClick={logoutSuccess}>Logout</button>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            onChange={(e) => {
              handleFormChange(e, "date");
            }}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="type"
            id="name"
            name="name"
            required
            onChange={(e) => {
              handleFormChange(e, "name");
            }}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            required
            onChange={(e) => {
              handleFormChange(e, "category");
            }}
          >
            {/* TODO: selected throws warning, surpress? */}
            <option value="placeholder" disabled={true} selected>
              Select...
            </option>
            {categoryOptions.map(function (cat, i) {
              return (
                <option value={cat.value} key={i}>
                  {cat.label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            required
            onInput={(e) => {
              limitTwoDP(e);
            }}
            onChange={(e) => {
              handleFormChange(e, "amount");
            }}
          />
        </div>
        <div>
          <label htmlFor="ccy">Currency:</label>
          <select
            name="ccy"
            id="ccy"
            required
            onChange={(e) => {
              handleFormChange(e, "ccy");
            }}
          >
            {/* TODO: selected throws warning, surpress? */}
            <option value="placeholder" disabled={true} selected>
              Select...
            </option>
            {currencyOptions.map(function (ccy, i) {
              return (
                <option value={ccy.value} key={i}>
                  {ccy.label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="fx">Exchange Rate:</label>
          <input
            type="number"
            id="fx"
            name="fx"
            step="0.01"
            required
            onInput={(e) => {
              limitTwoDP(e);
            }}
            onChange={(e) => {
              handleFormChange(e, "fx");
            }}
          />
        </div>
        <div>
          <label htmlFor="trip">Trip:</label>
          <input
            type="type"
            id="trip"
            name="trip"
            required
            onChange={(e) => {
              handleFormChange(e, "trip");
            }}
          />
        </div>
        <div>
          <button type="submit">Add Expense</button>
        </div>
      </form>

      <div>
        <h2>Filter Trip:</h2>
        <select
          name="filter"
          id="filter"
          onChange={(e) => handleFilterExpenses(e.target.value)}
        >
          <option value="">Select Trip</option>
          {trips.map((trip) => (
            <option value={trip} key={trip}>
              {trip}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>Travel Expenses:</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenseNames ? (
              expenseNames
                .filter((exp) => exp.trip === selectedTrip) // Filter expenses based on the selected trip
                .map(function (exp, i) {
                  return (
                    <tr key={i}>
                      <td>{exp.date.substring(0, 10)}</td>
                      <td>{exp.name}</td>
                      <td>{exp.category}</td>
                      <td>{exp.amount}</td>
                      <td>
                        <button>Edit</button>
                      </td>
                      <td>
                        <button>Delete</button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
