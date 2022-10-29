import { FlatList, Text, View } from "react-native";
import { Divider, TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import { formatMessageSentTime } from "../utils/helpers";
import Badge from "./Badge";
import CustomText from "./CustomText";
import UserAvatar from "./UserAvatar";

const MessagesGroup = Styled.View`
  margin: 5px 0;
  flex-direction: ${({ sent }) => (sent ? "row-reverse" : "row")};
  align-items: flex-end;
`;

const MessageWrapper = Styled.View`
  border-radius: 10px;
  background-color: ${({ colors, sent }) =>
    sent ? colors.purple.fifth : colors.gray.fifth};
  border-top-${({ sent }) => (sent ? "right" : "left")}-radius: 0;
  margin-${({ sent }) => (sent ? "left" : "right")}: 10px;
  padding: 10px;
  min-width: 100px;
  max-width: 75%;
  justify-self: flex-end;
`;

export const Message = ({ msg }) => {
  const { colors } = useTheme();

  return (
    <MessagesGroup sent={msg.sentBy}>
      <MessageWrapper colors={colors} sent={msg.sentBy}>
        <Text style={{ color: "white" }}>{msg.body}</Text>
      </MessageWrapper>
      <Text style={{ color: "gray" }}>{formatMessageSentTime(msg.sent)}</Text>
    </MessagesGroup>
  );
};

export default MessagesList = Styled.FlatList.attrs({
  scrollIndicatorColor: "white",
})`
  padding: 5px 25px;
`;
