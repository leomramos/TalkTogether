import { API_URL } from "@env";
import { Icon } from "@react-native-material/core";
import axios from "axios";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useQuery } from "react-query";
import i18n from "../i18n";
import { groupBy } from "../utils/helpers";
import Chip from "./Chip";
import { Row } from "./Helpers";

export default LanguagesList = ({
  langs = [],
  small = false,
  removeLang = null,
}) => {
  const { colors, typography } = useTheme();
  const levels = ["beginner", "intermediate", "advanced", "native"];

  const languages = useQuery("listLanguages", () =>
    axios
      .post(`${API_URL}/languages`)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        throw e;
      })
  );

  return (
    <View>
      {groupBy(langs, "proficiency")
        .sort((a, b) => b[0].proficiency - a[0].proficiency)
        .map(level => (
          <Row
            key={`${level[0].proficiency}-langs-list`}
            style={{
              marginBottom: 5,
            }}
          >
            <Icon
              name={`network-strength-${level[0].proficiency}`}
              size={small ? 22 : 30}
              color={colors.proficiency[levels[level[0].proficiency - 1]]}
              style={{ marginRight: 5 }}
            />
            <ScrollView horizontal style={{ paddingVertical: 3 }}>
              {level.map(language => {
                const curLanguage = languages.data?.find(
                  l => l._id === language.languageId
                );
                return (
                  <Chip
                    key={`${language.languageId}-chip`}
                    text={curLanguage?.name || i18n.t("unknown")}
                    textStyle={typography.chip[small ? "small" : "regular"]}
                    remove={removeLang ? () => removeLang(language) : null}
                    color={
                      language.proficiency === 1
                        ? colors.gray.second
                        : colors.gray.ninth
                    }
                    background={
                      colors.proficiency[levels[language.proficiency - 1]]
                    }
                  />
                );
              })}
            </ScrollView>
          </Row>
        ))}
    </View>
  );
};
