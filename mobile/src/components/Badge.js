import Styled from "styled-components/native";

export default Badge = Styled.View`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  margin-left: 5px;
`;
