import React, { useEffect } from "react";
import { styled } from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Chart from "./Chart";
import { dollar } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";
import History from "./History";

function Dashboard() {
  const {
    incomes,
    expenses,
    currentMonthIncome,
    currentMonthExpense,
    getIncome,
    getExpenses,
    p3MonthIncome,
    p3MonthExp,
  } = useGlobalContext();

  useEffect(() => {
    getIncome();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            {p3MonthExp ? 
            <Chart p3MonthExp={p3MonthExp} p3MonthIncome={p3MonthIncome} /> : ""}
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {currentMonthIncome}
                </p>
              </div>

              <div className="expense">
                <h2>Total Expenses</h2>
                <p>
                  {dollar} {currentMonthExpense}
                </p>
              </div>

              <div className="balance">
                <h2>Balance</h2>
                <p>
                  {dollar} {currentMonthIncome - currentMonthExpense}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            {/* <div className="salary-title">
              <h2>
                Min <span>Salary</span> Max
              </h2>
            </div>
            <div className="salary-item">
              <p>
                {Math.min(
                  ...incomes.map((income) => {
                    return income.amount;
                  })
                )}
              </p>
              <p>
                {Math.max(
                  ...incomes.map((income) => {
                    return income.amount;
                  })
                )}
              </p>
            </div>
            <div className="expense-title">
              <h2>
                Min <span>Expense</span> Max
              </h2>
            </div>
            <div className="expense-item">
              <p>
                {Math.min(
                  ...expenses.map((expense) => {
                    return expense.amount;
                  })
                )}
              </p>
              <p>
                {Math.max(
                  ...expenses.map((expense) => {
                    return expense.amount;
                  })
                )}
              </p>
            </div> */}
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    .chart-con {
      grid-column: 1/4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2/4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: #116a7b;
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4/-1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .expense-title,
      .salary-title {
        h2 {
          font-size: 1.2rem;
        }
        span {
          font-size: 1.8rem;
        }
      }

      .expense-item,
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
