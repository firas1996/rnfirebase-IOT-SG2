import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUpScreen from "./Screens/SignUpScreen";
import SignInScreen from "./Screens/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import AddArticle from "./Screens/AddArticle";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
const Stack = createStackNavigator();

export default function App() {
  const [test, setTest] = useState(false);
  useEffect(() => {
    (async () => {
      console.log("ss");
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status != "granted") {
          console.log("permission not granted");
          return;
        }
        setTimeout(async () => {
          let position = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
          });
          setTest(!test);
          console.log(position);
        }, 5000);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [test]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen
          options={{ gestureEnabled: false, headerLeft: null }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="AddArticle" component={AddArticle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
