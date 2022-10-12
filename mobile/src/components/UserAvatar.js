import React from "react";
import { Text, View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import Styled from "styled-components/native";

const Circle = Styled.View`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  /* border: ${({ size }) => size / 6}px solid ${({ outerColor }) =>
  outerColor || "transparent"}; */
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
  color = "",
  background = "",
}) => {
  const { colors } = useTheme();

  return (
    <View>
      <Avatar.Image
        size={size}
        source={src}
        style={{ backgroundColor: color || colors.avatar.white }}
      />
      <Circle
        size={(7 * size) / 20}
        color={background || colors.gray.second}
        style={{ position: "absolute", bottom: 0, right: 0 }}
      >
        <Circle
          size={size / 4}
          color={color || colors.purple.fifth}
          outerColor={background || colors.gray.second}
        >
          <Circle
            size={size / 9}
            color={background || colors.gray.second}
          ></Circle>
        </Circle>
      </Circle>
    </View>
  );
};
