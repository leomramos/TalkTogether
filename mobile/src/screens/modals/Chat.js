import React, { useState } from "react";
import { Text, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
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
import i18n from "../../i18n";
import { formatMessageSentTime, getTimeDiff } from "../../utils/helpers";

const MessagesContainer = Styled.View`
  flex: 1;
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
  background-color: ${({ theme }) => theme.colors.gray.second};
`;

const InputsContainer = Styled(Row)`
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
  background-color: ${({ theme }) => theme.colors.gray.second};
  padding: 0 10px;
  padding-top: 10px;
  padding-bottom: 15px;
`;

export default Chat = ({ route, navigation }) => {
  const theme = useTheme();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState({});

  const [permissions, setPermissions] = useState({
    documents: "enabled",
    audio: "pending",
    media: "disabled",
  });

  const [imageView, setImageView] = useState(true);
  const [selectedImage, setSelectedImage] = useState(false);

  const [recording, setRecording] = useState(false);

  const Item = React.memo(
    ({ listItem }) => {
      const item = listItem.item;
      return (
        <MessagesGroup sent={item.from}>
          <MessagesStack sent={item.from}>
            {item.messages.map((msg, i) => (
              <Message
                msg={msg}
                key={i}
                first={i === 0}
                last={i === item.messages.length - 1}
                openImage={setSelectedImage}
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

  const messagesAmount = 5;
  const groupsAmount = 10;
  const [messages, setMessages] = useState(
    Array(groupsAmount)
      .fill()
      .map((_, i) => {
        const diff = 1000 * 60 * i * 7;
        const sent =
          new Date() - Math.floor(Math.random() * (diff - diff) + diff);
        const from = Math.round(Math.random()) > 0.5;

        return {
          _id: i,
          sent,
          from,
          messages: Array(
            Math.floor(Math.random() * (messagesAmount - 1 + 1) + 1)
          )
            .fill()
            .map(_ => ({
              body: Array(Math.floor(Math.random() * (15 - 3 + 1) + 3))
                .fill()
                .map(
                  _ =>
                    Array(Math.floor(Math.random() * (8 - 2 + 1) + 2))
                      .fill()
                      .map(_ =>
                        String.fromCharCode(97 + Math.floor(Math.random() * 26))
                      )
                      .join("") +
                    String.fromCharCode(97 + Math.floor(Math.random() * 26))
                )
                .join(" "),
              sent,
              from,
              type: "msg",
            })),
        };
      })
  );

  const [scrolled, setScrolled] = useState(false);

  const handleMessage = msg => {
    let lastMsgGroup = messages[messages.length - 1];

    if (
      lastMsgGroup.from === msg.from &&
      getTimeDiff(
        lastMsgGroup.messages[lastMsgGroup.messages.length - 1].sent,
        msg.sent
      ) < 1
    ) {
      lastMsgGroup = messages.pop();
      lastMsgGroup.messages.push(msg);
      lastMsgGroup.sent = msg.sent;

      setMessages([...messages, lastMsgGroup]);
    } else {
      setMessages([
        ...messages,
        {
          _id: Math.floor(Math.random() * 1000),
          sent: new Date(),
          from: msg.from,
          messages: [msg],
        },
      ]);
    }
  };

  const handleSend = () => {
    handleMessage({
      body: message.trim(),
      sent: new Date(),
      from: Math.round(Math.random()) > 0.5,
      type: "msg",
    });

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
        <View style={{ flexShrink: 1 }}>
          <MessagesList
            initialScrollIndex={messages.length - 1}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            onContentSizeChange={() => chat.scrollToEnd()}
            onLayout={() => chat.scrollToEnd()}
            onScroll={scroll => {
              const y = scroll.nativeEvent.contentOffset.y;
              const size =
                scroll.nativeEvent.contentSize.height -
                scroll.nativeEvent.layoutMeasurement.height;

              if ((y <= size - 10 && !scrolled) || (y > size - 10 && scrolled))
                setScrolled(y <= size - 10);
            }}
            ref={ref => {
              setChat(ref);
            }}
          />
          <IconButton
            icon="chevron-double-down"
            size={20}
            color={theme.colors.gray.ninth}
            onPress={() => chat.scrollToEnd({ animated: false })}
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
        style={{ alignItems: message ? "flex-end" : "center" }}
      >
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
          disabled={permissions.audio !== "enabled"}
          animated
          size={30}
          color={theme.colors.gray.fourth}
          onPress={message ? handleSend : handleAudio}
          style={{
            backgroundColor: theme.colors.purple.eighth,
            marginBottom: 0,
          }}
        />
      </InputsContainer>
    </ScreenContainer>
  );
};
