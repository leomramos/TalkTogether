import React, { useState } from "react";
import { View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import {
  ChatHeader,
  CustomInput,
  Message,
  MessagesList,
} from "../../components";
import ScreenContainer from "../../components/ScreenContainer";
import i18n from "../../i18n";

const MessagesContainer = Styled.View`
  flex: 1;
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
  background-color: ${({ theme }) => theme.colors.gray.second};
`;

export default Chat = ({ route, navigation }) => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [chat, setChat] = useState(null);

  const renderItem = ({ item }) => {
    return <Message msg={item} />;
  };

  const messagesAmount = 15;
  const [messages, setMessages] = useState(
    Array(messagesAmount)
      .fill()
      .map((_, k) => ({
        _id: k,
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
        sent: new Date(),
        sentBy: Math.round(Math.random()) > 0.5,
      }))
  );

  return (
    <ScreenContainer background={theme.colors.gray.first}>
      <ChatHeader user={route.params.user} goBack={() => navigation.goBack()} />
      <MessagesContainer theme={theme}>
        <MessagesList
          inverted
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          ref={ref => {
            setChat(ref);
          }}
          ListFooterComponent={
            <TouchableRipple
              onPress={() => chat && chat.scrollToIndex({ index: 0 })}
            >
              <View
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "green",
                }}
              ></View>
            </TouchableRipple>
          }
        />
        <View style={{ paddingHorizontal: 30, paddingVertical: 15 }}>
          <CustomInput
            dense
            value={search}
            setValue={setSearch}
            style={{ flexGrow: 1 }}
          />
        </View>
      </MessagesContainer>
    </ScreenContainer>
  );
};
