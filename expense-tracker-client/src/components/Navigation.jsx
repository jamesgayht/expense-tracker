import { styled } from "styled-components";
import avatar from "../img/grIcon.png";
import { menuItems } from "../utils/menuitems";
import { logout } from "../utils/icons";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthProvider";

function Navigation({ active, setActive }) {
  const { logoutSuccess, getUserFromToken } = useContext(AuthContext);
  const user = getUserFromToken();

  return (
    <NavStyled>
      <div className="user-container">
        <img src={avatar} alt="" />
        <div className="text">{user ? <h2>{user.name}</h2> : ""}</div>
      </div>

      {/* menu items */}
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                setActive(item.id);
              }}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <li onClick={logoutSuccess}>{logout} Log Out</li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 254px;
  height: 100%;
  background: rgba(252, 246, 249, 0.76);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-container {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background-color: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.86);

      h2 {
        color: var(--primary-color);
      }

      p {
        color: var(--primary-color2);
      }
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  li {
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;
    margin: 0.6rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: var(--primary-color2);
    padding-left: 1rem;
    position: relative;

    i {
      color: var(--primary-color2);
      font-size: 1.4rem;
      transition: all 0.4s ease-in-out;
    }
  }

  .active {
    color: var(--primary-color);
    i {
      color: var(--primary-color);
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation;
