import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";

const BASE_URL = "https://expense-tracker-bzs3.onrender.com/api";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [trips, setTrips] = useState([]);
  const [latestTrip, setLatestTrip] = useState([]);
  const [month, setMonth] = useState(null);
  const [tripAmount, setTripAmount] = useState(null);
  const [tripCCY, setTripCCY] = useState(null);
  const [p3MonthExp, setP3MonthExp] = useState([]);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(null);
  const [p3MonthIncome, setP3MonthIncome] = useState([]);
  const [currentMonthIncome, setCurrentMonthIncome] = useState(null);
  const [currentMonthExpenseByCat, setCurrentMonthExpenseByCat] = useState([]);
  const [error, setError] = useState(null);

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
          setError(error.response.data.message);
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
        const sortedTrips = res.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setLatestTrip(sortedTrips[0].trip);
        setTrips(sortedTrips);
        getTripAmount(res.data);
      })
      .catch((error) => {
        console.error(">>> get trips error: ", error);
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
        setError(error.response.data.message);
      });
  };

  const getTripAmount = (data) => {
    const sortedTrips = data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const latestTrip = sortedTrips[0].trip;
    setTripCCY(sortedTrips[0].ccy);

    const filteredTripExpense = [];
    sortedTrips.map((trip) => {
      if (trip.trip === latestTrip) filteredTripExpense.push(trip.amount);
      return "";
    });

    let total = 0;
    filteredTripExpense.forEach((amount) => {
      total += amount;
    });

    setTripAmount(total);
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
          setError(error.response.data.message);
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
        const sortedExpenses = res.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setExpenses(sortedExpenses);
        getMonthlyExpenses(sortedExpenses);
      })
      .catch((error) => {
        console.error(">>> get expenses error: ", error);
        setError(error.response.data.message);
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
        console.error(">>> delete expense error: ", error);
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
        setError(error.response.data.message);
      });
  };

  const getMonthlyExpenses = (sortedExpenses) => {
    const date = new Date();
    const currMonth = date.getMonth() + 1;
    const currYear = date.getFullYear();

    let p2MonthExp = { month: `${currYear}-${currMonth - 2}`, amount: 0 };
    let prevMonthExp = { month: `${currYear}-${currMonth - 1}`, amount: 0 };
    let currMonthExp = { month: `${currYear}-${currMonth}`, amount: 0 };

    const currMonthExpByCat = [
      { category: "f&b", subject: "f&b", amount: 0 },
      { category: "transport", subject: "tran", amount: 0 },
      { category: "accommodation", subject: "acc", amount: 0 },
      { category: "groceries", subject: "groc", amount: 0 },
      { category: "shopping", subject: "shop", amount: 0 },
      { category: "entertainment", subject: "ent", amount: 0 },
      { category: "health & fitness", subject: "h&f", amount: 0 },
      { category: "others", subject: "oth", amount: 0 },
    ];

    sortedExpenses.map((exp) => {
      switch (Number(exp.date.substring(5, 7))) {
        case Number(currMonth) - 2:
          p2MonthExp.amount += exp.amount;
          break;

        case Number(currMonth) - 1:
          prevMonthExp.amount += exp.amount;
          break;

        case Number(currMonth):
          currMonthExp.amount += exp.amount;
          let cat = exp.category;
          currMonthExpByCat.map((curr) => {
            if (curr.category === cat) curr.amount += exp.amount;
            return "";
          });
          break;

        default:
          break;
      }
      return "";
    });

    setCurrentMonthExpenseByCat(currMonthExpByCat);
    setCurrentMonthExpense(currMonthExp.amount);
    setP3MonthExp([p2MonthExp, prevMonthExp, currMonthExp]);
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
          setError(error.response.data.message);
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
        const sortedIncome = res.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setIncomes(sortedIncome);
        getMonthlyIncome(sortedIncome);
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
        setError(error.response.data.message);
      });
  };

  const getMonthlyIncome = (sortedIncomes) => {
    const date = new Date();
    const currMonth = date.getMonth() + 1;
    const currYear = date.getFullYear();

    let p2MonthInc = { month: `${currYear}-${currMonth - 2}`, amount: 0 };
    let prevMonthInc = { month: `${currYear}-${currMonth - 1}`, amount: 0 };
    let currMonthInc = { month: `${currYear}-${currMonth}`, amount: 0 };

    sortedIncomes.map((inc) => {
      switch (Number(inc.date.substring(5, 7))) {
        case Number(currMonth) - 2:
          p2MonthInc.amount += inc.amount;
          break;

        case Number(currMonth) - 1:
          prevMonthInc.amount += inc.amount;
          break;

        case Number(currMonth):
          currMonthInc.amount += inc.amount;
          break;

        default:
          break;
      }
      return "";
    });

    setCurrentMonthIncome(currMonthInc.amount);
    setP3MonthIncome([p2MonthInc, prevMonthInc, currMonthInc]);
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

  // <----------- TXN HISTORY ---------->
  const transactionHistory = () => {
    const incomeHistory = [];
    incomes.map((income) => {
      income.type = "income";
      incomeHistory.push(income);
    });

    const expenseHistory = [];
    expenses.map((expense) => {
      expense.type = "expense";
      expenseHistory.push(expense);
    });

    const history = [...incomeHistory, ...expenseHistory];
    history.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return history;
  };

  return (
    <GlobalContext.Provider
      value={{
        addTravelExpense,
        getTravelExpenses,
        deleteTravelExpense,
        updateTravelExpense,
        tripCCY,
        trips,
        tripAmount,
        latestTrip,
        addExpense,
        getExpenses,
        deleteExpense,
        updateExpense,
        expenses,
        p3MonthExp,
        currentMonthExpense,
        currentMonthExpenseByCat,
        addIncome,
        getIncome,
        deleteIncome,
        updateIncome,
        incomes,
        currentMonthIncome,
        p3MonthIncome,
        getCurrentMonth,
        month,
        transactionHistory,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
