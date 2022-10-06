import React from "react";
import { Text, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";

export default TabScreen = ({ title, ...props }) => {
  return (
    <ScreenContainer>
      <Text>{title}</Text>
      {props.children}
    </ScreenContainer>
  );
};
