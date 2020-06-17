import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100vw;
  height: 5.5vh;
  display: flex;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  border-bottom: 1px outset ${({ theme }) => theme.colors.dark};
  font-size: 1.5rem;
  @media (max-width: 1720px) {
    font-size: 1rem;
  }
`;

const NavLink = styled.div`
  width: 20%;
  a {
    text-decoration: none;
    margin: 0 2rem;
    padding: 0 2rem;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: bold;
  }
  @media (max-width: 1720px) {
    font-size: 1.3rem;
    width: 25%;
  }
  @media (max-width: 1265px) {
    font-size: 1.3rem;
    width: 35%;
  }
  @media (max-width: 905px) {
    font-size: 1rem;
    width: 45%;
    a {
      padding: 1rem;
    }
  }
  @media (max-width: 620px) {
    font-size: 0.9rem;
    width: 50%;
    a {
      padding: 0;
    }
  }
  @media (max-width: 380px) {
    font-size: 0.9rem;
    width: 50%;
    a {
      padding: 0.2rem;
      margin: 0.1rem;
    }
  }
`;

const LogoutContainer = styled.div`
  width: 20%;
  @media (max-width: 1720px) {
    font-size: 1.3rem;
    width: 25%;
  }
  @media (max-width: 1265px) {
    font-size: 1.3rem;
    width: 35%;
  }
  @media (max-width: 905px) {
    font-size: 1rem;
    width: 45%;
  }
  @media (max-width: 620px) {
    font-size: 0.7rem;
    width: 50%;
  }
`;

const LogoutButton = styled.button`
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.light};
  border: 0.2rem solid ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.lighter};
  cursor: pointer;
  @media (max-height: 770px) {
    font-size: 1rem;
    padding: 0.7rem 1.5rem;
  }
`;

const TitleSeeds = styled.h1`
  font-weight: bold;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.dark};
  @media (max-width: 1720px) {
    font-size: 2.3rem;
  }
  @media (max-width: 905px) {
    font-size: 1.3rem;
  }
  @media (max-width: 620px) {
    display: none;
  }
`;

const Navbar = ({ handleLogout }) => {
  return (
    <Nav>
      <NavLink>
        <Link to="/userlist">USER LIST</Link>|
        <Link to="/editscreen">EDIT SCREEN</Link>
      </NavLink>
      <TitleSeeds>
        <span role="img" aria-label="seed">
          🌱
        </span>{" "}
        seedS
      </TitleSeeds>
      <LogoutContainer>
        <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
      </LogoutContainer>
    </Nav>
  );
};

export default Navbar;
