import { Text, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import { formatMessageSentDate } from "../utils/helpers";
import Badge from "./Badge";
import CustomText from "./CustomText";
import UserAvatar from "./UserAvatar";

const ItemContainer = Styled.View`
  flex-direction: row;
  margin-bottom: 15px;
  opacity: ${({ offline }) => (offline ? 0.5 : 1)};
`;

const ChatInfo = Styled.View`
  flex: 1;
`;

const MessageWrapper = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ChatItem = ({ name, offline, lastMessage }) => {
  const { colors, typography } = useTheme();

  return (
    <ItemContainer offline={offline}>
      <UserAvatar offline={offline} />
      <ChatInfo>
        <MessageWrapper>
          <CustomText type={typography.label.name} color={colors.gray.eighth}>
            {name}
          </CustomText>
          <CustomText type={typography.label.sent} color={colors.gray.seventh}>
            {formatMessageSentDate(lastMessage.sent)}
          </CustomText>
        </MessageWrapper>
        <MessageWrapper style={{ marginTop: 4 }}>
          <CustomText
            type={typography.message.preview}
            color={colors.gray.eighth}
            style={{ flex: 1 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {lastMessage.body}
          </CustomText>
          <Badge size={16} color={colors.purple.eighth}>
            <CustomText
              type={typography.message.badge}
              color={colors.gray.second}
            >
              9+
            </CustomText>
          </Badge>
        </MessageWrapper>
        <Divider
          style={{ marginTop: 15, backgroundColor: colors.gray.fifth }}
        />
      </ChatInfo>
    </ItemContainer>
  );
};

export const CallItem = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default List = Styled.FlatList`
  margin-top: 30px;
  padding-right: ${({ theme }) => theme.screen.padding.right};
  margin-right: -${({ theme }) => theme.screen.padding.right};
`;
