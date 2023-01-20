import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { OleoScript_700Bold } from "@expo-google-fonts/oleo-script";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { API_URL, WS_URL } from "@env";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import io from "socket.io-client";
import LoadingScreen from "./src/screens/Loading";

import i18n from "./src/i18n";
import AppStack from "./src/navigators/AppNavigator";
import Theme from "./src/utils/themes";

const queryClient = new QueryClient();

const User = createContext();
const Socket = createContext();
const Warning = createContext();

export default function App() {
  let [fontsLoaded] = useFonts({
    OleoScript_700Bold,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const scheme = useColorScheme();
  // add theme switch functionality

  // const storage = new MMKVLoader().initialize();
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [socket, setSocket] = useState({});

  const socketConnect = () => {
    setSocket(
      io(WS_URL, {
        transports: ["websocket"],
        query: {
          user: JSON.stringify({ id: user._id, languages: profile.languages }),
        },
      })
    );
  };

  // useMMKVStorage("user", storage);

  const [profileFetched, setProfileFetched] = useState(false);

  const getProfile = () =>
    user._id &&
    axios
      .post(`${API_URL}/profiles`, { userId: user._id })
      .then(res => {
        res.data
          ? setProfile(res.data) && setProfileFetched(true)
          : setWarning(i18n.t("unknownError"));
      })
      .catch(e => {
        throw e;
      });

  const saveProfile = () =>
    axios
      .post(`${API_URL}/profiles/save`, profile)
      .then(res => {
        res.status === 200
          ? setWarning(i18n.t("savedSuccessfully"))
          : setWarning(i18n.t("unknownError"));
      })
      .catch(e => {
        throw e;
      });

  useEffect(() => {
    getProfile();
  }, [user._id]);

  useEffect(() => {
    if (profileFetched) {
      saveProfile();
    } else {
      setProfileFetched(Boolean(profile._id));
    }
  }, [profile]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <User.Provider
        value={{ user, setUser, profile, setProfile, saveProfile }}
      >
        <Socket.Provider value={{ socket, socketConnect }}>
          <Warning.Provider
            value={{ warning, setWarning, clearWarning: () => setWarning("") }}
          >
            <QueryClientProvider client={queryClient}>
              <PaperProvider theme={Theme.get("dark")}>
                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                  <SafeAreaProvider>
                    <StatusBar style={scheme === "dark" ? "light" : "dark"} />
                    {fontsLoaded || user?.isLoading ? (
                      <NavigationContainer>
                        <AppStack />
                      </NavigationContainer>
                    ) : (
                      <LoadingScreen />
                    )}
                  </SafeAreaProvider>
                </IconComponentProvider>
              </PaperProvider>
            </QueryClientProvider>
          </Warning.Provider>
        </Socket.Provider>
      </User.Provider>
    </GestureHandlerRootView>
  );
}

export const useUser = () => useContext(User);
export const useSocket = () => useContext(Socket);
export const useWarning = () => useContext(Warning);
