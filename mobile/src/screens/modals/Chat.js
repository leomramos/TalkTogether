import React, { useState } from "react";
import { Text, View } from "react-native";
import { IconButton, TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import {
  ChatHeader,
  CustomInput,
  Message,
  MessagesGroup,
  MessagesList,
  MessagesStack,
  ScreenContainer,
} from "../../components";
import i18n from "../../i18n";
import { formatMessageSentTime } from "../../utils/helpers";

const MessagesContainer = Styled.View`
  flex: 1;
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
  background-color: ${({ theme }) => theme.colors.gray.second};
`;

export default Chat = ({ route, navigation }) => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [chat, setChat] = useState({});

  const renderItem = ({ item }) => {
    return (
      <MessagesGroup sent={item.sentBy}>
        <MessagesStack sent={item.sentBy}>
          {item.messages.map((msg, i) => (
            <Message
              msg={msg}
              key={i}
              first={i === 0}
              last={i === item.messages.length - 1}
            />
          ))}
        </MessagesStack>
        <Text style={{ color: "gray" }}>
          {formatMessageSentTime(item.sent)}
        </Text>
      </MessagesGroup>
    );
  };

  const messagesAmount = 5;
  const groupsAmount = 10;
  const [messages, setMessages] = useState(
    Array(groupsAmount)
      .fill()
      .map((_, i) => {
        const diff = 1000 * 60 * i * 7;
        const sent =
          new Date() - Math.floor(Math.random() * (diff - diff) + diff);
        const sentBy = Math.round(Math.random()) > 0.5;

        return {
          _id: i,
          sent,
          sentBy,
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
              sentBy,
            })),
        };
      })
  );

  const [scrolled, setScrolled] = useState(false);

  return (
    <ScreenContainer background={theme.colors.gray.first}>
      <ChatHeader
        user={route.params.user}
        goBack={navigation.goBack}
        navigation={navigation}
      />
      <MessagesContainer theme={theme}>
        <View style={{ flexShrink: 1 }}>
          <MessagesList
            inverted
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            onScroll={scroll => {
              const y = scroll.nativeEvent.contentOffset.y;

              if ((y >= 10 && !scrolled) || (y < 10 && scrolled))
                setScrolled(y >= 10);
            }}
            ref={ref => {
              setChat(ref);
            }}
          />
          <IconButton
            icon="chevron-double-down"
            size={20}
            color={theme.colors.gray.ninth}
            onPress={() => chat.scrollToIndex({ index: 0, animated: false })}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: theme.colors.gray.fifth,
              opacity: scrolled ? 1 : 0,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 25,
            paddingTop: 10,
            paddingBottom: 15,
          }}
        >
          <CustomInput
            dense
            value={search}
            setValue={setSearch}
            style={{ flexGrow: 1 }}
            placeholder={i18n.t("type")}
            highlight={false}
          />
        </View>
      </MessagesContainer>
    </ScreenContainer>
  );
};
