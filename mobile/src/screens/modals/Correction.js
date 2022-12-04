import { FlatList, Text, View } from "react-native";
import { PageHeader } from "../../components/";

import i18n from "../../i18n";

export default Correction = ({ route, navigation }) => {
  const msgs = route.params.msg.split(".");

  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("corrections")} goBack={navigation.goBack} />
      <FlatList
        data={msgs}
        renderItem={({ item }) => (
          <View>
            <Text>{item.trim()}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
};
