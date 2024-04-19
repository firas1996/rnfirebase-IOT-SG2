import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const params = useRoute();
  console.log(params.params.uid);
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          navigation.navigate("AddArticle", { uid: params.params.uid });
        }}
      >
        AddArticle
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
