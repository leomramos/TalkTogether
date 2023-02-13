import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Checkbox,
  Divider,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Styled from "styled-components/native";
import { useSocket, useUser, useWarning } from "../../App";
import CustomText from "./CustomText";
import { Row } from "./Helpers";
import NavigateBack from "./NavigateBack";
import OverlayMenu from "./OverlayMenu";
import UserAvatar from "./UserAvatar";

import i18n from "../i18n";

const HeaderWrapper = Styled(Row)`
  margin-left: -${({ screen }) => screen.padding.left}px;
  justify-content: space-between;
  background-color: ${({ colors }) => colors.gray.first};
  position: relative;
  z-index: 1;
`;

const UserInfo = Styled.View`
  margin-left: 10px;
`;

const ChatPerms = ({ other, perms, setPerms, colors, typography }) => {
  const { setWarning } = useWarning();
  const { socket } = useSocket();
  const { user } = useUser();
  const [requests, setRequests] = useState([]);

  const fetchRequests = _ => {
    axios
      .post(`${API_URL}/requests/search`, {
        requester: user._id,
        target: other.userId,
      })
      .then(res => setRequests(res.data))
      .catch(e => {
        throw e;
      });
  };

  useEffect(fetchRequests, []);

  const [socketEventsAdded, setSocketEventsAdded] = useState(false);

  const addSocketEvents = () => {
    socket.on("requestsUpdate", _ => {
      fetchRequests();
    });

    setSocketEventsAdded(true);
  };

  useEffect(() => {
    setTimeout(() => {
      socket.id && !socketEventsAdded && addSocketEvents();
    }, 1000);
  }, [socket.connected]);

  const newRequest = action => {
    const request = {
      requester: user._id,
      target: other.userId,
      action,
    };

    axios
      .post(`${API_URL}/requests/create`, request)
      .then(_ => {
        setRequests([...requests, request]);
        fetchRequests;
      })
      .catch(e => {
        throw e;
      });
  };

  const deleteRequest = (action, actor) => {
    let request;
    switch (actor) {
      case "self":
        request = {
          requester: user._id,
          target: other.userId,
          action,
        };

        break;
      case "other":
        request = {
          requester: other.userId,
          target: user._id,
          action,
        };
        break;
    }

    axios
      .post(`${API_URL}/requests/remove`, request)
      .then(_ => {
        setRequests(
          requests.filter(
            req => JSON.stringify(req) !== JSON.stringify(request)
          )
        );
        fetchRequests;
      })
      .catch(e => {
        throw e;
      });
  };

  return (
    <View>
      {Object.entries(perms).map(([p, s]) => (
        <Row key={p + "Perm"}>
          <Checkbox
            onPress={() => {
              const newPerms = JSON.parse(JSON.stringify(perms));
              switch (s) {
                case "disabled":
                  newPerms[p] = "pending";
                  newRequest(p);
                  break;
                case "pending":
                  if (requests.findIndex(req => req.action === p) !== -1) {
                    newPerms[p] = "disabled";
                    deleteRequest(p, "self");
                  } else {
                    newPerms[p] = "enabled";
                    deleteRequest(p, "other");
                  }

                  break;
                case "enabled":
                  newPerms[p] = "disabled";
                  break;
              }

              socket.emit("requestsUpdate", { to: other.userId });
              fetchRequests();
              setPerms(newPerms);
              socket.emit("changedPerms", {
                to: other.userId,
              });
            }}
            uncheckedColor={
              s === "pending" ? colors.purple.eighth : colors.gray.sixth
            }
            color={colors.purple.sixth}
            status={
              s === "enabled"
                ? "checked"
                : s === "pending"
                ? "indeterminate"
                : "unchecked"
            }
          />
          <CustomText
            type={typography.message.preview}
            color={colors.gray.ninth}
            style={{ marginRight: 5 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {i18n.t(p + "Perm")}
          </CustomText>
        </Row>
      ))}
    </View>
  );
};

export default ChatHeader = ({ user, goBack, perms, setPerms }) => {
  const navigation = useNavigation();
  const { colors, typography, screen } = useTheme();

  return (
    <HeaderWrapper colors={colors} screen={screen}>
      <Row style={{ paddingRight: 15 }}>
        <NavigateBack action={goBack} />
        <TouchableRipple
          onPress={() => navigation.navigate("ProfileModal", { user })}
          style={{ flex: 1, marginRight: 5 }}
        >
          <Row
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}
          >
            <UserAvatar
              avatar={user?.avatar?.style}
              color={user?.avatar?.color}
              size={40}
              offline={!user?.online}
              plain
              // flag={user?.country && user.country[0].flagPath}
            />
            <UserInfo style={{ flex: 1 }}>
              <CustomText
                type={typography.chat.name}
                color={colors.gray.ninth}
                style={{ marginRight: 5 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user?.name || i18n.t("unknown")}
              </CustomText>
              {user?.online && (
                <CustomText
                  type={typography.chat.status}
                  color={colors.gray.seventh}
                  style={{ marginRight: 5, textTransform: "lowercase" }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {i18n.t("online")}
                </CustomText>
              )}
            </UserInfo>
          </Row>
        </TouchableRipple>
        <OverlayMenu
          title={i18n.t("permissions")}
          icon="cog"
          iconSize={20}
          topSpacing={40}
          content={
            <ChatPerms
              other={user}
              perms={perms}
              setPerms={setPerms}
              colors={colors}
              typography={typography}
            />
          }
        />
      </Row>
      <Divider
        style={{
          height: 2,
          backgroundColor: colors.gray.fifth,
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
        }}
      />
    </HeaderWrapper>
  );
};
