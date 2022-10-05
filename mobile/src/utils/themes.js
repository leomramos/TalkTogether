import { DefaultTheme } from "react-native-paper";

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default AppTheme = {
  get: t => {
    switch (t) {
      case "dark":
        return darkTheme;
    }
  },
};
