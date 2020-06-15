// INTERAÇAO ENTRE O SELECTED USER E A EDIT SCREEN. LOCAL STORAGE??

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const endpoint = "http://localhost:5000/usuarios";
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getApi();
    localStorage.removeItem("stateObject");
  }, []);

  const getApi = () => {
    axios
      .get(endpoint)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p>USER LIST</p>
      {userList.map((e, i) => {
        return (
          <div key={i}>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.nome}</p>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.cpf}</p>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.email}</p>
            <button onClick={() => setSelectedUser(e)}>SELECT</button>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
