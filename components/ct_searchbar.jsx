import React, { useState } from "react";
import { View, TextInput } from "react-native";
import Style from "./style";

export default function SearchBar({ data, onChange }) {
  const [masterData, setMasterData] = useState(data);
  const search = (text) => {
    if (text) {
      const newData = data?.filter((item) => {
        const itemTitle = item.name
          ? item.name.toUpperCase()
          : "".toUpperCase();
        const titleSearch = text.toUpperCase();
        return itemTitle.indexOf(titleSearch) > -1;
      });
      onChange(newData);
    } else {
      onChange(masterData);
    }
  };

  return (
    <View style={[Style.searchArea, {paddingTop:8,paddingBottom:8, paddingLeft:8,}]}>
      <TextInput
        placeholder="Search Tasks..."
        maxLength={50}
        onChangeText={(text) => search(text)}
      />
    </View>
  );
}
