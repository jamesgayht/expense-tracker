import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import COVER_IMAGE from "../img/loginCoverPage.jpg";

export default function Register() {
  const navigate = useNavigate();

  // create state to store form data
  const [formData, setFormData] = useState({});

  const handleFormChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://expense-tracker-bzs3.onrender.com/api/users/register", formData)
      .then((response) => {
        console.info(">>> register user response: ", response);
        navigate("/login");
      })
      .catch((error) => {
        console.error(">>> register user error: ", error);
      });
  };

  return (
    <RegisterStyled>
      <div className="image-container">
        <img src={COVER_IMAGE} alt="" />
      </div>

      <div className="register-container">
        <div className="form-container">
          <h3>Be your own boss and take control of your destiny</h3>

          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                onChange={(e) => {
                  handleFormChange(e, "name");
                }}
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                  handleFormChange(e, "email");
                }}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  handleFormChange(e, "password");
                }}
              />
              <div>
                <button type="submit">Register</button>
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </RegisterStyled>
  );
}

const RegisterStyled = styled.div`
  .image-container {
    position: absolute;
    display: flex;
    overflow: auto;
    z-index: -1;
    img {
      height: 100vh;
      width: 100vw;
      opacity: 0.5;
      z-index: -1;
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    input {
      border: none;
      height: 4em;
      width: ;
      margin-bottom: 2em;
      text-align: center;
      border-radius: 0.25em;
      padding: 2em;
      font: inherit;
    }

    button {
      margin: 0 1em;
    }
  }

  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8%;
    width: 25em;
    height: 27em;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    border-radius: 1em;
    box-shadow: 0 0.188em 1.55em rgb(156, 156, 156);
    padding: 1rem;
    z-index: 1;
    justify-content: space-evenly;
  }

  h3 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 1em;
  }
`;
