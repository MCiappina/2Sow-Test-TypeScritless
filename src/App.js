// TENTAR COM MAP IGUAL O CODIGO DO CONE VITO

import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import UserList from "./components/UserList";
import EditScreen from "./components/EditScreen";
import Navbar from "./components/Navbar";

const App = () => {
  const [auth, setAuth] = useState(false);

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    }
  }, []);

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => <Login handleSubmit={handleSubmit} />}
        />
        {auth ? (
          <Switch>
            <Route path="/userlist" component={UserList} />
            <Route path="/editscreen" component={EditScreen} />
          </Switch>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
      {auth ? <Redirect to="/userlist" /> : <Redirect to="/" />}
    </div>
  );
};

export default App;
