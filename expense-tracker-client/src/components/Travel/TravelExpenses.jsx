import React, { useEffect } from "react";
import { styled } from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import TravelItem from "./TravelItem";
import TravelForm from "./TravelForm";

function Trips() {
  const {
    trips,
    getTravelExpenses,
    deleteTravelExpense,
    updateTravelExpense,
    getCurrentMonth,
    month,
  } = useGlobalContext();

  useEffect(() => {
    getTravelExpenses();
    getCurrentMonth();
  }, []);

  return (
    <TripsStyled>
      <InnerLayout>
        <h2 className="total-travel-expense">
          Total Travel Expense for {month}: <span>$0</span>
        </h2>
        <div className="travel-expense-content">
          <div className="form-container">
            <TravelForm />
          </div>

          <div className="travel-expenses">
            {trips
              ? trips.map((travelExpense, idx) => {
                  const {
                    _id,
                    name,
                    date,
                    category,
                    amount,
                    ccy,
                    baseCCY,
                    fx,
                    trip,
                  } = travelExpense;
                  return (
                    <TravelItem
                      key={_id}
                      id={_id}
                      name={name}
                      date={date}
                      category={category}
                      amount={amount}
                      ccy={ccy}
                      baseCCY={baseCCY}
                      fx={fx}
                      trip={trip}
                      deleteTravelExpense={deleteTravelExpense}
                      updateTravelExpense={updateTravelExpense}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </InnerLayout>
    </TripsStyled>
  );
}

const TripsStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-travel-expense {
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

  .travel-expense-content {
    display: flex;
    gap: 2rem;
    .travel-expenses {
      flex: 1;
    }
  }
`;

export default Trips;
