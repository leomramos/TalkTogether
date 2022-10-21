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
import ScreenContainer from "../../components/ScreenContainer";

import i18n from "../../i18n";

const QuickMatch = () => {
  const { colors, typography } = useTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton
        style={{
          marginLeft: 0,
          marginRight: 5,
        }}
        icon="plus"
        size={20}
        color={colors.purple.seventh}
        onPress={() => {}}
      />
      <CustomText type={typography.button} color={colors.gray.ninth}>
        Quick Match
      </CustomText>
    </View>
  );
};

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

const SortOverlay = ({ sort, setSort, theme }) => {
  return (
    <>
      {Object.entries(sorts).map(([s, { icon, extra, defaultOrder }]) => (
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
            onPress={() => setSort({ by: s, order: defaultOrder })}
          />
          {extra}
        </View>
      ))}
      <IconButton
        icon={sort.order === 1 ? "sort-descending" : "sort-ascending"}
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
  const defaultSort = { by: "date", order: -1 };
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
        titleExtra={
          <View style={{ position: "relative" }}>
            <IconButton
              icon="account-multiple"
              style={{ marginLeft: 0 }}
              size={18}
              color={theme.colors.gray.eighth}
              onPress={() => {}}
            />
            <Badge
              size={10}
              color={theme.colors.gray.sixth}
              style={{ position: "absolute", top: 8, right: 8 }}
            >
              <CustomText
                type={theme.typography.requests.badge}
                color={theme.colors.gray.ninth}
              >
                1
              </CustomText>
            </Badge>
          </View>
        }
        sideOptions={[QuickMatch]}
      />
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
