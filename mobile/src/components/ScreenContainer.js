import React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Styled from "styled-components/native";

const ScreenWrapper = Styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ colors }) => colors.gray.eigth};
  padding-left: ${({ screen }) => screen.padding.left};
  padding-right: ${({ screen }) => screen.padding.right};
`;

export default ScreenContainer = props => {
  const { screen, colors } = useTheme();
  return (
    <ScreenWrapper screen={screen} colors={colors}>
      {props.children}
    </ScreenWrapper>
  );
};
