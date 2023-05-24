import { styled } from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background-color: #eee;
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
