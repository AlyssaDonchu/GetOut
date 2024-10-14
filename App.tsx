// App.tsx
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "./context/userContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SignInScreen from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TasksScreen from "./screens/TasksScreen";
import PlanScreen from "./screens/PlanScreen";
import ChartsScreen from "./screens/ChartsScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import { RootStackParamList } from "./types";
import PhoneSignInScreen from "./screens/PhoneSignInScreen";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeButton = (props) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        backgroundColor: "#2196F3",
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
      }}
      onPress={() => navigation.navigate("Home")}
    >
      <MaterialIcons name="home" size={24} color="white" />
    </Pressable>
  );
};

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
  </Stack.Navigator>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconColor = focused ? "#2196F3" : "gray";
          if (route.name === "Tasks") {
            return (
              <MaterialIcons name="task-alt" size={24} color={iconColor} />
            );
          } else if (route.name === "Charts") {
            return (
              <MaterialIcons
                name="insert-chart-outlined"
                size={24}
                color={iconColor}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <MaterialIcons
                name="account-circle"
                size={24}
                color={iconColor}
              />
            );
          } else if (route.name === "Plan") {
            return (
              <MaterialIcons
                name="assignment-add"
                size={24}
                color={iconColor}
              />
            );
          } else if (route.name === "Home") {
            return <MaterialIcons name="home" size={24} color={iconColor} />;
          }

          return null;
        },
        tabBarActiveTintColor: "gray",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarButton: (props) => <HomeButton {...props} />,
        }}
      />
      <Tab.Screen name="Charts" component={ChartsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="PhoneSignInScreen">
      <Stack.Screen name="PhoneSignInScreen" component={PhoneSignInScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  const { isAuthChecked, user } = useUserContext();

  if (!isAuthChecked) {
    return (
      <ActivityIndicator
        animating
        size="large"
        color="#2196F3"
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>{!!user ? <Tabs /> : <AuthStack />}</SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
