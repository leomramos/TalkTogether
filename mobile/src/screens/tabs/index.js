import React from "react";
import { Text, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";

export default TabScreen = ({ title, ...props }) => {
  console.log(title);
  return (
    <ScreenContainer>
      <Text>{title}</Text>
      {props.children}
    </ScreenContainer>
  );
};
