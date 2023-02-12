import { API_URL } from "@env";
import axios from "axios";
import { IconButton, useTheme } from "react-native-paper";
import { useQuery } from "react-query";
import { useUser, useWarning } from "../../../App";
import { PageHeader, ScreenContainer } from "../../components/";
import { UserProfile } from "../mocks";

import i18n from "../../i18n";

export default Profile = ({ route, navigation }) => {
  const u = route.params?.user;
  const { user } = useUser();
  const { setWarning } = useWarning();
  const { colors } = useTheme();

  const reported = useQuery(`${user}-reported-${u.userId}`, () =>
    axios
      .post(`${API_URL}/reports/check`, { by: user, user: u.userId })
      .then(res => res.data)
      .catch(e => {
        throw e;
      })
  );

  const handleReport = () => {
    axios
      .post(`${API_URL}/reports/new`, { by: user, user: u.userId })
      .then(res => {
        if (res.data) {
          reported.refetch();
          setWarning(i18n.t("userReported"));
        }
      })
      .catch(e => {
        throw e;
      });
  };

  const ReportButton = _ => (
    <IconButton
      icon="flag-outline"
      color={colors.gray.sixth}
      disabled={reported.data?.length}
      onPress={handleReport}
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
        name={u?.name}
        avatar={u?.avatar?.style}
        avatarColor={u?.avatar?.color}
        about={u?.about}
        langs={u?.languages}
      />
    </ScreenContainer>
  );
};
