import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Styled from "styled-components/native";

const ScreenWrapper = Styled(SafeAreaView)`
  flex: 1;
  padding-left: ${({ screen }) => screen.padding.left}px;
  padding-right: ${({ screen }) => screen.padding.right}px;
`;

export default ScreenContainer = props => {
  const { screen, colors } = useTheme();
  return (
    <ScreenWrapper
      screen={screen}
      style={{
        backgroundColor: props.background || colors.gray.second,
      }}
    >
      {props.children}
    </ScreenWrapper>
  );
};
