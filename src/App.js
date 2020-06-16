import React, { useState, useEffect} from "react";
import styled from 'styled-components';
import { Switch, Route, Redirect} from "react-router-dom";

import Login from "./components/Login";
import UserList from "./components/UserList";
import EditScreen from "./components/EditScreen";
import Navbar from "./components/Navbar";

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    }
  }, []);

  const MainWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.main};
`;

  const authToken = () => Math.random().toString(36).substr(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", JSON.stringify(authToken()));
    setAuth(true);
  };

  const handleLogout = () => {
    setAuth(false);
    localStorage.clear();
  };

  if (!auth) {
    return (
      <MainWrapper>
        <Navbar handleLogout={handleLogout} />
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => <Login handleSubmit={handleSubmit} />}
          />
          <Redirect to='/' />
        </Switch>
      </MainWrapper>
    );
  } else {
    return (
      <MainWrapper>
        <Navbar handleLogout={handleLogout} />
        <Redirect to='/userlist' />
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => <Login handleSubmit={handleSubmit} />}
          />
          <Route path="/userlist" component={UserList} />
          <Route path="/editscreen" component={EditScreen} />
        </Switch>
      </MainWrapper>
    );
  }
};

export default App;
