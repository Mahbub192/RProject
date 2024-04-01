import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../components/ct_searchbar";
import COLORS from "../styles/colors";
import RenderNote from "../RenderNotes";

export default function index() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("node");
          let userValue = jsonValue != null ? JSON.parse(jsonValue) : [];
          setData(userValue);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log(err);
          alert("Error loading notes");
        }
      };
      getData();
    }, [])
  );

  // useEffect(() => {
  //   setLoading(true);
  //   console.log(48, 'hello')
  //   const getImage = async () => {
  //     const jsonValue = await AsyncStorage.getItem("node");
  //     let userValue = jsonValue != null ? JSON.parse(jsonValue) : [];
  //     console.log(49, userValue);
  //     setData(userValue);
  //     setLoading(false);
  //   };
  //   getImage();
  // }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={COLORS.loading} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={[styles.conteiner]}>
        <ScrollView>
          <Text style={styles.txtTitle}>NOTE-TAKING-APP</Text>
          <SearchBar data={data} onChange={setData} />

          {data ? (
            data.map((item, index) => <RenderNote key={index} item={item} />)
          ) : (
            <Text style={{ textAlign: "center" }}>No Data!</Text>
          )}
          {/* <FlatList
            ListEmptyComponent={
              <Text style={{ textAlign: "center" }}>No Data!</Text>
            }
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              // return <Notes item={item} navigation={navigation} />;
              return <RenderNote item={item} />;
            }}
          /> */}
        </ScrollView>
        <TouchableOpacity
          style={styles.newNoteButton}
          onPress={() => router.push("notes")}
        >
          <AntDesign name="pluscircle" size={60} color={COLORS.addButton} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  newNoteButton: {
    zIndex: 9,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  noteList: {
    margin: 5,
  },
  txtTitle: {
    margin: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
