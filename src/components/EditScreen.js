import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import styled from "styled-components";
import { toast, Flip } from "react-toastify";
import { Redirect } from "react-router";

import useFullPageLoader from "../hooks/useFullPageLoader";

const OutterWrapper = styled.div`
  margin: 0 auto;
  margin-top: 13vh;
  padding: 0 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: 5rem;
  background: ${({ theme }) => theme.colors.light};
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.lighter};
`;

const Form = styled.form`
  margin-bottom: 3rem;
  width: 40%;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 1rem;
  input {
    margin: 0.5rem 0;
    border-radius: 0.5rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.dark};
    height: 3rem;
    outline: none;
    text-align: center;
  }
`;
const SubmitButton = styled.button`
  margin: 0 auto;
  margin-top: 2rem;
  height: 5rem;
  width: 70%;
  text-align: center;
  border-radius: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.dark};
  font-size: 2rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.darker};
    color: ${({ theme }) => theme.colors.light};
  }
`;

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
  const [loader, showLoader, hideLoader] = useFullPageLoader();

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
    showLoader();
    axios
      .put(`${endpoint}/${stateObject.id}`, objectData)
      .then(() => {
        hideLoader();
        setSent(true);
        toast.success(`🌻 You edited ${objectData.nome}! `, {
          position: "bottom-right",
          autoClose: 2200,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        });
      })
      .catch((error) => console.log(error));
  };

  const submitToApi = (e) => {
    showLoader();
    e.preventDefault();
    axios
      .post(endpoint, objectData)
      .then(() => {
        setSent(true);
        hideLoader();
        toast.success(`🌻 You submitted ${objectData.nome}! `, {
          position: "bottom-right",
          autoClose: 2200,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        });
      })
      .catch((error) => console.log(error));
  };

  const preencherCep = () => {
    if (!/\d{8}/.test(stateObject.cep)) {
      return null;
    }
    let cepEndpoint = `https://viacep.com.br/ws/${stateObject.cep}/json/`;
    axios
      .get(cepEndpoint, { crossdomain: true })
      .then((response) => {
        if (response.data.erro) {
          toast.error(`😵 Esse não é um CEP válido! `, {
            position: "bottom-right",
            autoClose: 2200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Flip,
          });
          return null;
        } else {
          setStateObject({
            ...stateObject,
            rua: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <OutterWrapper>
      {sent ? <Redirect to="/userlist" /> : null}
      <Title>EDIT SCREEN</Title>
      <Form
        onSubmit={localStorage.getItem("stateObject") ? putToApi : submitToApi}
      >
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
        <SubmitButton type="submit">SEND!</SubmitButton>
      </Form>
      {loader}
    </OutterWrapper>
  );
};

export default EditScreen;
