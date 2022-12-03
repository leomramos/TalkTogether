import { Icon } from "@react-native-material/core";
import { FlashList } from "@shopify/flash-list";
import * as Clipboard from "expo-clipboard";
import React, { useRef } from "react";
import { View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
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

const ReplyContainer = Styled.View`
  min-width: 200px;
  background-color: ${({ colors, sent }) =>
    sent ? colors.purple.fourth : colors.gray.fourth};
    /* background-color: ${({ colors }) => colors.purple.seventh}; */
  padding: 8px 10px;
  border-top-${({ sent }) => (sent ? "left" : "right")}-radius: 10px;
  border: 0px solid ${({ colors, sent, sentOriginal }) =>
    sent
      ? sentOriginal
        ? colors.purple.eighth
        : colors.gray.seventh
      : sentOriginal
      ? colors.purple.eighth
      : colors.gray.sixth};
  border-${({ sent }) => (sent ? "left" : "right")}-width: 2px;
  border-top-width: 2px;
  margin: -3px;
  margin-bottom: 5px;
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

const Action = Styled(Row)`
  align-self: stretch;
  justify-content: center;
  width: 50px;
`;

const LeftActions = ({ colors }) => (
  <Action>
    <Icon name="reply" size={25} color={colors.gray.ninth} />
  </Action>
);

const RightActionsSelf = ({ colors }) => (
  <Action>
    <Icon name="delete" size={25} color={colors.aux.delete} />
  </Action>
);

const RightActionsOther = ({ colors }) => (
  <Action>
    <Icon name="reply" size={25} color={colors.gray.ninth} />
  </Action>
);

export const Message = React.memo(
  ({ msg, first, last, openImage, handleDelete, handleReply }) => {
    const { colors, typography } = useTheme();

    const swipeable = useRef();

    const handleSwipeSelf = direction => {
      switch (direction) {
        case "left":
          handleReply(msg);
          swipeable.current.close();
          break;
        case "right":
          handleDelete(msg);
          break;
      }
    };

    const handleSwipeOther = direction => {
      switch (direction) {
        case "left":
          handleReply(msg);
          swipeable.current.close();
          break;
        case "right":
          swipeable.current.close();
          break;
      }
    };

    return (
      <Swipeable
        friction={3}
        renderLeftActions={() => <LeftActions colors={colors} />}
        renderRightActions={() =>
          msg.from ? (
            <RightActionsSelf colors={colors} />
          ) : (
            <RightActionsOther colors={colors} />
          )
        }
        onSwipeableOpen={msg.from ? handleSwipeSelf : handleSwipeOther}
        containerStyle={{ overflow: "visible" }}
        ref={swipeable}
      >
        <MessageWrapper sent={msg.from} last={last}>
          <MessageContent
            colors={colors}
            sent={msg.from}
            first={first}
            last={last}
            onPress={
              msg.type === "photo"
                ? () =>
                    openImage({ uri: msg.body, from: msg.from, sent: msg.sent })
                : async () => await Clipboard.setStringAsync(msg.body)
            }
          >
            <View>
              {msg.refersTo && (
                <ReplyContainer
                  sent={msg.from}
                  sentOriginal={msg.refersTo.from}
                  colors={colors}
                >
                  <CustomText
                    type={typography.chat.reply.user}
                    color={
                      msg.from
                        ? colors[msg.refersTo.from ? "purple" : "gray"][
                            msg.refersTo.from ? "eighth" : "seventh"
                          ]
                        : colors[msg.refersTo.from ? "purple" : "gray"][
                            msg.refersTo.from ? "eighth" : "sixth"
                          ]
                    }
                  >
                    {msg.refersTo.from ? "You" : "Other"}
                  </CustomText>
                  <CustomText
                    type={typography.chat.reply.body}
                    color={colors.gray.eighth}
                    style={{ paddingRight: 25 }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {msg.refersTo.body}
                  </CustomText>
                </ReplyContainer>
              )}
              <Row style={msg.from && { justifyContent: "flex-end" }}>
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
                >
                  {msg.type === "msg" ? msg.body : i18n.t(msg.type)}
                </CustomText>
              </Row>
            </View>
          </MessageContent>
        </MessageWrapper>
      </Swipeable>
    );
  },
  () => false
);

export default MessagesList = ({ setRef, ...props }) => (
  <FlashList scrollIndicatorColor="white" ref={setRef} {...props} />
);
