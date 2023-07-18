import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import IncomeForm from "./IncomeForm";
import { useGlobalContext } from "../../context/globalContext";
import IncomeItem from "./IncomeItem";

function Incomes() {
  const { incomes, getIncome, deleteIncome, getCurrentMonth, month } = useGlobalContext();

  useEffect(() => {
    getIncome();
    getCurrentMonth()
  }, []);

  return (
    <IncomesStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income for {month}: <span>$1500</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <IncomeForm />
          </div>

          <div className="incomes">
            {incomes
              ? incomes.map((income, idx) => {
                  const { _id, name, date, category, amount } = income;
                  return (
                    <IncomeItem
                      key={_id}
                      id={_id}
                      name={name}
                      date={date}
                      category={category}
                      amount={amount}
                      deleteIncome={deleteIncome}
                      getIncome={getIncome}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
}

const IncomesStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-income {
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

  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Incomes;
