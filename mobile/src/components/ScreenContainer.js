import { KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Styled from "styled-components/native";

const ScreenWrapper = Styled(SafeAreaView)`
  flex: 1;
  padding-left: ${({ screen }) => screen.padding.left}px;
  padding-right: ${({ screen }) => screen.padding.right}px;
  justify-content: flex-end;
`;

export default ScreenContainer = props => {
  const { screen, colors } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <ScreenWrapper
        screen={screen}
        style={{
          backgroundColor: props.background || colors.gray.second,
        }}
      >
        {props.children}
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};
