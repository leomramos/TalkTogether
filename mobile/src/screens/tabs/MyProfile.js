import { useKeyboard } from "@react-native-community/hooks";
import { useEffect, useState } from "react";
import { IconButton, useTheme } from "react-native-paper";
import { useUser, useWarning } from "../../../App";
import { PageHeader, ScreenContainer } from "../../components/";
import { UserProfile } from "../mocks";

import i18n from "../../i18n";

export default MyProfile = ({ navigation }) => {
  const keyboard = useKeyboard();
  const { user, setUser } = useUser();
  const { setWarning } = useWarning();

  useEffect(
    _ =>
      keyboard.keyboardShown
        ? navigation.setOptions({
            tabBarStyle: { ...navigation.tabBarStyle, display: "none" },
          })
        : navigation.setOptions({
            tabBarStyle: {
              backgroundColor: colors.gray.first,
              paddingVertical: 5,
              display: "flex",
            },
          }),
    [keyboard.keyboardShown]
  );

  const { colors } = useTheme();

  const [editing, setEditing] = useState(Boolean(user.languages));
  const [editingPic, setEditingPic] = useState(false);
  const [savable, setSavable] = useState(true);

  const [avatar, setAvatar] = useState(user.avatar.style);

  const [avatarColor, setAvatarColor] = useState(user.avatar.color);

  const [name, setName] = useState(user.name);

  const [about, setAbout] = useState(user.about);

  const [languages, setLanguages] = useState(user.languages);

  useEffect(() => {
    setSavable(languages.length > 0);
  }, languages);

  const handleSave = _ => {
    if (savable) {
      setUser({
        ...user,
        name,
        about,
        avatar: { style: avatar, color: avatarColor },
        languages,
      });
      setEditing(false);
      setEditingPic(false);
    } else {
      setWarning(i18n.t("addLanguageError"));
    }
  };

  const handleCancel = _ => {
    setName(user.name);
    setAbout(user.about);
    setLanguages(user.languages);
    setAvatar(user.avatar.style);
    setAvatarColor(user.avatar.color);
    setEditing(false);
    setEditingPic(false);
  };

  const EditButton = _ => (
    <IconButton
      icon="square-edit-outline"
      color={colors.purple.sixth}
      onPress={() => setEditing(true)}
      style={{ margin: 0 }}
    />
  );

  const SaveButton = _ => (
    <IconButton
      icon="check"
      color={colors.aux.confirm}
      onPress={handleSave}
      style={{ marginVertical: 0 }}
    />
  );

  const CancelButton = _ => (
    <IconButton
      icon="close"
      color={colors.aux.cancel}
      onPress={handleCancel}
      disabled={user.languages.length < 1}
      style={{ margin: 0, opacity: user.languages.length > 0 ? 1 : 0.4 }}
    />
  );

  return (
    <ScreenContainer>
      <PageHeader
        title={i18n.t("myProfile")}
        sideActions={editing ? [CancelButton, SaveButton] : [EditButton]}
      />
      <UserProfile
        editable={editing}
        avatar={avatar}
        setAvatar={setAvatar}
        avatarColor={avatarColor}
        setAvatarColor={setAvatarColor}
        name={name}
        setName={setName}
        about={about}
        setAbout={setAbout}
        langs={languages}
        setLangs={setLanguages}
        addLangs={() =>
          navigation.navigate("Modals", {
            screen: "LanguagesModal",
          })
        }
        editingPic={editingPic}
        setEditingPic={setEditingPic}
        savable={savable}
      />
    </ScreenContainer>
  );
};
