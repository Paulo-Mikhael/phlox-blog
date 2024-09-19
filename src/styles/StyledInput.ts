import styled from "styled-components";

export const StyledInput = styled.input`
  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator { //Tira do ícone de calendário do input de data
    display: none;
  }
`;
