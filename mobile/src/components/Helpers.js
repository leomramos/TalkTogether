import Styled from "styled-components/native";

export const Row = Styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BlackOpacity = Styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: ${({ opacity }) => opacity || 0.5};
  z-index: 1000;
  border-radius: ${({ radius }) => radius || 0}px;
`;
