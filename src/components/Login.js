import React, { useState } from "react";
import styled from "styled-components";
import seedsGif from "../resources/seeds2.gif";

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.darker};
`;

const Wrapper = styled.div`
  width: 25%;
  margin: 15vh auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.light};
  background-image: url(${seedsGif});
  background-size: cover;
  color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
  padding: 5rem;
  margin-top: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
`;

const Label = styled.label`
  margin: 0.5rem 0;
  font-size: 2rem;
`;

const Input = styled.input`
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.dark};
  height: 3rem;
  outline: none;
  text-align: center;
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

const Login = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Wrapper>
      <Title>LOGIN</Title>
      <Form onSubmit={handleSubmit}>
        <Label>E-mail</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          value={email}
          required
        ></Input>
        <Label>Password</Label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          minLength="4"
          value={password}
          required
        ></Input>
        <SubmitButton type="submit">SUBMIT!</SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default Login;
