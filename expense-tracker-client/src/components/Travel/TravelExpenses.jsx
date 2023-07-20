import React, { useEffect } from "react";
import { styled } from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import TravelItem from "./TravelItem";
import TravelForm from "./TravelForm";

function Trips() {
  const {
    trips,
    tripCCY,
    tripAmount,
    getTravelExpenses,
    deleteTravelExpense,
    updateTravelExpense,
    getCurrentMonth,
    month,
  } = useGlobalContext();

  useEffect(() => {
    getTravelExpenses();
    getCurrentMonth();
  }, []);

  return (
    <TripsStyled>
      <InnerLayout>
        <h2 className="total-travel-expense">
          Total Travel Expense for {month}:{" "}
          <span>
            {tripCCY} {tripAmount}
          </span>
        </h2>
        <div className="travel-expense-content">
          <div className="form-container">
            <TravelForm />
          </div>

          <div className="travel-expenses">
            {trips
              ? trips.map((travelExpense, idx) => {
                  const {
                    _id,
                    name,
                    date,
                    category,
                    amount,
                    ccy,
                    baseCCY,
                    fx,
                    trip,
                  } = travelExpense;
                  return (
                    <TravelItem
                      key={_id}
                      id={_id}
                      name={name}
                      date={date}
                      category={category}
                      amount={amount}
                      ccy={ccy}
                      baseCCY={baseCCY}
                      fx={fx}
                      trip={trip}
                      deleteTravelExpense={deleteTravelExpense}
                      updateTravelExpense={updateTravelExpense}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </InnerLayout>
    </TripsStyled>
  );
}

const TripsStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-travel-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    color: var(--primary-color);

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-accent);
    }
  }

  .travel-expense-content {
    display: flex;
    gap: 2rem;
    .travel-expenses {
      flex: 1;
    }
  }
`;

export default Trips;

/*
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../auth/AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";

export default function Travel() {
  // create state to store form data
  const [formData, setFormData] = useState({});
  // const [formData, setFormData] = useState();

  const [tripType, setTripType] = useState("")

  const [trips, setTrips] = useState([]);
  const [tripName, setTripName] = useState("");
  const [currency, setCurrency] = useState("");
  const [baseCCY, setBaseCCY] = useState("");
  const [fx, setFX] = useState("");
  const [selectedTrip, setSelectedTrip] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Introduce a new state variable for the selected expense
  const [selectedExpense, setSelectedExpense] = useState(null);

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

  useEffect(() => {
    // Make sure there is a selected trip
    console.log("getting trip ", tripName);
    if (tripName) {
      axios
        .get(
          `http://localhost:3000/api/travel/displayTrip/${selectedTrip}/currencies`,
          {
            headers: {Authorization: `Bearer ${Cookies.get("userAuthToken")}`,
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

  const handleFilterExpenses = (selectedTripName) => {
    setSelectedTrip(selectedTripName || "");
  };

  const handleFormChange = (e, fieldName) => {
    console.log("getting field name",fieldName)
    if (tripType === "existing") {
      setFormData({
        ...formData,
        [fieldName]: e.target.value,
        baseCCY: baseCCY,
        ccy: currency,
        trip: tripName,
        fx:fx 
      })
    } else {
      setFormData({
        ...formData,
        [fieldName]: e.target.value,
      });
    }
  };
  
  const handleTripTypeChange = (e) => {
    setTripType(e.target.value)
  }

  // Handler for selecting an expense for editing
  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    // console.log("get selected expense", expense._id)

    const updatedFormData = {
      date: expense.date.substring(0, 10),
      name: expense.name,
      category: expense.category,
      amount: expense.amount,
      ccy: expense.ccy,
      baseCCY: expense.baseCCY,
      fx: expense.fx,
      trip: expense.trip,
    };
    console.log("updated formdata", updatedFormData);
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/travel/insertExpense", formData, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> create expense res: ", res);

        // Fetch the updated list of trips
        axios
          .get("http://localhost:3000/api/travel/displayTrips", {
            headers: {
              Authorization: `Bearer ${Cookies.get("userAuthToken")}`,
            },
          })
          .then((res) => {
            console.info(">>> get trips res: ", res);
            setTrips(res.data);
          })
          .catch((error) => {
            console.error(">>> get trips error: ", error);
          });

        // Fetch the updated list of expenses
        axios
          .get("http://localhost:3000/api/travel/displayAll", {
            headers: {
              Authorization: `Bearer ${Cookies.get("userAuthToken")}`,
            },
          })
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

  const handleDelete = (expenseId) => {
    axios
      .post(`http://localhost:3000/api/travel/delete/${expenseId}`, formData, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> delete expense res: ", res);

        // Remove the deleted expense from the expenses state (so that it will refresh on the FE)
        setExpenses((prevExpenses) =>
          prevExpenses.filter((exp) => exp._id !== expenseId)
        );
      })
      .catch((error) => {
        console.error(">>> delete expense error: ", error);
      });
  };

  // Handler for selecting an expense for editing
  const updateExpense = () => {
    console.log("FormData before update:", formData);
    axios
      .post(
        `http://localhost:3000/api/travel/update/${selectedExpense._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userAuthToken")}`,
          },
        }
      )
      .then((res) => {
        console.info(">>> update expense res: ", res);
        setSelectedExpense(null);
        setFormData({});

        // Fetch the updated list of expenses
        axios
          .get("http://localhost:3000/api/travel/displayAll", {
            headers: {
              Authorization: `Bearer ${Cookies.get("userAuthToken")}`,
            },
          })
          .then((res) => {
            console.info(">>> get expense res: ", res);
            setExpenses(res.data);
          })
          .catch((error) => {
            console.error(">>> get expense error: ", error);
          });
      })
      .catch((error) => {
        console.error(">>> update expense error: ", error);
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

  //change the Travel Expenses section whenever user filters a trip
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/travel/displayAll", {
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

  return (
    <div>
      <h2>Travel Expense Tracker</h2>

      <div>
        <label>Trip Type:</label>
        <div>
          <label>
            <input
              type="radio"
              name="tripType"
              value="existing"
              checked={tripType === "existing"}
              onChange={(e) => handleTripTypeChange(e)}
            />
            Existing Trip
          </label>
          <label>
            <input
              type="radio"
              name="tripType"
              value="new"
              checked={tripType === "new"}
              onChange={(e) => handleTripTypeChange(e)}
            />
            New Trip
          </label>
        </div>
      </div>
*/
{
  /* If Existing is selected, then the existing trip name drop down will appear */
}
//       <div>
//         {/* {formData.tripType === "existing" && ( */}
//         {tripType === "existing" && (
//           <div>
//             <label htmlFor="trip">Existing Trip Name:</label>
//             <select
//               name="trip"
//               id="trip"
//               value={tripName}
//               onChange={(e) => {
//                 setTripName(e.target.value);
//                 handleFilterExpenses(e.target.value); {/* If we don't put this, then the travel expenses wouldn't change when we click on existing trip */}
//               }}
//             >
//               <option value="">Select Trip</option>
//               {trips.map((trip) => (
//                 <option value={trip} key={trip}>
//                   {trip}
//                 </option>
//               ))}
//             </select>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="date">Date:</label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "date");
//                   }}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                   type="type"
//                   id="name"
//                   name="name"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "name");
//                   }}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="category">Category:</label>
//                 <select
//                   name="category"
//                   id="category"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "category");
//                   }}
//                 >

//                   <option value="placeholder" disabled={true} selected>
//                     Select...
//                   </option>
//                   {categoryOptions.map(function (cat, i) {
//                     return (
//                       <option value={cat.value} key={i}>
//                         {cat.label}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="amount">Amount in Local Currency:</label>
//                 <input
//                   type="number"
//                   id="amount"
//                   name="amount"
//                   step="0.01"
//                   required
//                   onInput={(e) => {
//                     limitTwoDP(e);
//                   }}
//                   onChange={(e) => {
//                     handleFormChange(e, "amount");
//                   }}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="ccy">Local Currency:</label>
//                 <select
//                   name="ccy"
//                   value={currency}
//                   id="ccy"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "ccy");
//                   }}
//                 >
//                   <option value="placeholder" disabled={true} selected>
//                     Select...
//                   </option>
//                   {currencyOptions.map(function (ccy, i) {
//                     return (
//                       <option value={ccy.value} key={i}>
//                         {ccy.label}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="baseCCY">Base Currency:</label>
//                 <select
//                   name="baseCCY"
//                   id="baseCCY"
//                   value={baseCCY}
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "baseCCY");
//                   }}
//                 >
//                   <option value="placeholder" disabled={true} selected>
//                     Select...
//                   </option>
//                   {currencyOptions.map(function (ccy, i) {
//                     return (
//                       <option value={ccy.value} key={i}>
//                         {ccy.label}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="fx">Exchange Rate: </label>
//                 {/* 1 local ccy : xx base ccy. xx will be the amount to key in*/}
//                 <input
//                   type="number"
//                   id="fx"
//                   name="fx"
//                   step="any"
//                   value={fx}
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "fx");
//                   }}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="trip">Trip Name:</label>
//                 <input
//                   type="type"
//                   id="trip"
//                   name="trip"
//                   value={tripName}
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "trip");
//                   }}
//                 />
//               </div>
//               <div>
//                 <button type="submit">Add Expense</button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* If Trip type is not existing*/}
//         {tripType !== "existing" && (
//           <div>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="date">Date:</label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "date");
//                   }}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                   type="type"
//                   id="name"
//                   name="name"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "name");
//                   }}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="category">Category:</label>
//                 <select
//                   name="category"
//                   id="category"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "category");
//                   }}
//                 >

//                   <option value="placeholder" disabled={true} selected>
//                     Select...
//                   </option>
//                   {categoryOptions.map(function (cat, i) {
//                     return (
//                       <option value={cat.value} key={i}>
//                         {cat.label}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="amount">Amount in Local Currency:</label>
//                 <input
//                   type="number"
//                   id="amount"
//                   name="amount"
//                   step="0.01"
//                   required
//                   onInput={(e) => {
//                     limitTwoDP(e);
//                   }}
//                   onChange={(e) => {
//                     handleFormChange(e, "amount");
//                   }}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="ccy">Local Currency:</label>
//                 <select
//                   name="ccy"
//                   id="ccy"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "ccy");
//                   }}
//                 >
//                   <option value="placeholder" disabled={true} selected>
//                     Select...
//                   </option>
//                   {currencyOptions.map(function (ccy, i) {
//                     return (
//                       <option value={ccy.value} key={i}>
//                         {ccy.label}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="baseCCY">Base Currency:</label>
//                 <select
//                   name="baseCCY"
//                   id="baseCCY"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "baseCCY");
//                   }}
//                 >
//                   <option value="placeholder" disabled={true} selected>
//                     Select...
//                   </option>
//                   {currencyOptions.map(function (ccy, i) {
//                     return (
//                       <option value={ccy.value} key={i}>
//                         {ccy.label}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="fx">Exchange Rate: </label>{" "}
//                 {/* 1 local ccy : xx base ccy. xx will be the amount to key in*/}
//                 <input
//                   type="number"
//                   id="fx"
//                   name="fx"
//                   step="any"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "fx");
//                   }}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="trip">Trip Name:</label>
//                 <input
//                   type="type"
//                   id="trip"
//                   name="trip"
//                   required
//                   onChange={(e) => {
//                     handleFormChange(e, "trip");
//                   }}
//                 />
//               </div>
//               <div>
//                 <button type="submit">Add Expense</button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       <div>
//         <h2>Filter By Trip:</h2>
//         <select
//           name="filter"
//           id="filter"
//           onChange={(e) => handleFilterExpenses(e.target.value)}
//         >
//           <option value="">Select Trip (All Trips if unselected)</option>
//           {trips.map((trip) => (
//             <option value={trip} key={trip}>
//               {trip}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <h2>Travel Expenses:</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Amount in Local Currency</th>
//               <th>Local Currency</th>
//               <th>Amount in Base Currency</th>
//               <th>Base Currency</th>
//               <th>Exchange Rate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((expense) => (
//               <tr key={expense._id}>
//                 <td>{new Date(expense.date).toLocaleDateString("en-GB")}</td>{" "}
//                 {/* convert it to javascript date object first so that we can use toLocaleDateString() */}
//                 <td>{expense.name}</td>
//                 <td>{expense.category}</td>
//                 <td>{expense.amount}</td>
//                 <td>{expense.ccy}</td>
//                 <td>{expense.baseAmount}</td>
//                 <td>{expense.baseCCY}</td>
//                 <td>{expense.fx}</td>
//                 <td>
//                   <button onClick={() => handleEdit(expense)}>Edit</button>
//                 </td>
//                 <td>
//                   <button onClick={() => handleDelete(expense._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Expense will only appear when edit is clicked*/}
//       {selectedExpense && (
//         <div>
//           <h2>Edit Expense</h2>
//           <form onSubmit={updateExpense}>
//             <div>
//               <label htmlFor="edit-date">Date:</label>
//               <input
//                 type="date"
//                 id="edit-date"
//                 name="date"
//                 value={formData.date}
//                 onChange={(e) => handleFormChange(e, "date")}
//               />
//             </div>
//             <div>
//               <label htmlFor="edit-name">Name:</label>
//               <input
//                 type="text"
//                 id="edit-name"
//                 name="name"
//                 value={formData.name}
//                 onChange={(e) => handleFormChange(e, "name")}
//               />
//             </div>
//             <div>
//               <label htmlFor="edit-category">Category:</label>
//               <select
//                 id="edit-category"
//                 name="category"
//                 value={formData.category}
//                 onChange={(e) => handleFormChange(e, "category")}
//               >
//                 {categoryOptions.map((option) => (
//                   <option value={option.value} key={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="edit-amount">Amount:</label>
//               <input
//                 type="number"
//                 id="edit-amount"
//                 name="amount"
//                 step="0.01"
//                 value={formData.amount}
//                 required
//                 onInput={(e) => {
//                   limitTwoDP(e);
//                 }}
//                 onChange={(e) => {
//                   handleFormChange(e, "amount");
//                 }}
//               />
//             </div>
//             <div>
//               <label htmlFor="edit-fx">Exchange Rate:</label>{" "}
//               {/* exchange rate shouldn't be limited to 2dp */}
//               <input
//                 type="number"
//                 id="edit-fx"
//                 name="fx"
//                 step="any"
//                 value={formData.fx}
//                 required
//                 onChange={(e) => {
//                   handleFormChange(e, "fx");
//                 }}
//               />
//             </div>
//             <div>
//               <label htmlFor="edit-ccy">Local Currency:</label>
//               <select
//                 id="edit-ccy"
//                 name="ccy"
//                 value={formData.ccy}
//                 onChange={(e) => handleFormChange(e, "ccy")}
//               >
//                 {currencyOptions.map((option) => (
//                   <option value={option.value} key={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="edit-baseCCY">Base Currency:</label>
//               <select
//                 id="edit-baseCCY"
//                 name="baseCCY"
//                 value={formData.baseCCY}
//                 onChange={(e) => handleFormChange(e, "baseCCY")}
//               >
//                 {currencyOptions.map((option) => (
//                   <option value={option.value} key={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//               {/* {console.log("heres to check",formData.baseCCY)} */}
//             </div>
//             <div>
//               <button type="submit">Save</button>
//               <button onClick={() => setSelectedExpense(null)}>Cancel</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }
