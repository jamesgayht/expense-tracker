import React from "react";
import { styled } from "styled-components";
import {
  allowance,
  calendar,
  categories,
  dollar,
  investment,
  money,
  others,
  trash,
  work,
} from "../../utils/icons";

function IncomeItem({
  id,
  name,
  amount,
  date,
  category,
  deleteIncome,
  getIncome,
}) {
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
          className="trash-btn"
          onClick={() => {
            handleDelete(id);
          }}
        >
          {trash}
        </button>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
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

  .trash-btn {
    padding: 0.4rem .6rem;
  }
`;

export default IncomeItem;
