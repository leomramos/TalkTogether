import { API_URL } from "@env";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import Styled from "styled-components/native";
import { useUser } from "../../../App";
import {
  ChatHeader,
  CustomInput,
  Message,
  MessagesGroup,
  MessagesList,
  MessagesStack,
  Row,
  ScreenContainer,
} from "../../components";
import { formatMessageSentTime, getTimeDiff } from "../../utils/helpers";

import { Icon } from "@react-native-material/core";
import i18n from "../../i18n";

const MessagesContainer = Styled.View`
  flex: 1;
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
  background-color: ${({ theme }) => theme.colors.gray.second};
`;

const InputsContainer = Styled.View`
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
  background-color: ${({ theme }) => theme.colors.gray.second};
  padding: 0 10px;
  padding-top: 10px;
`;

const ReplyViewer = Styled.View`
  background-color: ${({ theme }) => theme.colors.gray.third};
  padding: 6px;
  padding-bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 3px;
`;

const ReplyInner = Styled.View`
  background-color: ${({ theme }) => theme.colors.gray.fifth};
  padding: 8px 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 0px solid ${({ theme, from }) =>
    theme.colors[from ? "purple" : "gray"][from ? "eighth" : "sixth"]};
  border-left-width: 2px;
`;

export default Chat = ({ route, navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useUser();

  const [otherUserId, setOtherUserId] = useState("");

  const otherUser = useQuery(
    "getChat" + otherUserId,
    () =>
      axios
        .post(`${API_URL}/profiles`, { userId: otherUserId })
        .then(res => res.data)
        .catch(e => {
          throw e;
        }),
    { enabled: false }
  );

  useEffect(() => {
    otherUser.refetch();
  }, [otherUserId]);

  const chatInfo = useQuery("getChat" + route.params?.chatId, () =>
    axios
      .post(`${API_URL}/chats`, { _id: route.params?.chatId })
      .then(res => {
        setOtherUserId(res.data?.users.find(u => u._id !== user._id));
        return res.data;
      })
      .catch(e => {
        throw e;
      })
  );

  useEffect(() => {
    const info = chatInfo.data;
    if (info) {
      setMessages(info.messages);
      // group messages
      // {
      //   _id: 0,
      //   sent: 1670002670000,
      //   from: false,
      //   messages: [
      //     {
      //       body: "fruqthd. opzzt wrikrklb. wbpts oocffo w.aj",
      //       sent: 1670002670000,
      //       from: false,
      //       type: "msg",
      //     },
      //   ],
      // },
      setPermissions(info.permissions);
    }
  }, [chatInfo]);

  const [messages, setMessages] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [message, setMessage] = useState("");

  const chat = useRef();
  const input = useRef();

  const [selectedImage, setSelectedImage] = useState(false);

  const [recording, setRecording] = useState(false);

  const [replyingTo, setReplyingTo] = useState(null);

  const [scrolled, setScrolled] = useState(false);

  const handleMessage = msg => {
    route.params.correction = null;
    let lastMsgGroup = messages[0];

    if (msg.sent === undefined) {
      msg.sent = new Date();
    }

    if (
      lastMsgGroup.from === msg.from &&
      getTimeDiff(lastMsgGroup.messages[0].sent, msg.sent) < 1
    ) {
      lastMsgGroup = messages.shift();
      lastMsgGroup.messages.push(msg);
      lastMsgGroup.sent = msg.sent;

      setMessages([lastMsgGroup, ...messages]);
    } else {
      setMessages([
        {
          _id: Math.floor(Math.random() * 1000),
          sent: new Date(),
          from: msg.from,
          messages: [msg],
        },
        ...messages,
      ]);
    }
  };

  route.params.correction && handleMessage(route.params.correction);

  const handleSend = () => {
    if (message.trim() !== " ")
      handleMessage({
        body: message.trim(),
        sent: new Date(),
        from: Math.round(Math.random()) > 0.5,
        type: "msg",
        refersTo: replyingTo,
      });

    setReplyingTo(null);
    chat.current.scrollToIndex({ index: 0 });
    setMessage("");
  };

  const handleMedia = () => {
    handleMessage({
      body: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
      sent: new Date(),
      from: Math.round(Math.random()) > 0.5,
      type: "photo",
    });
  };

  const handleAudio = () => {};

  const handleDelete = msg => {
    setMessages(
      messages
        .map(g => ({
          ...g,
          messages: g.messages.filter(
            m => JSON.stringify(m) !== JSON.stringify(msg)
          ),
        }))
        .filter(g => g.messages.length > 0)
    );
  };

  const handleReply = msg => {
    input.current.focus();
    setReplyingTo(msg);
  };

  const Item = React.memo(
    ({ listItem }) => {
      const item = listItem.item;

      return (
        <MessagesGroup sent={item.from} key={listItem.item._id}>
          <MessagesStack sent={item.from}>
            {item.messages.map((msg, i) => (
              <Message
                msg={msg}
                key={i}
                first={i === 0}
                last={i === item.messages.length - 1}
                openImage={setSelectedImage}
                handleGrammar={() =>
                  navigation.navigate("Modals", {
                    screen: "CorrectionModal",
                    params: { msg: msg.body, chatId: route.params.chatId },
                  })
                }
                handleDelete={handleDelete}
                handleReply={handleReply}
              />
            ))}
          </MessagesStack>
          <Text style={{ color: "gray" }}>
            {formatMessageSentTime(item.sent)}
          </Text>
        </MessagesGroup>
      );
    },
    (prevProps, nextProps) =>
      JSON.stringify(prevProps.listItem.item.messages) !==
      JSON.stringify(nextProps.listItem.item.messages)
  );

  const renderItem = item => <Item listItem={item} />;

  return (
    <ScreenContainer background={theme.colors.gray.first}>
      <ImageView
        images={[selectedImage]}
        imageIndex={0}
        visible={Boolean(selectedImage)}
        onRequestClose={() => setSelectedImage(false)}
        presentationStyle="overFullScreen"
        swipeToCloseEnabled={false}
        keyExtractor={({ from, sent, uri }) => from + sent + uri}
      />
      <ChatHeader
        user={route.params.user}
        goBack={navigation.goBack}
        perms={permissions}
        setPerms={setPermissions}
      />
      <MessagesContainer theme={theme}>
        <View style={{ flex: 1 }}>
          <MessagesList
            inverted
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            estimatedItemSize={200}
            initialScrollIndex={0}
            onScroll={scroll => {
              const y = scroll.nativeEvent.contentOffset.y;
              setScrolled(y > 10);
            }}
            setRef={chat}
          />
          <IconButton
            icon="chevron-double-down"
            size={20}
            color={theme.colors.gray.ninth}
            onPress={() =>
              chat.current.scrollToIndex({ index: 0, animated: false })
            }
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: theme.colors.gray.fifth,
              opacity: scrolled ? 1 : 0,
            }}
          />
        </View>
      </MessagesContainer>

      <InputsContainer
        theme={theme}
        style={{
          marginBottom: -insets.bottom,
          paddingBottom: insets.bottom + 15,
        }}
      >
        {replyingTo && (
          <ReplyViewer theme={theme}>
            <ReplyInner theme={theme} from={replyingTo.from}>
              <Row style={{ justifyContent: "space-between" }}>
                <CustomText
                  type={theme.typography.chat.reply.user}
                  color={
                    theme.colors[replyingTo.from ? "purple" : "gray"][
                      replyingTo.from ? "eighth" : "sixth"
                    ]
                  }
                >
                  {replyingTo.from ? "You" : "Other"}
                </CustomText>
                <IconButton
                  icon="close"
                  size={15}
                  color={theme.colors.gray.eighth}
                  onPress={() => setReplyingTo(null)}
                  style={{ margin: 0 }}
                />
              </Row>
              <CustomText
                type={
                  theme.typography.chat.reply[
                    replyingTo.type !== "msg" ? "special" : "body"
                  ]
                }
                color={theme.colors.gray.eighth}
                style={{ paddingRight: 25 }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {replyingTo.type !== "msg" && (
                  <>
                    <Icon
                      name={`${
                        replyingTo.type === "correction"
                          ? "spellcheck"
                          : "image"
                      }`}
                      size={15}
                      color={theme.colors.gray.ninth}
                    />
                    <View style={{ width: 5 }}></View>
                  </>
                )}

                {replyingTo.type === "msg"
                  ? replyingTo.body
                  : i18n.t(replyingTo.type)}
              </CustomText>
            </ReplyInner>
          </ReplyViewer>
        )}
        <Row style={{ alignItems: message ? "flex-end" : "center" }}>
          <CustomInput
            dense
            value={message}
            setValue={setMessage}
            style={{
              flex: 1,
              paddingTop: 5,
              paddingBottom: 5,
              maxHeight: 250,
            }}
            multiline
            placeholder={i18n.t("type")}
            highlight={false}
            icon={!message && "attachment"}
            iconStyle={{
              marginBottom: 12,
            }}
            iconDisabled={permissions.documents !== "enabled"}
            action={() => alert("documentos")}
            setRef={input}
            left={
              <TextInput.Icon
                name="image-multiple"
                disabled={permissions.media !== "enabled"}
                size={20}
                color={theme.colors.gray.ninth}
                style={{ marginBottom: 12 }}
                animated
                onPress={handleMedia}
              />
            }
          />
          <IconButton
            icon={message ? "send" : "microphone"}
            disabled={!message && permissions.audio !== "enabled"}
            animated
            size={30}
            color={theme.colors.gray.fourth}
            onPress={message ? handleSend : handleAudio}
            style={{
              backgroundColor: theme.colors.purple.eighth,
              marginBottom: 0,
            }}
          />
        </Row>
      </InputsContainer>
    </ScreenContainer>
  );
};
