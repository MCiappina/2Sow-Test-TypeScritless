// TOAST YOU ARE EDITING??

// BUSCA

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const endpoint = "http://localhost:5000/usuarios";
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setEdit(false);
    getApi();
    localStorage.removeItem("stateObject");
  }, [loading]);

  const getApi = () => {
    axios
      .get(endpoint)
      .then((response) => {
        setUserList(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleSelection = (item) => {
    if (Object.getOwnPropertyNames(item).length > 0) {
      const data = {
        nome: item.nome,
        cpf: item.cpf,
        email: item.email,
        cep: item.endereco.cep,
        rua: item.endereco.rua,
        numero: item.endereco.numero,
        bairro: item.endereco.bairro,
        cidade: item.endereco.cidade,
      };
      localStorage.setItem("stateObject", JSON.stringify(data));
      setEdit(true);
    } else {
      alert("SELECT SOMEONE");
    }
  };

  const handleDeletion = (itemId) => {
    console.log(itemId);
    axios.delete(`${endpoint}/${itemId.id}`).then((response) => {
      console.log(response);
      setLoading(true);
    });
  };

  return (
    <div>
      {edit ? <Redirect to="/editscreen" /> : null}
      <p>USER LIST</p>
      {userList.map((e, i) => {
        return (
          <div id={i} key={i}>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.nome}</p>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.cpf}</p>
            <p style={{ display: "inline-block", margin: "20px" }}>{e.email}</p>
            <p style={{ display: "inline-block", margin: "20px" }}>
              {e.endereco.cidade}
            </p>
            <button
              onClick={ async () => {
                const argument = (item) => {
                  setSelectedUser(e);
                  return new Promise((resolve) =>  resolve(item))
                }
                let x = await argument(e);
                console.log(x);
                let highlight = document.getElementById(i);
                highlight.style.backgroundColor = 'red';
                handleSelection(x);
              }}
            >
              EDIT ME
            </button>
            <button onClick={() => handleDeletion(e)}>DELETE ME</button>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
