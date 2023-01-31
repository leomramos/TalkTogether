import { IconButton, useTheme } from "react-native-paper";
import { PageHeader, ScreenContainer } from "../../components/";
import { UserProfile } from "../mocks";

import i18n from "../../i18n";

export default Profile = ({ route, navigation }) => {
  const user = route.params?.user;
  const { colors } = useTheme();

  const ReportButton = _ => (
    <IconButton
      icon="flag-outline"
      color={colors.gray.sixth}
      onPress={() => alert("a")}
      style={{ margin: 0 }}
    />
  );

  return (
    <ScreenContainer>
      <PageHeader
        title={i18n.t("profile")}
        goBack={navigation.goBack}
        sideActions={[ReportButton]}
      />
      <UserProfile
        name={user?.name}
        avatar={user?.avatar?.style}
        avatarColor={user?.avatar?.color}
        about={user?.about}
        langs={user?.languages}
      />
    </ScreenContainer>
  );
};
