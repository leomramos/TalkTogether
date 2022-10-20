import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Divider, IconButton, Menu, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChatItem,
  CustomInput,
  List,
  OnlineIcon,
  OverlayMenu,
  PageHeader,
} from "../../components";
import ScreenContainer from "../../components/ScreenContainer";
import UserAvatar from "../../components/UserAvatar";

import i18n from "../../i18n";

const sorts = {
  name: {
    icon: "alphabetical-variant",
    sort: (a, b, order) =>
      order *
      (String(a.name).localeCompare(String(b.name), undefined, {
        ignorePunctuation: true,
        sensitivity: "base",
      }) || sorts["date"].sort(a, b, -1)),
  },
  date: {
    icon: "calendar",
    sort: (a, b, order) => order * (a.lastMessage.sent - b.lastMessage.sent),
  },
  status: {
    icon: "account-circle",
    sort: (a, b, order) =>
      -order *
      (Number(a.online) - Number(b.online) || sorts["date"].sort(a, b, -1)),
    extra: <OnlineIcon sortIcon />,
  },
};

const SortOverlay = ({ sort, setSort, theme }) => {
  return (
    <>
      {Object.entries(sorts).map(([s, { icon, extra }]) => (
        <View key={`sort-${s}`} style={{ position: "relative" }}>
          <IconButton
            style={{
              marginLeft: 0,
              marginRight: 5,
            }}
            icon={icon}
            color={
              sort.by === s ? theme.colors.gray.ninth : theme.colors.gray.sixth
            }
            size={25}
            onPress={() => setSort({ by: s, order: sort.order })}
          />
          {extra}
        </View>
      ))}
      <IconButton
        icon={sort.order === 1 ? "sort-ascending" : "sort-descending"}
        color={theme.colors.gray.ninth}
        size={15}
        style={{ marginLeft: 10, marginRight: 0 }}
        onPress={() => setSort({ by: sort.by, order: -sort.order })}
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
  const defaultSort = { by: "date", order: 1 };
  const insets = useSafeAreaInsets();

  const chatsAmount = 15;
  const [chats, setChats] = useState(
    Array(chatsAmount)
      .fill()
      .map((v, k) => ({
        _id: k,
        name: Array(Math.floor(Math.random() * (15 - 3 + 1) + 3))
          .fill()
          .map(_ => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
          .join(""),
        online: Math.random() < 0.5,
        lastMessage: {
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
          sent: new Date() - Math.floor(Math.random() * 100 * 1000),
        },
      }))
  );
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(defaultSort);

  const sortChats = (a, b) => sorts[sort.by].sort(a, b, sort.order);

  return (
    <ScreenContainer>
      <PageHeader title="Chats" titleExtra={<Text>b</Text>} sideOptions={[]} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
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
          content={<SortOverlay sort={sort} setSort={setSort} theme={theme} />}
          footer={i18n.t("clear")}
          footerAction={() => setSort(defaultSort)}
        />
      </View>
      <List
        style={{ marginBottom: -insets.bottom }}
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
