import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native";

import { getAuth, signOut } from "firebase/auth";

// Screens
import CameraScreen from "../screens/CameraScreen";
import CameraStack from "../navigation/CameraStack";
import StoriesScreen from "../screens/StoriesScreen";
// import MapScreen from "../screens/MapScreen";
// import SpotlightScreen from "../screens/SpotlightScreen";

// Stacks
import ChatStack from "./ChatStack";

const Tab = createBottomTabNavigator();

export default function UserStack() {
  const auth = getAuth();
  const user = auth.currentUser;

  let screenOptions = {
    tabBarShowLabel: false,
    headerLeft: () => (
      <Button
        onPress={() => {
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              user = null;
            })
            .catch((error) => {
              // An error happened.
              // should we do something with that error??
            });
        }}
        title="Log Out"
      />
    ),
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#694fad' }}
        initialRouteName="CameraStack"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            let iconName;
            let iconColor;

            if (route.name == "Map") {
              iconName = "ios-location-outline";
              iconColor = focused ? "green" : "grey";
            } else if (route.name === "ChatStack") {
              iconName = "ios-chatbox-outline";
              iconColor = focused ? "#2b83b3" : "grey";
            } else if (route.name === "CameraStack") {
              iconName = focused ? "ios-scan-circle-outline" : "ios-camera-outline";
              iconColor = focused ? "yellow" : "grey";
            } else if (route.name === "Stories") {
              iconName = "ios-people-outline";
              iconColor = focused ? "purple" : "grey";
            }
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
          tabBarStyle: { backgroundColor: "#000" },
        })}
      >
        {/* <Tab.Screen name="Map" component={MapScreen} options={{...screenOptions, headerShown: false}} /> */}
        <Tab.Screen name="ChatStack" component={ChatStack} options={{ headerShown: false, tabBarShowLabel: false }} />
        <Tab.Screen
          name="CameraStack"
          component={CameraStack}
          options={{ headerShown: false, tabBarShowLabel: false }} 
        />
        <Tab.Screen
          name="Stories"
          component={StoriesScreen}
          options={screenOptions}
        />
        {/* <Tab.Screen
          name="Spotlight"
          component={SpotlightScreen}
          options={screenOptions}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
