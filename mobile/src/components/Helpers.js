import Styled from "styled-components/native";

export const Row = Styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BlackOpacity = Styled.View`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 0.4;
  z-index: 1000;
  border-radius: ${({ radius }) => radius || 0}px;
`;
