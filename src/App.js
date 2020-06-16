import React, { useState, useEffect} from "react";
import { Switch, Route, Redirect, useHistory  } from "react-router-dom";

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

  const authToken = () => Math.random().toString(36).substr(2);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", JSON.stringify(authToken()));
    setAuth(true);
    history.push('/userlist')
  };

  const handleLogout = () => {
    setAuth(false);
    localStorage.clear();
  };

  if (!auth) {
    return (
      <div>
        <Navbar handleLogout={handleLogout} />
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => <Login handleSubmit={handleSubmit} />}
          />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  } else {
    return (
      <div>
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
      </div>
    );
  }
};

export default App;
