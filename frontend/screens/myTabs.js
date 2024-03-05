import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CreateTab from "./createTab.js";
import LogTab from "./logTab.js";
import ProfileTab from "./profileTab.js";
import StatsTab from "./statsTab.js";
import Landing from "./landing.js";
import SignIn from "./signIn.js";
import SignUp from "./signUp.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MyTabs({ authorized, setIsAuthorized }) {
  return authorized ? (
    <Tab.Navigator
      initialRouteName="CreateTab"
      screenOptions={{
        tabBarActiveTintColor: "#38A3A5",
      }}
    >
      <Tab.Screen
        name="Create Workout"
        component={CreateTab}
        options={{
          tabBarLabel: "Create",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-edit-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Log Workout"
        component={LogTab}
        options={{
          tabBarLabel: "Log",
          headerShown: true,
          headerBackground: () => (
            <LinearGradient
            colors={["rgba(56, 163, 165, 0.25)", "rgba(128, 237, 153, 0.75)"]}
            style={{ flex: 1 , justifyContent: 'center'}}  
            >
              <MaterialCommunityIcons name="dumbbell" size={30} color='#58a1a3' style={{marginTop:15, marginLeft:275,}} />
            </LinearGradient>
          ),
          headerTitle: 'Exercise Companion',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Workout Statistics"
        component={StatsTab}
        options={{
          tabBarLabel: "Stats",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-line"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: true,
        }}
      >
        {(props) => <ProfileTab {...props} setIsAuthorized={setIsAuthorized} />}
      </Tab.Screen>
    </Tab.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignUp">
        {(props) => <SignUp {...props} setIsAuthorized={setIsAuthorized} />}
      </Stack.Screen>
      <Stack.Screen name="SignIn">
        {(props) => <SignIn {...props} setIsAuthorized={setIsAuthorized} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
