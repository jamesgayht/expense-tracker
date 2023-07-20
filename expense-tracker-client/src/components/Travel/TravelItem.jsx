import React, { useState } from "react";
import { styled } from "styled-components";
import {
  allowance,
  calendar,
  categories,
  dollar,
  edit,
  investment,
  money,
  others,
  trash,
  work,
} from "../../utils/icons";
import TravelEditForm from "./TravelEditForm";

function TravelItem({
  id,
  name,
  amount,
  date,
  category,
  ccy,
  baseCCY,
  fx,
  trip,
  deleteTravelExpense,
  updateTravelExpense,
}) {
  const [selectedExpense, setSelectedExpense] = useState(null);

  const categoryIcon = (category) => {
    switch (category) {
      case "salary":
        return money;

      case "freelance":
        return work;

      case "allowance":
        return allowance;

      case "investments":
        return investment;

      case "others":
        return others;

      default:
        return others;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTravelExpense({ id: id });
    } catch (error) {
      console.info(">>> error deleting travel: ", error);
      window.alert("An error, please try again.");
    }
  };

  const handleEdit = (date, name, category, amount, ccy, baseCCY, fx, trip) => {
    setSelectedExpense({
      date: date.substring(0, 10),
      name: name,
      category: category,
      amount: amount,
      ccy: ccy,
      baseCCY: baseCCY,
      fx: fx,
      trip: trip,
    });
  };

  return (
    <TravelItemStyled>
      <div className="icon">{category ? categoryIcon(category) : ""}</div>
      <div className="content">
        <h5>{trip}</h5>
        <h5>{name}</h5>
      </div>
      <div className="inner-content">
        <p>
          {dollar} {amount}
        </p>
        <p>
          {calendar} {date ? date.substring(0, 10) : ""}
        </p>
        <p>
          {categories} {category}
        </p>
      </div>

      <div className="inner-content">
        <p>
          {dollar} {ccy}
        </p>
        <p>
          {calendar} {baseCCY}
        </p>
        <p>
          {categories} {fx}
        </p>
      </div>

      <div className="btn-container">
        <button
          className="edit-btn"
          onClick={() => {
            handleEdit(date, name, category, amount, ccy, baseCCY, fx, trip);
          }}
        >
          {edit}
        </button>
        <button
          className="trash-btn"
          onClick={() => {
            handleDelete(id);
          }}
        >
          {trash}
        </button>
      </div>

      <div className="edit-form-container">
        {selectedExpense ? (
          <TravelEditForm
            id={id}
            selectedExpense={selectedExpense}
            updateTravelExpense={updateTravelExpense}
          />
        ) : (
          ""
        )}
      </div>
    </TravelItemStyled>
  );
}

const TravelItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radiusL 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex; 
  align-items: center; 
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center; 
    border: 2px solid #ffffff;
    i {
        font-size: 2.6rem;
    } 
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column; 
    gap: .2rem;
    h5 {
        font-size: 1.3rem;
        padding-left: 2rem;
        position: relative; 
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            background: (--color-blue);
        }

    }

    .inner-content {
        display: flex; 
        justify-content: space-between;
        align-items: center; 
        .text {
            display: flex;
            align-items: center; 
            gap: 1.5rem; 
            p {
                display: flex;
                align-items: center; 
                gap: 0.5rem; 
                color: var(--primary-color);
                opacity: 0.8;
            }
        }
    }
  }

  .trash-btn,
  .edit-btn {
    padding: 0.4rem .6rem;
    margin: 0.4rem;
  }
`;

export default TravelItem;
