import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth/AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";

export default function Expenses() {
    const { logoutSuccess } = useContext(AuthContext);

    // create state to store form data
    const [formData, setFormData] = useState({});

    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("");
    const [expenses, setExpenses] = useState([]);

    // Introduce a new state variable for the selected expense
    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/expense/listRecords", {
                headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
            })
            .then((res) => {
                console.info(">>> get expenses res: ", res);
                // setTrips(res.data);
            })
            .catch((error) => {
                console.error(">>> get expenses error: ", error);
            });
    }, []);

    const handlExpenseNameChange = (e) => {
        setExpenseName(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFilterExpenses = (selectedExpenseName) => {
        setSelectedExpense(selectedExpenseName || "");
    };

    const handleFormChange = (e, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: e.target.value,
        });
    };


    // Handler for selecting an expense for editing
    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setFormData({
            date: expense.date.substring(0, 10),
            name: expense.name,
            category: expense.category,
            amount: expense.amount,
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
            .post(`http://localhost:3000/api/expense/delete/${expenseId}`, formData, {
                headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
            })
            .then((res) => {
                console.info(">>> delete expense res: ", res);

                // Remove the deleted expense from the expenses state
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
        axios
            .post(
                `http://localhost:3000/api/expense/update/${selectedExpense._id}`,
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
                    .get("http://localhost:3000/api/expense/displayAll", {
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

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:3000/api/expense/displayAll", {
    //             headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
    //         })
    //         .then((res) => {
    //             console.info(">>> get expense res: ", res);

    //             // Filter expenses based on the selected trip
    //             const filteredExpenses = selectedTrip
    //                 ? res.data.filter((expense) => expense.trip === selectedTrip)
    //                 : res.data;

    //             setExpenses(filteredExpenses);
    //         })
    //         .catch((error) => {
    //             console.error(">>> get expense error: ", error);
    //         });
    // }, [selectedTrip]);


    // console.info(expenses);

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
                    <label htmlFor="amount">Amount in Local Currency:</label>
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
                    <h2>Expenses:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Amount in Local Currency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense._id}>
                                    <td>{expense.date}</td>
                                    <td>{expense.name}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.amount}</td>
                                    <td>
                                        <button onClick={() => handleEdit(expense)}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(expense._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>

            {/* Edit Expense Model */}
            {selectedExpense && (
                <div>
                    <h2>Edit Expense</h2>
                    <form onSubmit={updateExpense}>
                        <div>
                            <label htmlFor="edit-date">Date:</label>
                            <input
                                type="date"
                                id="edit-date"
                                name="date"
                                value={formData.date || selectedExpense.date}
                                onChange={(e) => handleFormChange(e, "date")}
                            />
                        </div>
                        <div>
                            <label htmlFor="edit-name">Name:</label>
                            <input
                                type="text"
                                id="edit-name"
                                name="name"
                                value={formData.name || selectedExpense.name}
                                onChange={(e) => handleFormChange(e, "name")}
                            />
                        </div>
                        <div>
                            <label htmlFor="edit-category">Category:</label>
                            <select
                                id="edit-category"
                                name="category"
                                value={formData.category || selectedExpense.category}
                                onChange={(e) => handleFormChange(e, "category")}
                            >
                                {categoryOptions.map((option) => (
                                    <option value={option.value} key={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="edit-amount">Amount:</label>
                            <input
                                type="number"
                                id="edit-amount"
                                name="amount"
                                step="0.01"
                                value={formData.amount || selectedExpense.amount}
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
                            <button type="submit">Save</button>
                            <button onClick={() => setSelectedExpense(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}