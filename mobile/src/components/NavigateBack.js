import React from "react";
import { IconButton, useTheme } from "react-native-paper";

export default NavigateBack = ({ action }) => {
  const { text } = useTheme();
  const iconSize = 30;
  return (
    <IconButton
      icon="chevron-left"
      color={text.pageTitle.icons}
      size={iconSize}
      style={{ width: iconSize, height: iconSize }}
      onPress={action}
    />
  );
};
