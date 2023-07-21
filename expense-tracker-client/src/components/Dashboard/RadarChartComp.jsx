import React from "react";
import { styled } from "styled-components";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useGlobalContext } from "../../context/globalContext";

function RadarChartComp() {
  const { currentMonthExpenseByCat } = useGlobalContext();

  // const data = [];

  //   currentMonthExpenseByCat.map((curr) => {
  //     return curr.category;
  // });

  console.info("data >>> ", currentMonthExpenseByCat);

  return (
    <RadarChartCompStyled>
      <RadarChart width={520} height={360} data={currentMonthExpenseByCat}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar
          dataKey="amount"
          stroke="#8884d8"
          fill="var(--color-blue)"
          fillOpacity={0.8}
        />
      </RadarChart>
    </RadarChartCompStyled>
  );
}

const RadarChartCompStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  margin-top: 1rem;
  overflow: scroll;
`;

export default RadarChartComp;
