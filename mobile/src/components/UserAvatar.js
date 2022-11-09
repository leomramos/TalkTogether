import * as Device from "expo-device";
import React from "react";
import { Image, View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import i18n from "../i18n";
import { BlackOpacity, Row } from "./Helpers";
import OnlineIcon from "./OnlineIcon";

const Container = Styled(Row)`
  border-radius: 100%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  justify-content: center;
  align-items: flex-end;
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
  plain = false,
  onPress = null,
}) => {
  const { colors } = useTheme();
  const src = require("../../assets/user-avatar-1.png");

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <View
        style={{
          borderRadius: size * 2,
          overflow: "hidden",
        }}
      >
        <TouchableRipple
          onPress={onPress}
          rippleColor="black"
          underlayColor="black"
          style={{ backgroundColor: color || colors.avatar.white }}
        >
          <Container size={size}>
            {!focused && <BlackOpacity radius={size * 2} />}
            <Image
              blurRadius={
                offline ? (Device.osName === "Android" ? 10 : 2.5) : 0
              }
              source={src}
              resizeMode="contain"
              alt={i18n.t("userAvatar")}
              style={{
                width: "100%",
                maxHeight: "90%",
              }}
            />
          </Container>
        </TouchableRipple>
      </View>
      {!offline && !plain && (
        <OnlineIcon size={size} flag={flag} background={background} />
      )}
    </View>
  );
};
