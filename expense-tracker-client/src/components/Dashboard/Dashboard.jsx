import React, { useEffect } from "react";
import { styled } from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";
import History from "./History";
import LineChart from "./LineChart";
import RadarChartComp from "./RadarChartComp";

function Dashboard() {
  const {
    month,
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
        <div className="stats-con">
          <div className="chart-con">
            {p3MonthExp ? (
              <LineChart
                p3MonthExp={p3MonthExp}
                p3MonthIncome={p3MonthIncome}
              />
            ) : (
              ""
            )}
            <RadarChartComp />
          </div>
          <div className="history-con">
            <History />
            <div className="amount-con">
              <div className="income">
                <h3>{month} Total Income</h3>
                <p style={{ color: "green" }}>
                  {dollar} {currentMonthIncome}
                </p>
              </div>

              <div className="expense">
                <h3>{month} Total Expenses</h3>
                <p style={{ color: "red" }}>
                  {dollar} {currentMonthExpense}
                </p>
              </div>

              <div className="balance">
                <h3>Balance</h3>
                <p
                  style={
                    currentMonthIncome - currentMonthExpense >= 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {dollar} {currentMonthIncome - currentMonthExpense}
                </p>
              </div>
            </div>
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
    }

    .history-con {
      grid-column: 4/-1;
      h3 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

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
            font-size: 2.4rem;
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
            font-size: 2.4rem;
            font-weight: 700;
          }
        }
      }
    }
  }
`;

export default Dashboard;
