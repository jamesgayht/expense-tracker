import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/globalContext";
import { styled } from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses, p3MonthIncome, p3MonthExp } = useGlobalContext();
  
  const data = {
    labels: p3MonthIncome.map((income) => {
      return income.month;
    }),

    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => {
            return income.amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },

      {
        label: "Expenses",
        data: [
          ...expenses.map((expense) => {
            return expense.amount;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  height: 100%;
`;

export default Chart;
