import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import axios from "axios";
import Cookies from "js-cookie";

function TravelForm({ tripName, setTripName }) {
  const { setFilteredTrips } = useGlobalContext();

  const [tripType, setTripType] = useState("");

  const [trips, setTrips] = useState([]);
  const [currency, setCurrency] = useState("");
  const [baseCCY, setBaseCCY] = useState("");
  const [fx, setFX] = useState("");
  const [selectedTrip, setSelectedTrip] = useState("");
  const [expenses, setExpenses] = useState([]);

  const [formData, setFormData] = useState({
    date: "",
    name: "",
    category: "",
    amount: null,
    ccy: "",
    baseCCY: "",
    fx: null,
    trip: "",
  });

  // Refresh to get Currency, Base CCY and FX rate when trip is changed by user
  useEffect(() => {
    // Make sure there is a selected trip
    console.log("getting trip ", tripName);
    if (tripName) {
      axios
        .get(
          `https://expense-tracker-bzs3.onrender.com/api/travel/displayTrip/${selectedTrip}/currencies`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("userAuthToken")}`,
            },
          }
        )
        .then((res) => {
          console.info(">>> get currencies res: ", res);
          setCurrency(res.data.ccy);
          setBaseCCY(res.data.baseCCY);
          setFX(res.data.fx);
        })
        .catch((error) => {
          console.error(">>> get currencies error: ", error);
        });
    }
  }, [tripName]);

  // To get trips every time it refreshes
  useEffect(() => {
    axios
      .get(
        "https://expense-tracker-bzs3.onrender.com/api/travel/displayTrips",
        {
          headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
        }
      )
      .then((res) => {
        console.info(">>> get trips res: ", res);
        setTrips(res.data);
      })
      .catch((error) => {
        console.error(">>> get trips error: ", error);
      });
  }, []);

  //change the Travel Expenses section whenever user filters a trip
  useEffect(() => {
    axios
      .get("https://expense-tracker-bzs3.onrender.com/api/travel/displayAll", {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> get expense res: ", res);

        // Filter expenses based on the selected trip
        const filteredExpenses = selectedTrip
          ? res.data.filter((expense) => expense.trip === selectedTrip)
          : res.data;

        setExpenses(filteredExpenses);
      })
      .catch((error) => {
        console.error(">>> get expense error: ", error);
      });
  }, [selectedTrip]);

  const handleFormChange = (e, fieldName) => {
    console.log("getting field name", fieldName);
    if (tripType === "existing") {
      setFormData({
        ...formData,
        [fieldName]: e.target.value,
        baseCCY: baseCCY,
        ccy: currency,
        trip: tripName,
        fx: fx,
      });
    } else {
      setFormData({
        ...formData,
        [fieldName]: e.target.value,
      });
      setFilteredTrips([]);
    }
  };

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
    if (e.target.value === "new") setTripName("");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await addTravelExpense(formData);
  //     setFormData({
  //       date: "",
  //       name: "",
  //       category: "",
  //       amount: null,
  //       ccy: "",
  //       baseCCY: "",
  //       fx: null,
  //       trip: "",
  //     });
  //     console.log("submitting travel");
  //   } catch (error) {
  //     console.info(">>> error adding travel: ", error);
  //     window.alert("An error, please try again.");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://expense-tracker-bzs3.onrender.com/api/travel/insertExpense",
        formData,
        {
          headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
        }
      )
      .then((res) => {
        console.info(">>> create expense res: ", res);

        // Fetch the updated list of trips
        axios
          .get(
            "https://expense-tracker-bzs3.onrender.com/api/travel/displayTrips",
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("userAuthToken")}`,
              },
            }
          )
          .then((res) => {
            console.info(">>> get trips res: ", res);
            setTrips(res.data);
            setFormData({
              date: "",
              name: "",
              category: "",
              amount: "",
              ccy: "",
              baseCCY: "",
              fx: "",
              trip: "",
            });
            setTripName();
          })
          .catch((error) => {
            console.error(">>> get trips error: ", error);
          });

        // Fetch the updated list of expenses
        axios
          .get(
            "https://expense-tracker-bzs3.onrender.com/api/travel/displayAll",
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("userAuthToken")}`,
              },
            }
          )
          .then((res) => {
            console.info(">>> get expense res: ", res);
            setExpenses(res.data);
          })
          .catch((error) => {
            console.error(">>> get expense error: ", error);
          });
      })
      .catch((error) => {
        console.error(">>> create expense error: ", error);
      });
  };

  const handleFilterExpenses = (selectedTripName) => {
    setSelectedTrip(selectedTripName || "");
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

  return (
    <TravelFormStyled onSubmit={handleSubmit}>
      <label>
        <div className="input-control">
          <input
            type="radio"
            name="tripType"
            value="existing"
            checked={tripType === "existing"}
            onChange={(e) => handleTripTypeChange(e)}
          />
          Existing Trip
        </div>
      </label>
      <label>
        <div className="input-control">
          <input
            type="radio"
            name="tripType"
            value="new"
            checked={tripType === "new"}
            onChange={(e) => handleTripTypeChange(e)}
          />
          New Trip
        </div>
      </label>

      {tripType !== "" && (
        <div>
          <div className="selects input-control">
            <div>
              {tripType === "existing" && (
                <select
                  name="trip"
                  id="trip"
                  value={tripName}
                  onChange={(e) => {
                    setTripName(e.target.value);
                    handleFilterExpenses(e.target.value);
                    /* If we don't put this, then the travel expenses wouldn't change when we click on existing trip */
                  }}
                >
                  <option value="" hidden>
                    Select Trip
                  </option>
                  {trips.map((trip) => (
                    <option value={trip} key={trip}>
                      {trip}
                    </option>
                  ))}
                </select>
              )}
              <div className="input-control">
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => {
                    handleFormChange(e, "date");
                  }}
                />
              </div>

              <div className="input-control">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Travel Expense Name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    handleFormChange(e, "name");
                  }}
                />
              </div>

              <div className="selects input-control">
                <select
                  name="category"
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => {
                    handleFormChange(e, "category");
                  }}
                >
                  <option value="" hidden>
                    Select Option
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

              <div className="input-control">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  step="0.01"
                  placeholder="Amt in Local Currency"
                  required
                  value={formData.amount}
                  onInput={(e) => {
                    limitTwoDP(e);
                  }}
                  onChange={(e) => {
                    handleFormChange(e, "amount");
                  }}
                />
              </div>

              <div className="selects input-control">
                <select
                  name="ccy"
                  value={currency ? currency : formData.ccy}
                  id="ccy"
                  required
                  onChange={(e) => {
                    handleFormChange(e, "ccy");
                  }}
                >
                  <option value="" hidden>
                    Select Local Currency
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

              <div className="selects input-control">
                <select
                  name="baseCCY"
                  id="baseCCY"
                  required
                  value={baseCCY ? baseCCY : formData.baseCCY}
                  onChange={(e) => {
                    handleFormChange(e, "baseCCY");
                  }}
                >
                  <option value="" hidden>
                    Select Base Currency
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

              <div className="input-control">
                <input
                  type="number"
                  id="fx"
                  name="fx"
                  step="0.01"
                  placeholder="Exchange Rate"
                  value={fx ? fx : formData.fx}
                  required
                  onChange={(e) => {
                    handleFormChange(e, "fx");
                  }}
                />
              </div>

              <div className="input-control">
                <input
                  type="text"
                  id="trip"
                  name="trip"
                  value={tripName ? tripName : formData.trip}
                  placeholder="Trip Name"
                  required
                  onChange={(e) => {
                    handleFormChange(e, "trip");
                  }}
                />
              </div>

              <div className="submit-btn">
                <button type="submit">Add Travel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </TravelFormStyled>
  );
}

const TravelFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: var(--primary-color);
    &::placeholder {
      color: var(--primary-color3);
    }
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: var(--primary-color);
      &:focus,
      $:active {
        color: var(--primary-color);
      }
    }
  }
`;

export default TravelForm;
