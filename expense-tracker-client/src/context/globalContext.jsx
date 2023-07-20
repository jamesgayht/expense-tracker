import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";

const BASE_URL = "http://localhost:3000/api";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [trips, setTrips] = useState([]);
  const [month, setMonth] = useState(null);

  // <----------- Travel Expenses ---------->
  const addTravelExpense = async (travelExpense) => {
    await axios
      .post(`${BASE_URL}/travel/insertExpense`, travelExpense, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> create travel expense res: ", res);
        getTravelExpenses();
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> create trips error: ", error);
        });
      });
  };

  const getTravelExpenses = async () => {
    await axios
      .get(`${BASE_URL}/travel/displayAll`, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> get trips res: ", res);
        setTrips(res.data);
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> get trips error: ", error);
        });
      });
  };

  const deleteTravelExpense = async (id) => {
    await axios
      .post(`${BASE_URL}/travel/delete/${id.id}`, id, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> delete trips res: ", res);
        getExpenses();
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> delete trips error: ", error);
        });
      });
  };

  const updateTravelExpense = async (id, travelExpense) => {
    await axios
      .post(`${BASE_URL}/travel/update/${id}`, travelExpense, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> update expense res: ", res);

        // Fetch the updated list of expenses
        getTravelExpenses();
      })
      .catch((err) => {
        console.error(">>> update travel expense error: ", err);
      });
  };

  // <----------- Expenses ---------->
  const addExpense = async (expense) => {
    await axios
      .post(`${BASE_URL}/expense/insertExpense`, expense, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> create income res: ", res);
        getExpenses();
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> create income error: ", error);
        });
      });
  };

  const getExpenses = async () => {
    await axios
      .get(`${BASE_URL}/expense/displayAll`, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> get expenses res: ", res);
        setExpenses(res.data);
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> get expenses error: ", error);
        });
      });
  };

  const deleteExpense = async (id) => {
    await axios
      .post(`${BASE_URL}/expense/delete/${id.id}`, id, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> delete expense res: ", res);
        getExpenses();
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> delete expense error: ", error);
        });
      });
  };

  const updateExpense = async (id, expense) => {
    await axios
      .post(`${BASE_URL}/expense/update/${id}`, expense, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> update expense res: ", res);

        // Fetch the updated list of expenses
        getExpenses();
      })
      .catch((err) => {
        console.error(">>> update expense error: ", err);
      });
  };

  // <----------- Incomes ---------->
  const addIncome = async (income) => {
    await axios
      .post(`${BASE_URL}/income`, income, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> create income res: ", res);
        getIncome();
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> create income error: ", error);
        });
      });
  };

  const getIncome = async () => {
    await axios
      .get(`${BASE_URL}/income`, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> get income res: ", res);
        setIncomes(res.data);
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> get income error: ", error);
        });
      });
  };

  const deleteIncome = async (id) => {
    await axios
      .post(`${BASE_URL}/income/delete`, id, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> delete income res: ", res);
        getIncome();
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> delete income error: ", error);
        });
      });
  };

  const updateIncome = async (id, income) => {
    await axios
      .post(`${BASE_URL}/income/update/${id}`, income, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> update income res: ", res);

        // Fetch the updated list of expenses
        getIncome();
      })
      .catch((err) => {
        console.error(">>> update income error: ", err);
      });
  };

  // <----------- Month ---------->
  const getCurrentMonth = () => {
    const date = new Date();
    // not sure why it captures as June???
    const currMonth = date.getMonth() + 1;

    switch (currMonth) {
      case 1:
        return setMonth("Jan");
      case 2:
        return setMonth("Feb");
      case 3:
        return setMonth("Mar");
      case 4:
        return setMonth("Apr");
      case 5:
        return setMonth("May");
      case 6:
        return setMonth("Jun");
      case 7:
        return setMonth("Jul");
      case 8:
        return setMonth("Aug");
      case 9:
        return setMonth("Sep");
      case 10:
        return setMonth("Oct");
      case 11:
        return setMonth("Nov");
      case 12:
        return setMonth("Dec");
      default:
        break;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        addTravelExpense,
        getTravelExpenses,
        deleteTravelExpense,
        updateTravelExpense,
        trips,
        addExpense,
        getExpenses,
        deleteExpense,
        updateExpense,
        expenses,
        addIncome,
        getIncome,
        deleteIncome,
        updateIncome,
        incomes,
        getCurrentMonth,
        month,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
