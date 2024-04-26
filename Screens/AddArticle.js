import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "../Firebase";
const dbh = getFirestore();
const AddArticle = () => {
  const params = useRoute();
  const [data, setData] = useState({ title: "", descreption: "" });
  const navigation = useNavigation();
  const [abc, setAbc] = useState(false);
  const inputChangeHandler = (value, name) => {
    // console.log(value, name);
    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const createArticle = async () => {
    try {
      const docRef = await addDoc(collection(dbh, "Articles"), {
        title: data.title,
        des: data.descreption,
        owner: params.params.uid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  useEffect(() => {
    setTimeout(async () => {
      let requestData = query(collection(dbh, "Articles"));
      let response = await getDocs(requestData);
      response.forEach((item) => {
        console.log(item.id, "  =>  ", item.data().owner);
      });
      setAbc(!abc);
    }, 3000);
  }, [abc]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add article</Text>
      {/* {error && <Text style={styles.error}>{error}</Text>} */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(e) => inputChangeHandler(e, "title")}
        // value={data.title}
      />
      <TextInput
        style={styles.input}
        placeholder="Descreption"
        onChangeText={(e) => inputChangeHandler(e, "descreption")}
        value={data.descreption}
      />
      <Button title="Add" onPress={createArticle} />
      <Text
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={styles.forgotPassword}
      >
        Go to list
      </Text>
    </View>
  );
};

export default AddArticle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 10,
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
