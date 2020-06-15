// GET CEP API

// TOAST SE NAO ACHAR ENDEREÇO PELO CEP?

// TOAST QUANDO MANDAR PRA API

import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import axios from "axios";

const EditScreen = () => {
  const endpoint = "http://localhost:5000/usuarios";
  const [stateObject, setStateObject] = useState({
    nome: "",
    cpf: "",
    email: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
  });

  useEffect(() => {
    if (localStorage.getItem('stateObject')){
      setStateObject(JSON.parse(localStorage.getItem('stateObject')));
    }
  }, [])

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
  };

  const handleInputChange = (event) => {
    setStateObject({
      ...stateObject,
      [event.target.name]: event.target.value,
    });
  };

  const submitToApi = (e) => {
    e.preventDefault();
    axios
      .post(endpoint, objectData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    localStorage.setItem('stateObject', JSON.stringify(stateObject));
  };

  const preencherCep = () => {
    if (!/\d{8}/.test(stateObject.cep)){
      return null;
    }
    let cepEndpoint = `https://viacep.com.br/ws/${stateObject.cep}/json/`;
    axios
      .get(cepEndpoint, { crossdomain: true })
      .then((response) => {
        if (response.data.erro) {
          return null;
        }
        else {
          setStateObject({
            ...stateObject,
            rua: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade
          })
        }
      });
  };

  return (
    <div>
      <p>EDIT SCREEN</p>
      <form onSubmit={submitToApi}>
        <input
          placeholder="Nome"
          required
          type="text"
          name="nome"
          value={stateObject.nome}
          onChange={handleInputChange}
        ></input>
        <InputMask
          placeholder="CPF"
          required
          mask="999.999.999-99"
          name="cpf"
          value={stateObject.cpf}
          onChange={handleInputChange}
        ></InputMask>
        <input
          placeholder="E-mail"
          required
          type="email"
          name="email"
          value={stateObject.email}
          onChange={handleInputChange}
        ></input>
        <InputMask
          placeholder="CEP"
          required
          mask="99999999"
          name="cep"
          value={stateObject.cep}
          onBlur={(e) => {
            handleInputChange(e);
            if (stateObject.cep.length === 8){
            return preencherCep();
            }
          }}
          onChange={handleInputChange}
        ></InputMask>
        <input
          placeholder="Rua"
          required
          type="text"
          name="rua"
          value={stateObject.rua}
          onChange={handleInputChange}
        ></input>
        <InputMask
          placeholder="Número"
          required
          mask="9999"
          maskPlaceholder=''
          type="text"
          name="numero"
          value={stateObject.numero}
          onChange={handleInputChange}
        ></InputMask>
        <input
          placeholder="Bairro"
          required
          type="text"
          name="bairro"
          value={stateObject.bairro}
          onChange={handleInputChange}
        ></input>
        <input
          placeholder="Cidade"
          required
          type="text"
          name="cidade"
          value={stateObject.cidade}
          onChange={handleInputChange}
        ></input>
        <br />
        <button type="submit">SEND TO API</button>
      </form>
      {Object.keys(stateObject).map((key, i) => {
        return (
          <div key={i}>
            <p>{key.toLocaleUpperCase()}</p>{" "}
            <p>{stateObject[key].toLocaleUpperCase()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default EditScreen;
