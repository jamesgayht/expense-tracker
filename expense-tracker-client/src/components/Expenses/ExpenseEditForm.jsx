import React, { useState } from "react";
import { styled } from "styled-components";

function ExpenseEditForm({
  id,
  selectedExpense,
  updateExpense,
  setSelectedExpense,
}) {
  const [formData, setFormData] = useState({
    date: selectedExpense.date,
    name: selectedExpense.name,
    category: selectedExpense.category,
    amount: selectedExpense.amount,
  });

  const handleFormChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(id, formData);
      setSelectedExpense(null);
    } catch (error) {
      console.info(">>> error updating expense: ", error);
      window.alert("An error, please try again.");
    }
  };

  const handleCancel = () => {
    setSelectedExpense(null);
  };

  const limitTwoDP = (e) => {
    const t = e.target.value;

    if (t.indexOf(".") >= 0 && t.substr(t.indexOf(".") + 1).length > 2)
      e.target.value =
        t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3);
  };

  const categoryOptions = [
    { value: "f&b", label: "F&B" },
    { value: "transport", label: "Transport" },
    { value: "accommodation", label: "Accommodation" },
    { value: "groceries", label: "Groceries" },
    { value: "shopping", label: "Shopping" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health & fitness", label: "Health & Fitness" },
    { value: "others", label: "Others" },
  ];

  return (
    <ExpenseEditFormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          id="date"
          name="date"
          type="date"
          required
          value={formData.date}
          onChange={(e) => {
            handleFormChange(e, "date");
          }}
        />
      </div>
      <div className="input-control">
        <input
          type="type"
          id="name"
          name="name"
          placeholder="Income Title"
          required
          value={formData.name}
          onChange={(e) => {
            handleFormChange(e, "name");
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          name="category"
          id="category"
          required
          value={formData.category}
          onChange={(e) => {
            handleFormChange(e, "category");
          }}
        >
          {/* TODO: selected throws warning, surpress? */}
          <option value="" hidden>
            Select Option
          </option>
          {categoryOptions.map(function (cat, i) {
            return (
              <option value={cat.value} key={i}>
                {cat.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="input-control">
        <input
          type="number"
          id="amount"
          name="amount"
          step="0.01"
          placeholder="Amount"
          required
          value={formData.amount}
          onInput={(e) => {
            limitTwoDP(e);
          }}
          onChange={(e) => {
            handleFormChange(e, "amount");
          }}
        />
      </div>
      <div className="btn-con">
        <button type="submit">Update</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </ExpenseEditFormStyled>
  );
}

const ExpenseEditFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: var(--primary-color);
    &::placeholder {
      color: var(--primary-color3);
    }
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: var(--primary-color);
      &:focus,
      $:active {
        color: var(--primary-color);
      }
    }
  }

  .btn-con {
    display: flex;
    justify-content: space-evenly;
  }
`;

export default ExpenseEditForm;
