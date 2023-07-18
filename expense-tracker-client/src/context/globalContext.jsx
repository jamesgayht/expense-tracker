import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";

const BASE_URL = "http://localhost:3000/api";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState(null);

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
        setIncomes(res.data);
      })
      .catch((error) => {
        console.error((error) => {
          console.error(">>> get income error: ", error);
          setError(error.response.data.message);
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
          setError(error.response.data.message);
        });
      });
  };

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
      value={{ addIncome, getIncome, deleteIncome, incomes, getCurrentMonth, month }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
