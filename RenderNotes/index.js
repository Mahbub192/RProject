import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import Style from "./style";
import { router } from "expo-router";

export default function RenderNote({ item }) {
  const dateString = item?.date;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString();

  return (
    <TouchableOpacity
      style={Style.noteArea}
      //   onPress={() => navigation.navigate("Notes", { note: item, search: true })}
        // onPress={() => router.push("notes")}
        onPress={() =>  router.push({ pathname: "notes", params: item })}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={Style.txtNoteTitle} numberOfLines={3}>
          Name: {item?.name}
        </Text>
      </View>
      <Text style={Style.txtNote} numberOfLines={6}>
        Age: {item?.age}
      </Text>
      <Text style={Style.txtNote} >
        Date: {formattedDate}
      </Text>
    </TouchableOpacity>
  );
}
