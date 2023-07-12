import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      .post("http://localhost:3000/api/users/register", formData)
      .then((response) => {
        console.info(">>> register user response: ", response);
        navigate("/login");
      })
      .catch((error) => {
        console.error(">>> register user error: ", error);
      });
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => {
              handleFormChange(e, "name");
            }}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
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
        {/* <div>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => {
              handleFormChange(e, "confirmPassword");
            }}
          />
        </div> */}
        <div>
            <button type="submit" >Register</button>
            <button onClick={() => {
              navigate(-1)
            }} >Back</button>
        </div>
      </form>
    </div>
  );
}
