import React, { useEffect } from "react";
import { styled } from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";
import { useGlobalContext } from "../../context/globalContext";

function Expenses() {
  const {
    expenses,
    currentMonthExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getCurrentMonth,
    month,
  } = useGlobalContext();

  useEffect(() => {
    getExpenses();
    getCurrentMonth();
  }, []);

  return (
    <ExpensesStyled>
      <InnerLayout>
        <h2 className="total-expense">
          Total Expense for {month}: <span>${currentMonthExpense}</span>
        </h2>
        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm />
          </div>

          <div className="expenses">
            {expenses
              ? expenses.map((expense, idx) => {
                  const { _id, name, date, category, amount } = expense;
                  return (
                    <ExpenseItem
                      key={_id}
                      id={_id}
                      name={name}
                      date={date}
                      category={category}
                      amount={amount}
                      deleteExpense={deleteExpense}
                      updateExpense={updateExpense}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  );
}

const ExpensesStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-expense {
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

  .expense-content {
    display: flex;
    gap: 2rem;
    .expenses {
      flex: 1;
    }
  }
`;

export default Expenses;
