import Styled from "styled-components/native";

export default CustomText = Styled.Text`
  font-family: ${({ type }) => type.font};
  font-size: ${({ type }) => type.size.number + type.size.unit};
  color: ${({ color }) => color};
`;
