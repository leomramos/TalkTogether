import Styled from "styled-components/native";

export default CustomText = Styled.Text`
  font-family: ${({ base }) => base.font};
  font-size: ${({ base }) => base.size};
  color: ${({ base }) => base.color};
`;
