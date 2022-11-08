import { useState } from "react";
import { Image, Text, View } from "react-native";
import { Divider, TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import {
  formatCallDate,
  formatCallDuration,
  formatMessageSentDate,
} from "../utils/helpers";
import Badge from "./Badge";
import CustomText from "./CustomText";
import { Circle, Row } from "./Helpers";
import UserAvatar from "./UserAvatar";

import i18n from "../i18n";

const ItemContainer = Styled(Row)`
  margin-bottom: 10px;
  margin-top: 10px;
  opacity: ${({ offline }) => (offline ? 0.5 : 1)};
  padding-right: 20px;
  padding-left: ${({ screen }) => screen.padding.left}px;
`;

const MessageWrapper = Styled(Row)`
  justify-content: space-between;
`;

export const ChatItem = ({
  name,
  offline,
  lastMessage,
  unread,
  handlePress,
  handleAvatarPress,
}) => {
  const { colors, typography, screen } = useTheme();
  const [touching, setTouching] = useState(false);

  return (
    <TouchableRipple
      onPress={handlePress}
      onPressIn={() => setTouching(true)}
      onPressOut={() => setTouching(false)}
    >
      <ItemContainer offline={offline} screen={screen}>
        <UserAvatar offline={offline} onPress={handleAvatarPress} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <MessageWrapper>
            <CustomText
              type={typography.label.name}
              color={colors.gray.eighth}
              numberOfLines={1}
              style={{ flex: 1, marginRight: 15 }}
              ellipsizeMode="tail"
            >
              {name}
            </CustomText>
            <CustomText
              type={typography.label.sent}
              color={colors.gray.seventh}
            >
              {formatMessageSentDate(lastMessage.sent)}
            </CustomText>
          </MessageWrapper>
          <MessageWrapper style={{ marginTop: 4 }}>
            <CustomText
              type={typography.message.preview}
              color={colors.gray.eighth}
              style={{ flex: 1, marginRight: 5 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {lastMessage.body}
            </CustomText>
            {unread > 0 && (
              <Badge size={16} color={colors.purple.eighth}>
                <CustomText
                  type={typography.message.badge}
                  color={colors.gray.second}
                >
                  {unread < 10 ? unread : "9+"}
                </CustomText>
              </Badge>
            )}
          </MessageWrapper>
          <Divider
            style={{
              position: "absolute",
              bottom: -11,
              left: 0,
              right: 0,
              backgroundColor: touching ? "transparent" : colors.gray.fourth,
            }}
          />
        </View>
      </ItemContainer>
    </TouchableRipple>
  );
};

export const CallItem = ({
  name,
  offline,
  country,
  duration,
  date,
  handlePress,
}) => {
  const { colors, typography, screen } = useTheme();
  const [touching, setTouching] = useState(false);

  return (
    <TouchableRipple
      onPress={handlePress}
      onPressIn={() => setTouching(true)}
      onPressOut={() => setTouching(false)}
    >
      <ItemContainer offline={offline} screen={screen}>
        <UserAvatar offline={offline} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <MessageWrapper>
            <CustomText
              type={typography.label.name}
              color={colors.gray.eighth}
              numberOfLines={1}
              style={{ flex: 1, marginRight: 15 }}
              ellipsizeMode="tail"
            >
              {name}
            </CustomText>
            <CustomText
              type={typography.label.date}
              color={colors.gray.seventh}
            >
              {formatCallDate(date)}
            </CustomText>
          </MessageWrapper>
          <MessageWrapper style={{ marginTop: 4 }}>
            <CustomText
              type={typography.call.duration}
              color={colors.gray.eighth}
              style={{ flex: 1, marginRight: 5 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formatCallDuration(duration)}
            </CustomText>
            <Circle
              size={15}
              color="transparent"
              style={{
                overflow: "hidden",
              }}
            >
              <Image
                source={{
                  uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.opovo.com.br%2F_midias%2Fjpg%2F2020%2F10%2F05%2F750x500%2F1_bandeira_do_brasil_300dpi-13718529.jpg&f=1&nofb=1&ipt=aedc272207e3b366ad03dd290a11199c384cb1c0885e5355c7f23d5bd4e8a86a&ipo=images",
                }}
                resizeMode="cover"
                alt={i18n.t("userCountryFlag")}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Circle>
          </MessageWrapper>
          <Divider
            style={{
              position: "absolute",
              bottom: -11,
              left: 0,
              right: 0,
              backgroundColor: touching ? "transparent" : colors.gray.fourth,
            }}
          />
        </View>
      </ItemContainer>
    </TouchableRipple>
  );
};

export default List = Styled.FlatList.attrs({ scrollIndicatorColor: "white" })`
  margin-top: 20px;
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
`;
