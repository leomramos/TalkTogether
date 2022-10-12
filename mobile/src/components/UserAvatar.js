import React from "react";
import { Text, View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import Styled from "styled-components/native";

const Circle = Styled.View`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ outerColor }) => outerColor};
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

const Container = Styled.View`
  border-radius: 100%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
`;

export default UserAvatar = ({
  size = 58,
  src = require("../../assets/user-avatar-1.png"),
  color = "black",
  background = "",
}) => {
  const { colors } = useTheme();

  return (
    <View>
      <Avatar.Image
        size={size}
        source={src}
        style={{ backgroundColor: color }}
      />
      <Circle
        size={25}
        color="red"
        style={{ position: "absolute", bottom: 0, right: 0 }}
        outerColor={background || colors.gray.second}
      >
        <Circle size={15} color={background || colors.gray.second}></Circle>
      </Circle>
    </View>
  );
};
