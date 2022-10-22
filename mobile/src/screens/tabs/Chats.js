import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Badge,
  ChatItem,
  CustomInput,
  CustomText,
  List,
  OnlineIcon,
  OverlayMenu,
  PageHeader,
} from "../../components";
import {
  QuickMatch,
  RequestsOverlay,
  SortOverlay,
} from "../../components/Chats";
import ScreenContainer from "../../components/ScreenContainer";

import { Row } from "../../components";
import i18n from "../../i18n";

const sorts = {
  name: {
    icon: "alphabetical-variant",
    defaultOrder: 1,
    sort: (a, b, order) =>
      order *
      (String(a.name).localeCompare(String(b.name), undefined, {
        ignorePunctuation: true,
        sensitivity: "base",
      }) || sorts["date"].sort(a, b, -1)),
  },
  date: {
    icon: "calendar",
    defaultOrder: -1,
    sort: (a, b, order) => order * (a.lastMessage.sent - b.lastMessage.sent),
  },
  status: {
    icon: "account-circle",
    defaultOrder: -1,
    sort: (a, b, order) =>
      order *
      (Number(a.online) - Number(b.online) || sorts["date"].sort(a, b, 1)),
    extra: <OnlineIcon sortIcon />,
  },
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

const PendingRequests = () => {
  const requestsAmount = 5;
  const [requests, setRequests] = useState(
    Array(requestsAmount)
      .fill()
      .map((_, k) => ({
        _id: k,
        name: Array(Math.floor(Math.random() * (15 - 3 + 1) + 3))
          .fill()
          .map(_ => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
          .join(""),
        avatar: {
          style: "Number",
          color: "String",
        },
      }))
  );

  return (
    <OverlayMenu
      title={i18n.t("requests")}
      icon="account-multiple"
      iconSize={20}
      badge={1}
      topSpacing={40}
      content={<RequestsOverlay requests={requests} />}
      // footer={i18n.t("clear")}
      // footerAction={() => setSort(defaultSort)}
    />
  );
};

export default Chats = () => {
  const defaultSort = { by: "date", order: -1 };
  const insets = useSafeAreaInsets();

  const chatsAmount = 15;
  const [chats, setChats] = useState(
    Array(chatsAmount)
      .fill()
      .map((_, k) => ({
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
          sent: new Date() - Math.floor(Math.random() * 100 * 100000),
        },
      }))
  );
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(defaultSort);

  const sortChats = (a, b) => sorts[sort.by].sort(a, b, sort.order);

  return (
    <ScreenContainer>
      <PageHeader
        title={i18n.t("chats")}
        // titleExtra={
        //   <OverlayMenu
        //     title={i18n.t("requests")}
        //     icon="account-multiple"
        //     iconSize={18}
        //     badge={1}
        //     topSpacing={35}
        //     content={<RequestsOverlay requests={requests} />}
        //     // footer={i18n.t("clear")}
        //     // footerAction={() => setSort(defaultSort)}
        //   />
        // }
        sideActions={[PendingRequests]}
      />
      <Row>
        <CustomInput
          dense
          value={search}
          setValue={setSearch}
          search={() => {}}
          style={{ flexGrow: 1 }}
        />
        <OverlayMenu
          title={i18n.t("sort")}
          icon="dots-vertical"
          content={<SortOverlay sort={sort} setSort={setSort} sorts={sorts} />}
          footer={i18n.t("clear")}
          footerAction={() => setSort(defaultSort)}
        />
      </Row>
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
