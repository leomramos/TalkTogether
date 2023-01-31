import { Image, Platform, View } from "react-native";
import { IconButton, TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import avatars from "../../assets/avatars";
import { BlackOpacity, Row } from "./Helpers";
import OnlineIcon from "./OnlineIcon";

import i18n from "../i18n";

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
  editable = false,
  editingPic = false,
}) => {
  const { colors } = useTheme();

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
          opacity: editable && !editingPic ? 0.4 : 1,
        }}
      >
        <TouchableRipple
          onPress={!editingPic && onPress}
          rippleColor="black"
          underlayColor="black"
          style={{
            backgroundColor: colors.avatar[color] || colors.avatar.white,
            position: "relative",
          }}
        >
          <Container size={size}>
            {!focused && <BlackOpacity radius={size * 2} />}
            <Image
              blurRadius={
                offline && !plain ? (Platform.OS === "ios" ? 2.5 : 10) : 0
              }
              source={avatars[(avatar || 1) - 1]}
              resizeMode="contain"
              alt={i18n.t("userAvatar")}
              style={{
                width: "80%",
                maxHeight: "90%",
              }}
            />
          </Container>
        </TouchableRipple>
      </View>
      {!offline && !plain && (
        <OnlineIcon size={size} flag={flag} background={background} />
      )}
      {editable && (
        <IconButton
          icon={editingPic ? "checkbox-marked-outline" : "square-edit-outline"}
          animated
          size={25}
          color={colors.gray.ninth}
          style={{ position: "absolute", right: -13, top: -13 }}
          onPress={onPress}
        />
      )}
    </View>
  );
};
