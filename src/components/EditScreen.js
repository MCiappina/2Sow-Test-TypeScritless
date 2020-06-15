// TOAST SE NAO ACHAR ENDEREÇO PELO CEP?

// TOAST QUANDO MANDAR PRA API E QUANDO EDITAR DENTRO DO .THEN

// ESTILIZAR PARA UPPERCASE

import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import { Redirect } from "react-router";

const EditScreen = () => {
  const endpoint = "http://localhost:5000/usuarios";
  const [stateObject, setStateObject] = useState({
    nome: "",
    cpf: "",
    email: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    id: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setSent(false);
    if (localStorage.getItem("stateObject")) {
      const info = JSON.parse(localStorage.getItem("stateObject"));
      setStateObject(info);
    }
  }, []);

  const objectData = {
    nome: stateObject.nome,
    cpf: stateObject.cpf,
    email: stateObject.email,
    endereco: {
      cep: parseInt(stateObject.cep),
      rua: stateObject.rua,
      numero: parseInt(stateObject.numero),
      bairro: stateObject.bairro,
      cidade: stateObject.cidade,
    },
    id: stateObject.id,
  };

  const handleInputChange = (event) => {
    setStateObject({
      ...stateObject,
      [event.target.name]: event.target.value,
    });
  };

  const putToApi = (e) => {
    e.preventDefault();
    axios
    .put(`${endpoint}/${stateObject.id}`, objectData)
    .then(() => setSent(true))
    .catch((error) => console.log(error));
  };

  const submitToApi = (e) => {
    e.preventDefault();
    axios
    .post(endpoint, objectData)
    .then(() => setSent(true))
    .catch((error) => console.log(error));
  };

  const preencherCep = () => {
    if (!/\d{8}/.test(stateObject.cep)) {
      return null;
    }
    let cepEndpoint = `https://viacep.com.br/ws/${stateObject.cep}/json/`;
    axios.get(cepEndpoint, { crossdomain: true }).then((response) => {
      if (response.data.erro) {
        return null;
      } else {
        setStateObject({
          ...stateObject,
          rua: response.data.logradouro,
          bairro: response.data.bairro,
          cidade: response.data.localidade,
        });
      }
    });
  };

  return (
    <div>
      {sent ? <Redirect to="/userlist" /> : null}
      <p>EDIT SCREEN</p>
      <form onSubmit={localStorage.getItem('stateObject') ? putToApi : submitToApi}>
        <input
          placeholder="Nome"
          required
          value={stateObject.nome}
          type="text"
          name="nome"
          onChange={handleInputChange}
        ></input>
        <InputMask
          placeholder="CPF"
          required
          value={stateObject.cpf}
          mask="999.999.999-99"
          name="cpf"
          onChange={handleInputChange}
        ></InputMask>
        <input
          placeholder="E-mail"
          required
          value={stateObject.email}
          type="email"
          name="email"
          onChange={handleInputChange}
        ></input>
        <InputMask
          placeholder="CEP"
          required
          mask="99999999"
          value={String(stateObject.cep)}
          name="cep"
          onBlur={(e) => {
            handleInputChange(e);
            if (stateObject.cep.length === 8) {
              return preencherCep();
            }
          }}
          onChange={handleInputChange}
        ></InputMask>
        <input
          placeholder="Rua"
          required
          value={stateObject.rua}
          type="text"
          name="rua"
          onChange={handleInputChange}
        ></input>
        <InputMask
          placeholder="Número"
          required
          mask="9999"
          value={String(stateObject.numero)}
          maskPlaceholder=""
          type="text"
          name="numero"
          onChange={handleInputChange}
        ></InputMask>
        <input
          placeholder="Bairro"
          required
          value={stateObject.bairro}
          type="text"
          name="bairro"
          onChange={handleInputChange}
        ></input>
        <input
          placeholder="Cidade"
          required
          value={stateObject.cidade}
          type="text"
          name="cidade"
          onChange={handleInputChange}
        ></input>
        <br />
        <button type="submit">SEND TO API</button>
      </form>
      {Object.keys(stateObject).map((key, i) => {
        if (i === Object.keys(stateObject).length - 1) {
          return null;
        }
        return (
          <div key={i}>
            <p>{key}</p> <p>{stateObject[key]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default EditScreen;
