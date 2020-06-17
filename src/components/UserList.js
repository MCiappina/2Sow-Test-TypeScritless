import React, { useState, useLayoutEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { toast, Flip } from "react-toastify";
import axios from "axios";

import loadingImg from "../resources/giphy.gif";
import editIcon from "../resources/editIcon.png";
import deleteIcon from "../resources/deleteIcon.png";
import useFullPageLoader from "../hooks/useFullPageLoader";

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const OutterWrapper = styled.div`
  margin: 0 auto;
  margin-top: 9vh;
  margin-bottom: 5vh;
  padding: 3vh 1vw;
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

const SearchInput = styled.input`
  margin: 0.7rem 0;
  border-radius: 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.dark};
  height: 3rem;
  text-align: center;
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1.2rem;
  padding: 1rem;
  border-top: 1px outset ${({ theme }) => theme.colors.dark};
  border-bottom: 1px outset ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.lighter};
    margin: 1rem;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1.2rem;
  padding: 1rem;
  border-top: 1px outset ${({ theme }) => theme.colors.dark};
  border-bottom: 1px outset ${({ theme }) => theme.colors.dark};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.dark};
  p {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem;
    border-left: 1px outset ${({ theme }) => theme.colors.text};
    border-right: 1px outset ${({ theme }) => theme.colors.text};
    margin: 0 2rem;
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.main};
  }
`;

const UserButtons = styled.button`
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  img {
    padding: 4px;
    width: 2rem;
    height: 2rem;
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.darker};
  }
`;

const UserList = () => {
  const endpoint = "http://localhost:5000/usuarios";
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useLayoutEffect(() => {
    setEdit(false);
    setTimeout(getApi(), 300);
    localStorage.removeItem("stateObject");
  }, [deleted]);

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
      toast.success(`✏️ You are editing ${data.nome}! `, {
        position: "bottom-right",
        autoClose: 2200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      localStorage.setItem("stateObject", JSON.stringify(data));
      setEdit(true);
    }
  };

  const handleDeletion = (itemId) => {
    setDeleted(true);
    showLoader();
    axios
      .delete(`${endpoint}/${itemId.id}`)
      .then((response) => {
        toast.error(`❗ You deleted ${itemId.nome}! `, {
          position: "bottom-right",
          autoClose: 2200,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        });
        hideLoader();
        setDeleted(false);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (event) => {
    const searchString = event.target.value;
    let timeout = null;
    clearTimeout(timeout);
    showLoader();
    timeout = setTimeout(() => {
      axios
        .get(endpoint, { params: { q: searchString } })
        .then((response) => {
          setUserList(response.data);
          hideLoader();
        })
        .catch((error) => console.log(error));
    }, 1000);
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <img alt="loading" src={loadingImg} />
      </LoadingWrapper>
    );
  } else {
    return (
      <OutterWrapper>
        {edit ? <Redirect to="/editscreen" /> : null}
        <Title>USER LIST</Title>
        <SearchInput onKeyUp={handleSearch} placeholder="SEARCH"></SearchInput>
        <TableWrapper>
          <h2>NOME</h2>
          <h2>CPF</h2>
          <h2>E-MAIL</h2>
          <h2>CIDADE</h2>
        </TableWrapper>
        {userList.map((e, i) => {
          return (
            <UserWrapper id={i} key={i}>
              <p>{e.nome}</p>
              <p>{e.cpf}</p>
              <p>{e.email}</p>
              <p>{e.endereco.cidade}</p>
              <UserButtons onClick={() => handleSelection(e)}>
                <img alt="edit" src={editIcon} />
              </UserButtons>
              <UserButtons onClick={() => handleDeletion(e)}>
                <img alt="edit" src={deleteIcon} />
              </UserButtons>
            </UserWrapper>
          );
        })}
        {loader}
      </OutterWrapper>
    );
  }
};

export default UserList;
