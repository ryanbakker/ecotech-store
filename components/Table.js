import { styled } from "styled-components";

const StyledTable = styled.table`
  font-family: "Inter", sans-serif;
  width: 100%;

  th {
    text-align: left;
    text-transform: uppercase;
    color: #aaaaaa;
    font-weight: 400;
    font-size: 0.9em;
  }

  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
