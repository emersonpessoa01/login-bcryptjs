//Criar um css global
import styled from "styled-components";

export const Container = styled.section`
  margin: 0px auto;
  width: 960px;
  max-width: 960px;
`;

export const ConteudoTitulo = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const Titulo = styled.h1`
  font-size: 23px;
  font-family: sans-serif;
  margin: 10px 15px;
  color: #1d1e1e;
`;

export const BotaoAcao = styled.section`
  margin: 5px;
`;

export const ButtonSuccess = styled.button`
  background-color: #fff;
  color: #198754;
  padding: 5px 8px;
  border: 1px solid #198754;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  :hover {
    background-color: #198754;
    color: #fff;
  }
  transition: 0.9s;
`;

export const Table = styled.table`
  width: 100%;
  th{
    background-color: #e5e5e5;
    color: #3e3e3e;
    padding: 10px;
  }
  td{
    background-color: #f6f6f6;
    color: #3e3e3e;
    padding: 8px;
  }
`;

export const AlertDanger = styled.p`
  background-color: #f8d7da;
  color: #842029;
  margin: 20px 0;
  border: 1px solid #f5c2c7;
  border-left: 1px solid #842029;
  border-radius: 4px;
  padding: 7px;

`;

export const AlertSuccess = styled.p`
  background-color: #d1e7dd;
  color: #0f5132;
  margin: 20px 0;
  border: 1px solid #badbcc;
  border-left: 1px solid #0f5132;
  border-radius: 4px;
  padding: 7px;
`;
