import { useRef, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { CustomText, PageHeader, Row } from "../../components/";

import i18n from "../../i18n";

const Sentence = ({ item, corrections, setCorrections }) => {
  const { colors, typography } = useTheme();
  const input = useRef();

  item = item.trim();

  const [correction, setCorrection] = useState(null);

  return (
    <View style={{ paddingVertical: 20 }}>
      <CustomText
        type={typography.correction.original}
        color={colors.gray.eighth}
        style={{ paddingRight: 15 }}
      >
        {item}
      </CustomText>
      <Row style={{ justifyContent: "space-between" }}>
        <TextInput
          ref={input}
          value={correction}
          onChangeText={text => {
            setCorrection(text);
            const newCorrections = JSON.parse(JSON.stringify(corrections));
            if (correction === item || !correction) {
              delete newCorrections[item];
              setCorrections(newCorrections);
            } else {
              newCorrections[item] = text.trim();
              setCorrections(newCorrections);
            }
          }}
          onFocus={() => !correction && setCorrection(item)}
          onBlur={() => {
            setCorrection(correction.trim());
          }}
          placeholder={item}
          placeholderTextColor={colors.gray.sixth}
          selectionColor={colors.purple.sixth}
          style={{
            color: colors.gray.ninth,
            fontFamily: typography.correction.edited.font,
            fontSize: typography.correction.edited.size.number,
            flex: 1,
          }}
        />
        <IconButton
          icon="pencil"
          color={colors.gray.ninth}
          size={20}
          onPress={() => input && input.current.focus()}
          style={{ marginHorizontal: 10 }}
        />
      </Row>
    </View>
  );
};

export default Correction = ({ route, navigation }) => {
  const msgs = route.params.msg.split(".");
  const { colors } = useTheme();

  const [corrections, setCorrections] = useState({});

  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("corrections")} goBack={navigation.goBack} />
      <FlatList
        data={msgs}
        renderItem={({ item }) => (
          <Sentence
            item={item}
            corrections={corrections}
            setCorrections={setCorrections}
          />
        )}
      />
      <IconButton
        icon="send"
        disabled={Object.keys(corrections).length === 0}
        size={45}
        color={colors.purple.eighth}
        onPress={() =>
          navigation.navigate("ChatModal", {
            user: route.params.user,
            correction: {
              body: corrections,
              from: Math.random() > 0.5,
              type: "correction",
            },
          })
        }
        style={{ position: "absolute", right: 15, bottom: 15 }}
      />
    </ScreenContainer>
  );
};
