import { Icon } from "@react-native-material/core";
import * as Clipboard from "expo-clipboard";
import { TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import CustomText from "./CustomText";
import { Row } from "./Helpers";

import i18n from "../i18n";

const MessageWrapper = Styled.View`
  margin-bottom: ${({ last }) => (!last ? "4px" : "0")};
  align-items: flex-${({ sent }) => (sent ? "end" : "start")};
`;

const MessageContent = Styled(TouchableRipple)`
  background-color: ${({ colors, sent }) =>
    sent ? colors.purple.sixth : colors.gray.fifth};
  border-radius: 10px;
  border-top-${({ sent }) => (sent ? "right" : "left")}-radius: ${({ first }) =>
  first ? 0 : 10}px;
  padding: 10px;
`;

export const MessagesGroup = Styled(Row)`
  flex-direction: ${({ sent }) => (sent ? "row-reverse" : "row")};
  margin-top: 20px;
  align-items: flex-end;
  padding: 0 25px;
`;

export const MessagesStack = Styled.View`
  margin-${({ sent }) => (sent ? "left" : "right")}: 10px;
  max-width: 75%;
`;

export const Message = ({ msg, first, last, openImage }) => {
  const { colors, typography } = useTheme();

  return (
    <MessageWrapper sent={msg.from} last={last}>
      <MessageContent
        colors={colors}
        sent={msg.from}
        first={first}
        last={last}
        onPress={
          msg.type === "photo"
            ? () => openImage({ uri: msg.body, from: msg.from, sent: msg.sent })
            : async () => await Clipboard.setStringAsync(msg.body)
        }
      >
        <Row>
          {msg.type === "photo" && (
            <Icon
              name="image"
              size={20}
              color={colors.gray.ninth}
              style={{ marginRight: 5 }}
            />
          )}
          <CustomText
            type={typography.chat[msg.type]}
            color={colors.gray.ninth}
            style={{ verticalAlign: "middle", textAlignVertical: "center" }}
          >
            {msg.type === "msg" ? msg.body : i18n.t(msg.type)}
          </CustomText>
        </Row>
      </MessageContent>
    </MessageWrapper>
  );
};

export default MessagesList = Styled.FlatList.attrs({
  scrollIndicatorColor: "white",
})`
  /* padding: 5px 0; */
`;
