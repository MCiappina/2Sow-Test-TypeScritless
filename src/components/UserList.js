// INTERAÇAO ENTRE O SELECTED USER E A EDIT SCREEN. LOCAL STORAGE??

// TOAST YOU ARE EDITING??

import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";

const UserList = () => {
  const endpoint = "http://localhost:5000/usuarios";
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setEdit(false);
    setTimeout(getApi, 300);
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

  const handleSelection = () => {
    if (Object.getOwnPropertyNames(selectedUser).length > 0) {
      const data = {
        nome: selectedUser.nome,
        cpf: selectedUser.cpf,
        email: selectedUser.email,
        cep: selectedUser.endereco.cep,
        rua: selectedUser.endereco.rua,
        numero: selectedUser.endereco.numero,
        bairro: selectedUser.endereco.bairro,
        cidade: selectedUser.endereco.cidade,
      };
      localStorage.setItem("stateObject", JSON.stringify(data));
      setEdit(true);
    } else {
      alert("SELECET SOMEONE");
    }
  };

  return (
    <div>
      {edit ? <Redirect to='/editscreen'/> : null}
      <p>USER LIST</p>
      <button onClick={handleSelection}>EDIT THE SELECTION</button>
      {userList.map((e, i) => {
        return (
          <div key={i}>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.nome}</p>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.cpf}</p>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.email}</p>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.endereco.cidade}</p>
            <button onClick={() => setSelectedUser(e)}>SELECT</button>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
