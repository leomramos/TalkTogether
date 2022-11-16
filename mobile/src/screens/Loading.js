import { ActivityIndicator, View } from "react-native";
import { useTheme } from "react-native-paper";

export default LoadingScreen = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.gray.second,
      }}
    >
      <ActivityIndicator size="large" color={colors.gray.ninth} />
    </View>
  );
};
