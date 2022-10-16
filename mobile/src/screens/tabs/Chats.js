import React, { useState } from "react";
import { Text, View } from "react-native";
import { Divider, IconButton, Menu, useTheme } from "react-native-paper";
import {
  ChatItem,
  CustomInput,
  List,
  OverlayMenu,
  PageHeader,
} from "../../components";
import ScreenContainer from "../../components/ScreenContainer";

import i18n from "../../i18n";

const SortOverlay = () => {
  return (
    <>
      <IconButton icon="at" color="black" size={25} onPress={() => {}} />
      <IconButton icon="at" color="black" size={25} onPress={() => {}} />
      <IconButton icon="at" color="black" size={25} onPress={() => {}} />
      <IconButton icon="at" color="black" size={25} onPress={() => {}} />
      <IconButton icon="at" color="black" size={25} onPress={() => {}} />
      {/* <Menu.Item onPress={() => {}} title="Ale" />
      <Menu.Item onPress={() => {}} title="Te" />
      <Divider />
      <Menu.Item onPress={() => {}} title="Amo" /> */}
    </>
  );
};

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

const renderItem = ({ item }) => {
  return <ChatItem name={item.name} />;
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
    {
      _id: "6",
      name: "Teste 6",
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
      _id: "7",
      name: "Teste 7",
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
      _id: "8",
      name: "Teste 8",
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
      _id: "9",
      name: "Teste 9",
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
      _id: "10",
      name: "Teste 10",
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
      _id: "11",
      name: "Teste 11",
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
      _id: "12",
      name: "Teste 12",
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
      _id: "13",
      name: "Teste 13",
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
      <List
        theme={theme}
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </ScreenContainer>
  );
};
