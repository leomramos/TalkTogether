import { API_URL } from "@env";
import axios from "axios";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import { useQuery } from "react-query";
import Styled from "styled-components/native";
import { useSocket, useUser } from "../../../App";
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
  const { socket, online } = useSocket();

  const [otherUser, setOtherUser] = useState("");

  const chatInfo = useQuery("getChat" + route.params?.chatId, () =>
    axios
      .post(`${API_URL}/chats`, { chatId: route.params?.chatId })
      .then(res => {
        const otherUserAux = res.data?.profiles.find(
          u => u.userId !== user._id
        );
        setOtherUser({
          ...otherUserAux,
          online: checkOnline(otherUserAux.userId),
        });
        setPermissions(res.data?.permissions || {});
        return res.data;
      })
      .catch(e => {
        throw e;
      })
  );

  const checkOnline = user => online.indexOf(user) !== -1;

  // useEffect(() => {
  //   alert(
  //     "The chat feature is still being developed and may have some bugs or issues"
  //   );
  // }, []);

  useEffect(() => {
    otherUser &&
      setOtherUser({ ...otherUser, online: checkOnline(otherUser.userId) });
  }, [online]);

  const [messages, setMessages] = useState([]);
  const [permissions, setPermissions] = useState(
    chatInfo.data?.permissions || {}
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (permissions) {
      axios
        .post(`${API_URL}/chats/permissions`, {
          chatId: chatInfo.data?._id,
          permissions,
        })
        .then(res => res.data)
        .catch(e => {
          throw e;
        });
    }
  }, [permissions]);

  console.log(permissions);

  useEffect(() => {
    const info = chatInfo.data;
    if (info && info.messages.length > 0) {
      let messagesAux = messages;
      info.messages.map(msg => {
        let lastMsgGroup = messages[0] || {};

        if (msg.sent === undefined) {
          msg.sent = new Date();
        }

        if (
          lastMsgGroup?.from === msg.from &&
          getTimeDiff(lastMsgGroup.messages[0].sent, msg.sent) < 1
        ) {
          lastMsgGroup = messagesAux.shift();
          lastMsgGroup.messages.push(msg);
          lastMsgGroup.sent = msg.sent;

          messagesAux = [lastMsgGroup, ...(messagesAux || [])];
        } else {
          messagesAux = [
            {
              id: uuid.v4(),
              sent: msg.sent,
              from: msg.from,
              messages: [msg],
            },
            ...(messagesAux || []),
          ];
        }
      });
      setMessages(messagesAux);
      setPermissions(info.permissions);
    }
    setPermissions(info?.permissions || {});
  }, [chatInfo.data]);

  const chat = useRef();
  const input = useRef();

  const [selectedImage, setSelectedImage] = useState(false);

  const [recording, setRecording] = useState(false);

  const [replyingTo, setReplyingTo] = useState(null);

  const [scrolled, setScrolled] = useState(false);

  const [socketEventsAdded, setSocketEventsAdded] = useState(false);

  const addSocketEvents = () => {
    socket.on("message", msg => {
      chatInfo.refetch();
    });

    socket.on("deletedMessage", msg => {
      chatInfo.refetch();
    });

    socket.on("changedPerms", _ => {
      chatInfo.refetch();
    });

    setSocketEventsAdded(true);
  };

  useEffect(() => {
    setTimeout(() => {
      socket.id && !socketEventsAdded && addSocketEvents();
    }, 1000);
  }, [socket.connected]);

  const handleMessage = msg => {
    if (msg.sent === undefined) {
      msg.sent = new Date();
    }

    axios
      .post(`${API_URL}/chats/message`, { chatId: chatInfo.data?._id, msg })
      .then(_ => {
        route.params.correction = null;
        let lastMsgGroup = messages[0];
        let messagesAux = messages || [];

        if (
          lastMsgGroup?.from === msg.from &&
          getTimeDiff(lastMsgGroup.messages[0].sent, msg.sent) < 1
        ) {
          lastMsgGroup = messagesAux.shift();
          lastMsgGroup.messages.push(msg);
          lastMsgGroup.sent = msg.sent;

          messagesAux = [lastMsgGroup, ...(messagesAux || [])];
        } else {
          messagesAux = [
            {
              id: uuid.v4(),
              sent: msg.sent,
              from: msg.from,
              messages: [msg],
            },
            ...(messagesAux || []),
          ];
        }
        setMessages(messagesAux);
        socket.emit("message", {
          to: otherUser.userId,
          msg,
        });
      })
      .catch(e => {
        throw e;
      });
  };

  route.params.correction &&
    handleMessage(JSON.parse(JSON.stringify(route.params.correction)));

  const handleSend = () => {
    if (message.trim() !== " ")
      handleMessage({
        body: message.trim(),
        sent: new Date(),
        from: user._id,
        type: "msg",
        refersTo: replyingTo,
      });

    setReplyingTo(null);
    messages[0] && chat.current.scrollToIndex({ index: 0 });
    setMessage("");
  };

  const handleMedia = () => {
    handleMessage({
      body: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
      sent: new Date(),
      from: user._id,
      type: "photo",
    });
  };

  const startRecording = async () => {
    const permission = await Audio?.requestPermissionsAsync();

    if (permission.status === "granted") {
      await Audio?.setAudioModeAsync({
        allowsRecordingIOS: true,
      });

      const { recording } = await Audio?.Recording.createAsync(
        Audio?.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } else {
      setWarning(i18n.t("microphonePermError"));
    }
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio?.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const { sound, status } = await recording.createNewLoadedSoundAsync();
    console.log(sound, status, recording);
  };

  const handleAudio = () => {};

  const handleDelete = msg => {
    axios
      .post(`${API_URL}/chats/message/delete`, {
        chatId: chatInfo.data?._id,
        msg,
      })
      .then(_ => {
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
        socket.emit("deletedMessage", {
          to: otherUser.userId,
          msg,
        });
      })
      .catch(e => {
        throw e;
      });
  };

  const handleReply = msg => {
    input.current.focus();
    setReplyingTo(msg);
  };

  const Item = React.memo(
    ({ listItem }) => {
      const item = listItem.item;

      return (
        <MessagesGroup sent={item?.from === user._id} key={item?.id}>
          <MessagesStack sent={item?.from === user._id}>
            {item?.messages?.map((msg, i) => (
              <Message
                user={user}
                msg={msg}
                key={i}
                first={i === 0}
                last={i === item?.messages?.length - 1}
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
            {formatMessageSentTime(item?.sent)}
          </Text>
        </MessagesGroup>
      );
    },
    (prevProps, nextProps) =>
      JSON.stringify(prevProps.listItem.item.messages) !==
      JSON.stringify(nextProps.listItem.item.messages)
  );

  const renderItem = item => (item ? <Item listItem={item} /> : <></>);

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
        user={otherUser}
        goBack={navigation.goBack}
        perms={permissions}
        setPerms={setPermissions}
      />
      <MessagesContainer theme={theme}>
        <View style={{ flex: 1 }}>
          {messages && messages.length > 0 && (
            <MessagesList
              inverted
              data={messages}
              renderItem={renderItem}
              keyExtractor={item => item?.id}
              estimatedItemSize={200}
              initialScrollIndex={0}
              onScroll={scroll => {
                const y = scroll.nativeEvent.contentOffset.y;
                setScrolled(y > 10);
              }}
              setRef={chat}
            />
          )}

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
            <ReplyInner theme={theme} from={replyingTo.from === user._id}>
              <Row style={{ justifyContent: "space-between" }}>
                <CustomText
                  type={theme.typography.chat.reply.user}
                  color={
                    theme.colors[
                      replyingTo.from === user._id ? "purple" : "gray"
                    ][replyingTo.from === user._id ? "eighth" : "sixth"]
                  }
                >
                  {replyingTo.from === user._id ? "You" : "Other"}
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
            iconDisabled={
              permissions.documents !== "enabled" && user.role?.permLevel < 5
            }
            action={() => alert("documentos")}
            setRef={input}
            left={
              <TextInput.Icon
                name="image-multiple"
                disabled={
                  permissions.media !== "enabled" && user.role?.permLevel < 5
                }
                size={20}
                color={theme.colors.gray.ninth}
                style={{ marginBottom: 12 }}
                animated
                onPress={handleMedia}
              />
            }
          />
          <IconButton
            icon={message || recording ? "send" : "microphone"}
            disabled={
              !message &&
              permissions.audio !== "enabled" &&
              user.role?.permLevel < 5
            }
            animated
            size={30}
            color={theme.colors.gray.fourth}
            onPress={
              message ? handleSend : !recording ? startRecording : stopRecording
            }
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
