import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./auth/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { loginSuccess } = useContext(AuthContext);

  // create state to store form data
  const [formData, setFormData] = useState({});

  const handleFormChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/login", formData)
      .then((response) => {
        console.info(">>> login user response: ", response);
        loginSuccess(response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.error(">>> login user error: ", error);
      });
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => {
              handleFormChange(e, "email");
            }}
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              handleFormChange(e, "password");
            }}
          />
        </div>
        <div>
          <button type="submit">Login</button>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
