import { DefaultTheme } from "react-native-paper";

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  text: {
    pageTitle: {
      font: "Inter_700Bold",
      size: "24px",
      color: "#FDFDFD",
    },
  },
  colors: {
    ...DefaultTheme.colors,
    background: "#21212B",
    focused: "#9D4EDD",
    unfocused: "#909095",
    surface: "#181820",
  },
};

export default Theme = {
  get: t => {
    switch (t) {
      case "dark":
        return darkTheme;
    }
  },
};
