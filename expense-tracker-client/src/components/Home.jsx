import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth/AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";

export default function Home() {
  const { logoutSuccess } = useContext(AuthContext);

  // create state to store form data
  const [formData, setFormData] = useState({});

  const handleFormChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/expense/insertExpense", formData, {
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
    { value: "housing", label: "Housing" },
    { value: "groceries", label: "Groceries" },
    { value: "entertainment", label: "Entertainment" },
    { value: "travel", label: "Travel" },
    { value: "health & Fitness", label: "Health & Fitness" },
    { value: "others", label: "Others" },
  ];

  // Get user current monthly expenses
  const [expenseNames, setExpenseNames] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/expense/displayAll", {
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
      <h2>Expense Tracker</h2>
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
          <button type="submit">Add Expense</button>
        </div>
      </form>

      <div>
        <h2>Expenses:</h2>
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
              expenseNames.map(function (exp, i) {
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
