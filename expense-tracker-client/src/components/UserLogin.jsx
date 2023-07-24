import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./auth/AuthProvider";
import { styled } from "styled-components";
import COVER_IMAGE from "../img/loginCoverPage.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { loginSuccess } = useContext(AuthContext);

  // create state to store form data
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});

  const handleFormChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://expense-tracker-bzs3.onrender.com/api/users/login", formData)
      .then((response) => {
        console.info(">>> login user response: ", response);
        loginSuccess(response.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(">>> login user error: ", err);
        setError(err.message);
        window.alert(err.message);
      });
  };

  return (
    <LoginStyled>
      <div className="image-container">
        <img src={COVER_IMAGE} alt="" />
      </div>
      <div className="login-container">
        <div className="form-container">
          <h3>
            Unlock your potential & attain financial freedom with our proven
            system
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  handleFormChange(e, "email");
                }}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  handleFormChange(e, "password");
                }}
              />
              <div className="btn-container">
                <button type="submit">Login</button>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LoginStyled>
  );
}
const LoginStyled = styled.div`
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

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10%;
    width: 25em;
    height: 25em;
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
