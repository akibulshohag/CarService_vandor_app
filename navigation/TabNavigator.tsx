import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
//context api
import { Text } from "react-native";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import CarList from "../screens/CarListScreen";
import HomeScreen from "../screens/HomeScreen";
import RouteMap from "../screens/RouteMapScreen";

export function TabNav() {
  const Tab = createBottomTabNavigator();
  const [{ userName, userId }]: any = useStateValue();
  const [state, dispatch]: any = useStateValue();
  const isFocused = useIsFocused();

  // console.log("........", userName);
  // console.log("........", userId);

  useEffect(() => {
    SecureStore.getItemAsync("userName").then((res) => {
      dispatch({
        type: actionTypes.GET_USER,
        userName: res,
      });
    });

    SecureStore.getItemAsync("userId").then((res) => {
      dispatch({
        type: actionTypes.GET_USER_ID,
        userId: res,
      });
    });
  }, [userName, userId, isFocused]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#FCB042" : "#000", fontSize: 12 }}>
              {" "}
              Home
            </Text>
          ),

          // unmountOnBlur: true,
          header: () => null,

          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="home"
              size={25}
              color={focused ? "#FCB042" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CarList"
        component={CarList}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#FCB042" : "#000", fontSize: 12 }}>
              {" "}
              Car
            </Text>
          ),

          // unmountOnBlur: true,
          header: () => null,

          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="car"
              size={25}
              color={focused ? "#FCB042" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="RouteMap"
        component={RouteMap}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#FCB042" : "#000", fontSize: 12 }}>
              {" "}
              Route Map
            </Text>
          ),

          // unmountOnBlur: true,
          header: () => null,

          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="route"
              size={25}
              color={focused ? "#FCB042" : "#000"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
