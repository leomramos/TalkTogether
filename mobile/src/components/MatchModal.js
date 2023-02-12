import { API_URL } from "@env";
import axios from "axios";
import { ScrollView, View } from "react-native";
import { IconButton, Modal, Portal, useTheme } from "react-native-paper";
import { useQuery } from "react-query";
import i18n from "../i18n";
import CustomText from "./CustomText";
import { Row } from "./Helpers";
import LanguagesList from "./LanguagesList";
import UserAvatar from "./UserAvatar";

export default MatchModal = ({ userId, navigation, list, setList }) => {
  const { colors, typography } = useTheme();
  const iconSize = 25;

  const profile = useQuery("getProfile" + list[0]?.userId, () =>
    axios
      .post(`${API_URL}/profiles`, { userId: list[0]?.userId })
      .then(res => res.data)
      .catch(e => {
        throw e;
      })
  );

  const handleBack = () => setList([]);

  const handleReport = () => {};

  const handleConfirm = () => {
    axios
      .post(`${API_URL}/chats/match`, { users: [userId, list[0].userId] })
      .then(res => {
        if (res.data) {
          navigation.navigate("Modals", {
            screen: "ChatModal",
            params: { chatId: res.data._id },
          });
        }
      })
      .catch(e => {
        throw e;
      });
    setList([]);
  };

  const handleCancel = () => {
    const newList = [...list];
    newList.shift();
    setList(newList);
  };

  return (
    <Portal>
      <Modal
        visible={list.length > 0}
        dismissable={false}
        contentContainerStyle={{
          marginHorizontal: 30,
          marginVertical: 80,
          backgroundColor: colors.gray.first,
          borderRadius: 20,
          paddingVertical: 15,
          paddingHorizontal: 18,
        }}
      >
        <Row
          style={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Row>
            <IconButton
              icon="chevron-left"
              color={colors.gray.seventh}
              onPress={handleBack}
              size={iconSize}
              style={{ margin: 0 }}
            />
            <IconButton
              icon="flag-outline"
              color={colors.gray.seventh}
              onPress={handleReport}
              size={iconSize}
              style={{ margin: 0, marginHorizontal: 5 }}
            />
          </Row>
          <UserAvatar
            size={70}
            plain
            avatar={profile?.data?.avatar?.style}
            color={profile?.data?.avatar?.color}
          />
          <Row>
            <IconButton
              icon="check"
              color={colors.aux.confirm}
              onPress={handleConfirm}
              size={iconSize}
              style={{ margin: 0, marginHorizontal: 5 }}
            />
            <IconButton
              icon="close"
              color={colors.aux.cancel}
              onPress={handleCancel}
              size={iconSize}
              style={{ margin: 0 }}
            />
          </Row>
        </Row>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <CustomText
            type={typography.profile.title}
            color={colors.gray.ninth}
            style={{ marginTop: 10, marginBottom: 5, textAlign: "center" }}
          >
            {profile?.data?.name || i18n.t("unknown")}
          </CustomText>
          {/* <CustomText
            type={typography.profile.about}
            color={colors.gray.seventh}
            style={{ textAlign: "center" }}
          >
            ★★★★★
          </CustomText> */}
        </View>
        <ScrollView
          style={{ maxHeight: 300 }}
          contentContainerStyle={{
            justifyContent: "center",
            marginTop: 20,
            paddingBottom: 15,
          }}
        >
          <View style={{ marginBottom: 15 }}>
            <CustomText
              type={typography.modal.title}
              color={colors.gray.ninth}
              style={{ marginBottom: 10 }}
            >
              {i18n.t("about")}
            </CustomText>
            <CustomText
              type={typography.modal.about}
              color={colors.gray.eighth}
              style={{ marginBottom: 10 }}
            >
              {profile?.data?.about || i18n.t("emptyAbout")}
            </CustomText>
          </View>
          <LanguagesList langs={profile?.data?.languages} small />
        </ScrollView>
      </Modal>
    </Portal>
  );
};
