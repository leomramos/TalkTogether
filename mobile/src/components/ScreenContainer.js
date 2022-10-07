import React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Styled from "styled-components/native";

const ScreenWrapper = Styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ colors }) => colors.background};
  padding-left: ${({ screen }) => screen.paddingLeft};
  padding-right: ${({ screen }) => screen.paddingRight};
`;

export default ScreenContainer = props => {
  const { screen, colors } = useTheme();
  return (
    <ScreenWrapper screen={screen} colors={colors}>
      {props.children}
    </ScreenWrapper>
  );
};
