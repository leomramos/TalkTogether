import { Icon } from "@react-native-material/core";
import { FlashList } from "@shopify/flash-list";
import * as Clipboard from "expo-clipboard";
import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  Divider,
  IconButton,
  Menu,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
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

const Actions = ({ grammar, copy, reply, colors, setVisible }) => (
  <Row>
    <IconButton
      icon="spellcheck"
      size={15}
      color={colors.gray.ninth}
      onPress={() => {
        grammar();
        setVisible(false);
      }}
      style={{ margin: 0 }}
    />
    <Divider style={{ height: "100%", width: 2, marginHorizontal: 5 }} />
    <IconButton
      icon="content-copy"
      size={15}
      color={colors.gray.ninth}
      onPress={copy}
      style={{ margin: 0 }}
    />
    <Divider style={{ height: "100%", width: 2, marginHorizontal: 5 }} />
    <IconButton
      icon="reply"
      size={15}
      color={colors.gray.ninth}
      onPress={() => {
        reply();
        setVisible(false);
      }}
      style={{ margin: 0 }}
    />
  </Row>
);

export const Message = React.memo(
  ({
    msg,
    first,
    last,
    openImage,
    handleGrammar,
    handleDelete,
    handleReply,
  }) => {
    const { colors, typography } = useTheme();

    const [visible, setVisible] = useState(false);

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

    const copyToClipboard = async () =>
      await Clipboard.setStringAsync(msg.body);

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
        <Menu
          contentStyle={{
            backgroundColor: colors.gray.first,
            paddingHorizontal: 5,
          }}
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
          anchor={
            <MessageWrapper sent={msg.from} last={last}>
              <MessageContent
                colors={colors}
                sent={msg.from}
                first={first}
                last={last}
                onPress={
                  msg.type === "photo"
                    ? () =>
                        openImage({
                          uri: msg.body,
                          from: msg.from,
                          sent: msg.sent,
                        })
                    : () => setVisible(true)
                }
                delayLongPress={500}
                onLongPress={msg.type === "msg" ? copyToClipboard : null}
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
          }
        >
          <Actions
            grammar={handleGrammar}
            copy={copyToClipboard}
            reply={() => handleReply(msg)}
            colors={colors}
            setVisible={setVisible}
          />
        </Menu>
      </Swipeable>
    );
  },
  () => false
);

export default MessagesList = ({ setRef, ...props }) => (
  <FlashList scrollIndicatorColor="white" ref={setRef} {...props} />
);
