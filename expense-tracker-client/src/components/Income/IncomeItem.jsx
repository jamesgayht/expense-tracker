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
import IncomeEditForm from "./IncomeEditForm";

function IncomeItem({
  id,
  name,
  amount,
  date,
  category,
  deleteIncome,
  updateIncome,
}) {
  const [selectedIncome, setSelectedIncome] = useState(null);

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
      await deleteIncome({ id: id });
    } catch (error) {
      console.info(">>> error deleting income: ", error);
      window.alert("An error, please try again.");
    }
  };

  const handleEdit = (date, name, category, amount) => {
    setSelectedIncome({
      date: date.substring(0, 10),
      name: name,
      category: category,
      amount: amount,
    });
  };

  return (
    <IncomeItemStyled>
      <div className="icon">{category ? categoryIcon(category) : ""}</div>
      <div className="content">
        <h5>{name}</h5>
      </div>
      <div className="inner-content">
        <p>
          {dollar} {amount}
        </p>
        <p>
          {calendar} {date.substring(0, 10)}
        </p>
        <p>
          {categories} {category}
        </p>
      </div>
      <div className="btn-container">
        <button
          className="edit-btn"
          onClick={() => {
            handleEdit(date, name, category, amount);
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
        {selectedIncome ? (
          <IncomeEditForm
            id={id}
            selectedIncome={selectedIncome}
            updateIncome={updateIncome}
            setSelectedIncome={setSelectedIncome}
          />
        ) : (
          ""
        )}
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
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
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
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
    padding: 0.4rem 0.6rem;
    margin: 0.4rem;
  }
`;

export default IncomeItem;
