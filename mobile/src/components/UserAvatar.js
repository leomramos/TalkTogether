import * as Device from "expo-device";
import React from "react";
import { Image } from "react-native";
import { useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import i18n from "../i18n";
import { BlackOpacity, Row } from "./Helpers";
import OnlineIcon from "./OnlineIcon";

const Container = Styled(Row)`
  border-radius: 100%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: flex-end;
  border-radius: ${({ size }) => size * 2}px;
  padding: 2px;
  position: relative;
`;

export default UserAvatar = ({
  size = 48,
  avatar = 1,
  color = "",
  background = "",
  offline = false,
  focused = true,
  flag = "",
}) => {
  const { colors } = useTheme();
  const src = require("../../assets/user-avatar-1.png");

  return (
    <Container size={size} color={color || colors.avatar.white}>
      {!focused && <BlackOpacity radius={size * 2} />}
      <Image
        blurRadius={offline ? (Device.osName === "Android" ? 10 : 2.5) : 0}
        source={src}
        resizeMode="contain"
        alt={i18n.t("userAvatar")}
        style={{
          width: "100%",
          maxHeight: "90%",
        }}
      />
      {!offline && (
        <OnlineIcon size={size} flag={flag} background={background} />
      )}
    </Container>
  );
};
