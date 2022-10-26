import { Text, View } from "react-native";
import { Divider, TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import { formatMessageSentDate } from "../utils/helpers";
import Badge from "./Badge";
import CustomText from "./CustomText";
import { Row } from "./Helpers";
import UserAvatar from "./UserAvatar";

const ItemContainer = Styled(Row)`
  margin-bottom: 15px;
  opacity: ${({ offline }) => (offline ? 0.5 : 1)};
`;

const MessageWrapper = Styled(Row)`
  justify-content: space-between;
`;

export const ChatItem = ({ name, offline, lastMessage, handlePress }) => {
  const { colors, typography } = useTheme();
  console.log(handlePress);

  return (
    <TouchableRipple onPress={handlePress}>
      <ItemContainer offline={offline}>
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

export default List = Styled.FlatList`
  margin-top: 30px;
  padding-right: ${({ theme }) => theme.screen.padding.right}px;
  margin-right: -${({ theme }) => theme.screen.padding.right}px;
`;
