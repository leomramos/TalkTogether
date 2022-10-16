import React from "react";
import { Image } from "react-native";
import { useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import { BlackOpacity } from "../utils/graphical";
import OnlineIcon from "./OnlineIcon";

const Container = Styled.View`
  border-radius: 100%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  border-radius: ${({ size }) => size * 2}px;
  padding: 2px;
  position: relative;
  margin-right: 16px;
`;

export default UserAvatar = ({
  size = 48,
  src = require("../../assets/user-avatar-1.png"),
  color = "",
  background = "",
  offline = false,
  focused = true,
  // flag = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.opovo.com.br%2F_midias%2Fjpg%2F2020%2F10%2F05%2F750x500%2F1_bandeira_do_brasil_300dpi-13718529.jpg&f=1&nofb=1&ipt=aedc272207e3b366ad03dd290a11199c384cb1c0885e5355c7f23d5bd4e8a86a&ipo=images",
  flag = "",
}) => {
  const { colors } = useTheme();

  return (
    <Container size={size} color={background || colors.avatar.white}>
      {!focused && <BlackOpacity radius={size * 2} />}
      <Image
        blurRadius={offline ? 10 : 0}
        source={src}
        resizeMode="contain"
        alt={"User avatar"}
        style={{
          width: "100%",
          maxHeight: "90%",
        }}
      />
      {!offline && (
        <OnlineIcon
          size={size}
          colors={colors}
          flag={flag}
          background={background}
        />
      )}
    </Container>
  );
};
