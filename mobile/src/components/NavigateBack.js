import React from "react";
import { IconButton, useTheme } from "react-native-paper";

export default NavigateBack = ({ action }) => {
  const { colors } = useTheme();
  const iconSize = 30;
  return (
    <IconButton
      icon="chevron-left"
      color={colors.gray.seventh}
      size={iconSize}
      style={{ width: iconSize, height: iconSize }}
      onPress={action}
    />
  );
};
