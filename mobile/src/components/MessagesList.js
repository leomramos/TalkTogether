import { Text, View } from "react-native";
import { Divider, TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import CustomText from "./CustomText";
import { Row } from "./Helpers";

const MessageWrapper = Styled.View`
  margin-bottom: ${({ last }) => (!last ? "4px" : "0")};
  align-items: flex-end;
`;

const MessageContent = Styled.View`
  background-color: ${({ colors, sent }) =>
    sent ? colors.purple.sixth : colors.gray.fifth};
  border-top-${({ sent }) => (sent ? "right" : "left")}-radius: 0;
  padding: 10px;
  width: 100%;
`;

export const MessagesGroup = Styled(Row)`
  flex-direction: ${({ sent }) => (sent ? "row-reverse" : "row")};
  margin-top: 20px;
  align-items: flex-end;
  padding: 0 25px;
`;

export const MessagesStack = Styled.View`
  margin-${({ sent }) => (sent ? "left" : "right")}: 10px;
  border-top-left-radius: ${({ sent }) => (sent ? "10px" : "0")};
  border-top-right-radius: ${({ sent }) => (!sent ? "10px" : "0")};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  max-width: 75%;
  min-width: 100px;
  overflow: hidden;
`;

export const Message = ({ msg, first, last }) => {
  const { colors } = useTheme();

  return (
    <MessageWrapper sent={msg.sentBy} last={last}>
      <MessageContent
        colors={colors}
        sent={msg.sentBy}
        first={first}
        last={last}
      >
        <Text style={{ color: "white" }}>{msg.body}</Text>
      </MessageContent>
    </MessageWrapper>
  );
};

export default MessagesList = Styled.FlatList.attrs({
  scrollIndicatorColor: "white",
})`
  padding: 5px 0;
`;
