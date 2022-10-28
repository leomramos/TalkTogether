import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Divider,
  IconButton,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Styled from "styled-components/native";
import CustomText from "./CustomText";
import { Row } from "./Helpers";
import NavigateBack from "./NavigateBack";
import OverlayMenu from "./OverlayMenu";
import UserAvatar from "./UserAvatar";

import i18n from "../i18n";

const HeaderWrapper = Styled(Row)`
  margin-left: -${({ screen }) => screen.padding.left}px;
  justify-content: space-between;
  background-color: ${({ colors }) => colors.gray.first};
  position: relative;
`;

const UserInfo = Styled.View`
  margin-left: 10px;
`;

export default ChatHeader = ({ user = null, goBack }) => {
  const { colors, typography, screen } = useTheme();

  return (
    <HeaderWrapper colors={colors} screen={screen}>
      <StatusBar backgroundColor={colors.gray.first} />
      <Row style={{ paddingRight: 15 }}>
        <NavigateBack action={goBack} />
        <TouchableRipple onPress={() => {}} style={{ flex: 1, marginRight: 5 }}>
          <Row
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}
          >
            <UserAvatar
              size={40}
              flag="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.opovo.com.br%2F_midias%2Fjpg%2F2020%2F10%2F05%2F750x500%2F1_bandeira_do_brasil_300dpi-13718529.jpg&f=1&nofb=1&ipt=aedc272207e3b366ad03dd290a11199c384cb1c0885e5355c7f23d5bd4e8a86a&ipo=images"
            />
            <UserInfo>
              <CustomText
                type={typography.message.preview}
                color={colors.gray.ninth}
                style={{ marginRight: 5 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user.name}
              </CustomText>
              <CustomText
                type={typography.message.preview}
                color={colors.gray.ninth}
                style={{ marginRight: 5 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                online
              </CustomText>
            </UserInfo>
          </Row>
        </TouchableRipple>
        <OverlayMenu
          title={i18n.t("sort")}
          icon="cog"
          iconSize={20}
          topSpacing={40}
          content={
            <CustomText
              type={typography.message.preview}
              color={colors.gray.ninth}
              style={{ marginRight: 5 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user.name}
            </CustomText>
          }
          footer={i18n.t("clear")}
          footerAction={() => {}}
        />
        {/* <IconButton
          icon="cog"
          color={colors.gray.seventh}
          style={{ marginRight: 10 }}
          onPress={() => {}}
        /> */}
      </Row>
      <Divider
        style={{
          height: 2,
          backgroundColor: colors.gray.fifth,
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
        }}
      />
    </HeaderWrapper>
  );
};
