import Styled from "styled-components/native";

export const BlackOpacity = Styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.4;
  z-index: 1000;
  border-radius: ${({ radius }) => radius || 0}px;
`;
