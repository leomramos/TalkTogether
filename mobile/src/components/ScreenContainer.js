import React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default ScreenContainer = props => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      {props.children}
    </SafeAreaView>
  );
};
