import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import Styled from "styled-components/native";

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
}) => {
  return (
    <View>
      <Avatar.Image
        size={size}
        source={src}
        style={{ backgroundColor: color }}
      />
    </View>
  );
};
