import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider, IconButton, Menu, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import { CustomInput, OverlayMenu, PageHeader } from "../../components";
import ScreenContainer from "../../components/ScreenContainer";

import i18n from "../../i18n";

const SortOverlay = () => {
  return (
    <>
      <IconButton icon="at" color="black" size={25} onPress={() => {}} />
      {/* <Menu.Item onPress={() => {}} title="Ale" />
      <Menu.Item onPress={() => {}} title="Te" />
      <Divider />
      <Menu.Item onPress={() => {}} title="Amo" /> */}
    </>
  );
};

const ChatsList = Styled.FlatList`
  margin-top: 30px;
  padding-right: ${({ theme }) => theme.screen.paddingRight};
  margin-right: -${({ theme }) => theme.screen.paddingRight};
`;

const DATA = [
  {
    id: "-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f--471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f--145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1--bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a045571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3d4557a1-471f-bd96-11e29d72",
    title: "Third Item",
  },
];

const Chat = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

const renderItem = ({ item }) => {
  return <Chat name={item.name} />;
};

export default Chats = () => {
  const [chats, setChats] = useState([
    {
      _id: "1",
      name: "Teste 1",
      messages: [
        {
          body: "Mensagem 1",
          sent: new Date(),
        },
        {
          body: "Mensagem 2",
          sent: new Date(),
        },
        {
          body: "Mensagem 3",
          sent: new Date(),
        },
        {
          body: "Mensagem 4",
          sent: new Date(),
        },
      ],
    },
    {
      _id: "2",
      name: "Teste 2",
      messages: [
        {
          body: "Mensagem 1",
          sent: new Date(),
        },
        {
          body: "Mensagem 2",
          sent: new Date(),
        },
        {
          body: "Mensagem 3",
          sent: new Date(),
        },
        {
          body: "Mensagem 4",
          sent: new Date(),
        },
      ],
    },
    {
      _id: "3",
      name: "Teste 3",
      messages: [
        {
          body: "Mensagem 1",
          sent: new Date(),
        },
        {
          body: "Mensagem 2",
          sent: new Date(),
        },
        {
          body: "Mensagem 3",
          sent: new Date(),
        },
        {
          body: "Mensagem 4",
          sent: new Date(),
        },
      ],
    },
    {
      _id: "4",
      name: "Teste 4",
      messages: [
        {
          body: "Mensagem 1",
          sent: new Date(),
        },
        {
          body: "Mensagem 2",
          sent: new Date(),
        },
        {
          body: "Mensagem 3",
          sent: new Date(),
        },
        {
          body: "Mensagem 4",
          sent: new Date(),
        },
      ],
    },
    {
      _id: "5",
      name: "Teste 5",
      messages: [
        {
          body: "Mensagem 1",
          sent: new Date(),
        },
        {
          body: "Mensagem 2",
          sent: new Date(),
        },
        {
          body: "Mensagem 3",
          sent: new Date(),
        },
        {
          body: "Mensagem 4",
          sent: new Date(),
        },
      ],
    },
  ]);
  const theme = useTheme();
  const [search, setSearch] = useState("");

  return (
    <ScreenContainer>
      <PageHeader title="Chats" titleExtra={<Text>b</Text>} sideOptions={[]} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CustomInput
          dense
          value={search}
          setValue={setSearch}
          search={() => {}}
          style={{ flexGrow: 1 }}
        />
        <OverlayMenu
          title="Sort"
          icon="dots-vertical"
          content={<SortOverlay />}
          footer={i18n.t("clear")}
        />
      </View>
      <ChatsList
        theme={theme}
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </ScreenContainer>
  );
};
