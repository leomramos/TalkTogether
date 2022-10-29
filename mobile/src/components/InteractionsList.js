import { useState } from "react";
import { Text, View } from "react-native";
import { Divider, TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import { formatMessageSentDate } from "../utils/helpers";
import Badge from "./Badge";
import CustomText from "./CustomText";
import { Row } from "./Helpers";
import UserAvatar from "./UserAvatar";

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

export const ChatItem = ({ name, offline, lastMessage, handlePress }) => {
  const { colors, typography, screen } = useTheme();
  const [touching, setTouching] = useState(false);

  const unread = Math.floor(Math.random() * Math.random() * 10);

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

export const CallItem = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default List = Styled.FlatList.attrs({ scrollIndicatorColor: "white" })`
  margin-top: 20px;
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
`;
