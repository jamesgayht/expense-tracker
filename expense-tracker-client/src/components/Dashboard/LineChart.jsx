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

function LineChart() {
  const { p3MonthIncome, p3MonthExp } = useGlobalContext();
  
  const data = {
    labels: p3MonthIncome.map((income) => {
      return income.month;
    }),

    datasets: [
      {
        label: "Income",
        data: [
          ...p3MonthIncome.map((income) => {
            return income.amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },

      {
        label: "Expenses",
        data: [
          ...p3MonthExp.map((expense) => {
            return expense.amount;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <LineChartStyled>
      <Line data={data} />
    </LineChartStyled>
  );
}

const LineChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
`;

export default LineChart;
