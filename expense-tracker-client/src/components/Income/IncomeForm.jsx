import React, { useState } from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function IncomeForm() {
  const { addIncome, getIncome } = useGlobalContext();
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    category: "",
    amount: null,
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
      await addIncome(formData);
      setFormData({
        date: "",
        name: "",
        category: "",
        amount: null,
      });
      console.log("submitting income");
    } catch (error) {
      console.info(">>> error adding income: ", error);
      window.alert("An error, please try again.");
    }
  };

  const limitTwoDP = (e) => {
    const t = e.target.value;

    if (t.indexOf(".") >= 0 && t.substr(t.indexOf(".") + 1).length > 2)
      e.target.value =
        t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3);
  };

  const categoryOptions = [
    { value: "salary", label: "Salary" },
    { value: "freelance", label: "Freelance" },
    { value: "allowance", label: "Allowance" },
    { value: "investments", label: "Investments" },
    { value: "others", label: "Others" },
  ];

  return (
    <IncomeFormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          id="date"
          name="date"
          type="date"
          required
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
          onInput={(e) => {
            limitTwoDP(e);
          }}
          onChange={(e) => {
            handleFormChange(e, "amount");
          }}
        />
      </div>
      <div className="submit-btn">
        <button type="submit">Add Income</button>
      </div>
    </IncomeFormStyled>
  );
}

const IncomeFormStyled = styled.form`
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
      color: var(--primary-color3);
      &:focus,
      $:active {
        color: var(--primary-color);
      }
    }
  }
`;

export default IncomeForm;
