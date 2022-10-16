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

const SortOverlay = ({ sort, setSort }) => {
  return (
    <>
      <IconButton
        icon="alphabetical-variant"
        color={sort.by === "name" ? "white" : "black"}
        size={25}
        onPress={() => setSort({ by: "name", order: sort.order })}
      />
      <IconButton
        icon="calendar"
        color={sort.by === "date" ? "white" : "black"}
        size={25}
        onPress={() => setSort({ by: "date", order: sort.order })}
      />
      <IconButton
        icon="account"
        color={sort.by === "status" ? "white" : "black"}
        size={25}
        onPress={() => setSort({ by: "status", order: sort.order })}
      />
    </>
  );
};

const renderItem = ({ item }) => {
  return (
    <ChatItem
      name={item.name}
      offline={!item.online}
      lastMessage={item.lastMessage}
    />
  );
};

export default Chats = () => {
  const defaultSort = { by: "date", order: -1 };
  const [chats, setChats] = useState([
    {
      _id: "1",
      name: "Teste 1",
      online: true,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date() - 1000,
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date() - 1000,
      },
    },
    {
      _id: "2",
      name: "Teste 2",
      online: false,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date(),
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date(),
      },
    },
    {
      _id: "3",
      name: "Teste 3",
      online: true,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date() - 2000,
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date() - 2000,
      },
    },
    {
      _id: "4",
      name: "Teste 4",
      online: false,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date() - 5000,
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date() - 5000,
      },
    },
    {
      _id: "5",
      name: "Teste 5",
      online: true,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date() - 500,
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date() - 500,
      },
    },
    {
      _id: "6",
      name: "Teste 6",
      online: true,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date() - 100,
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date() - 100,
      },
    },
    {
      _id: "7",
      name: "Teste 7",
      online: true,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date(),
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date(),
      },
    },
    {
      _id: "8",
      name: "Teste 8",
      online: false,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date(),
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date(),
      },
    },
    {
      _id: "9",
      name: "Teste 9",
      online: false,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date(),
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date(),
      },
    },
    {
      _id: "10",
      name: "Teste 10",
      online: true,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date(),
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date(),
      },
    },
    {
      _id: "11",
      name: "Teste 11",
      online: false,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date(),
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date(),
      },
    },
    {
      _id: "12",
      name: "Teste 12",
      online: true,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date(),
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date(),
      },
    },
    {
      _id: "13",
      name: "Teste 13",
      online: false,
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
          body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
          sent: new Date() - 5000,
        },
      ],
      lastMessage: {
        body: "Elit non in sint aliquip amet sint et proident amet. Fugiat aliquip cillum officia nostrud dolore elit aliquip culpa aute id incididunt labore ea officia. Cillum nisi qui voluptate tempor magna occaecat laborum Lorem. Consectetur ad ex ex dolore reprehenderit voluptate ad labore culpa et laboris. Pariatur consectetur ut enim consectetur. Nisi veniam sit adipisicing elit enim excepteur fugiat adipisicing. Reprehenderit aliquip incididunt do quis amet occaecat exercitation qui.",
        sent: new Date() - 5000,
      },
    },
  ]);
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(defaultSort);

  const sorts = {
    name: (a, b, order) => order * String(a.name).localeCompare(String(b.name)),
    date: (a, b, order) => order * (a.lastMessage.sent - b.lastMessage.sent),
    status: (a, b, order) =>
      order * (Number(a.online) - Number(b.online) || sorts["date"](a, b, -1)),
  };

  const sortChats = (a, b) => sorts[sort.by](a, b, sort.order);

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
          content={<SortOverlay sort={sort} setSort={setSort} />}
          footer={i18n.t("clear")}
          footerAction={() => setSort(defaultSort)}
        />
      </View>
      <List
        theme={theme}
        data={chats
          .filter(el => el.name.search(new RegExp(search, "i")) !== -1)
          .sort(sortChats)}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </ScreenContainer>
  );
};
