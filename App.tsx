import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import FlashMessage from "react-native-flash-message";
import "react-native-gesture-handler";
import reducer, { initialState } from "./context/reducer";
import { StateProvider } from "./context/StateProvider";
import { TabNav } from "./navigation/TabNavigator";
import AddCar from "./screens/AddCarScreen";
import LoginScreen from "./screens/LoginScreen";
import RouteMapDetails from "./screens/RouteMapDetailsScreen";
import SignupScreen from "./screens/SignUpScreen";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "#F9F9F9",
    text: "#fff",
  },
};

export default function App() {
  const scheme = useColorScheme();
  // console.log(".........", scheme);
  //theme={ scheme === 'dark' ? DarkTheme : MyTheme}

  const [Token, setToken] = useState("");

  useEffect(() => {
    SecureStore.getItemAsync("token")
      .then((res) => {
        if (res) {
          setToken(res);
        } else {
          setToken("noToken");
        }
      })
      .catch((err) => SecureStore.deleteItemAsync("token"));
  }, []);

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : MyTheme}>
      <StateProvider initialState={initialState} reducer={reducer}>
        {Token == "noToken" ? (
          <Stack.Navigator initialRouteName={"LoginScreen"}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ header: () => null }}
            />

            <Stack.Screen
              name="TabNav"
              component={TabNav}
              options={{ header: () => null }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{ header: () => null }}
            />
          </Stack.Navigator>
        ) : (
          <>
            {Token ? (
              <Stack.Navigator initialRouteName={"TabNav"}>
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{ header: () => null }}
                />

                <Stack.Screen
                  name="TabNav"
                  component={TabNav}
                  options={{ header: () => null }}
                />
                <Stack.Screen
                  name="SignupScreen"
                  component={SignupScreen}
                  options={{ header: () => null }}
                />
                <Stack.Screen
                  name="AddCar"
                  component={AddCar}
                  options={{ header: () => null }}
                />
                <Stack.Screen
                  name="RouteMapDetails"
                  component={RouteMapDetails}
                  options={{ header: () => null }}
                />
              </Stack.Navigator>
            ) : null}
          </>
        )}

        <FlashMessage
          style={{ alignItems: "center" }}
          duration={3000}
          position="top"
        />
      </StateProvider>
    </NavigationContainer>
  );
}
