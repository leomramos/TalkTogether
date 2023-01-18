import { useKeyboard } from "@react-native-community/hooks";
import { useEffect, useState } from "react";
import { IconButton, useTheme } from "react-native-paper";
import { useUser, useWarning } from "../../../App";
import { PageHeader, ScreenContainer } from "../../components/";
import { UserProfile } from "../mocks";

import i18n from "../../i18n";

export default MyProfile = ({ navigation }) => {
  const keyboard = useKeyboard();
  const { profile, setProfile, saveProfile } = useUser();

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

  const [editing, setEditing] = useState(false);
  const [editingPic, setEditingPic] = useState(false);
  const [savable, setSavable] = useState(true);

  const [avatar, setAvatar] = useState(profile.avatar?.style);

  const [avatarColor, setAvatarColor] = useState(profile.avatar?.color);

  const [name, setName] = useState(profile.name);

  const [about, setAbout] = useState(profile.about);

  const languages = profile.languages;
  const setLanguages = langs => setProfile({ ...profile, languages: langs });

  const handleSave = _ => {
    if (savable) {
      setProfile({
        ...profile,
        name,
        about,
        avatar: { style: avatar, color: avatarColor },
      });
      saveProfile();
      setEditing(false);
      setEditingPic(false);
    }
  };

  const handleCancel = _ => {
    setName(profile.name);
    setAbout(profile.about);
    setAvatar(profile.avatar.style);
    setAvatarColor(profile.avatar.color);
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
      style={{ margin: 0 }}
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
        ownProfile
      />
    </ScreenContainer>
  );
};
