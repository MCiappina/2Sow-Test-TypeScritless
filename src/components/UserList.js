// TOAST VOCÊ DELETOU

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const endpoint = "http://localhost:5000/usuarios";
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setEdit(false);
    setTimeout(getApi(), 300);
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
        id: item.id,
      };
      localStorage.setItem("stateObject", JSON.stringify(data));
      setEdit(true);
    }
  };

  const handleDeletion = (itemId) => {
    axios.delete(`${endpoint}/${itemId.id}`).then((response) => {
      setLoading(true);
    });
  };

  const handleSearch = (event) => {
    const searchString = event.target.value;
    let timeout = null;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      axios
      .get(endpoint, { params: { q: searchString } })
      .then((response) => setUserList(response.data))
      .catch((error) => console.log(error));
    }, 1000)
  };

  return (
    <div>
      {edit ? <Redirect to="/editscreen" /> : null}
      <p>USER LIST</p>
      <input onKeyUp={handleSearch} placeholder="SEARCH"></input>
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
              onClick={async () => {
                const argument = (item) => {
                  return new Promise((resolve) => resolve(item));
                };
                let x = await argument(e);
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
