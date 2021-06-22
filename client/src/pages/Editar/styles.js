import styled from 'styled-components';

export const ConteudoUsuario = styled.p`
    color: #3e3e3e;
    font-size: 16px;
`;
export const ButtomWarningEdit = styled.button`
  width: 100%;
  max-width: 96px;
  background-color: #fff;
  color: #ffc107;
  padding: 5px 8px;
  border: 1px solid #ffc107;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  :hover {
    background-color: #ffc107;
    color: #fff;
    transition: 0.9s;
  }
  :disabled,
  [disabled] {
    border: 1px solid #ffc107;
    background-color: #fff;
    color: #ffc107;
  }
`;
