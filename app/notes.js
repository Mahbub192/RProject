import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import Spinner from "react-native-loading-spinner-overlay";

export default function Notes() {
  const [images, setImages] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();
  const [date, setDate] = useState(new Date());
  const [SImage, setSImage] = useState();
  const [note, setNote] = useState({
    name: "",
    age: "",
    sex: "",
    visit_date: "",
    nose: "",
    nasopharynx: "",
    oropharynx: "",
    pyriform_fossa: "",
    post_cricoid_area: "",
    epiglottis: "",
    supraglottic_region: "",
    glottic: "",
    movement_of_vocal_cord: "",
    airway: "",
    ant_commissure: "",
    post_commissure: "",
    subglottic_region: "",
    images: [],
    note: "",
    description: "",
    date: date,
  });

  useEffect(() => {
    if (params) {
      setNote(params);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    })();
  }, []);

  const Images = [];
  const selectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });


    result.assets.forEach(async (item) => {
      Images.push(item.uri);
      try {
        const { base64 } = await manipulateAsync(item.uri, [], {
          format: "jpeg",
          base64: true,
        });
        setSImage(base64);

      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    });


    setNote({ ...note, images: Images });
    setImages(Images);
  };

  const storeNameArray = async (nameArray) => {
    try {
      //   await AsyncStorage.clear();
      const jsonValue = await AsyncStorage.getItem("node");
      let userValue = jsonValue != null ? JSON.parse(jsonValue) : [];
      console.log(32, userValue);

      userValue.push(nameArray);

      await AsyncStorage.setItem("node", JSON.stringify(userValue));
    } catch (error) {
      console.log(33, "error");
    }
  };

  /// HTML pdf file

  const html = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
    </style>
  </head>
  <body style="margin: 20px;">
    <h1 style="font-size: 26px;text-align:center;margin-top: 50px; color: blue;">
      ENDOSCOPIC PROCEDURE REPORT
    </h1>
  
    <table>
      <tr>
        <td style="font-weight: bold;">Name: </td>
        <td>${note.name}</td>
        <td style="font-weight: bold;">Sex: </td>
        <td>${note.sex}</td> 
      </tr>
      <tr>
        <td style="font-weight: bold;">Age: </td>
        <td>${note.name}</td>
        <td style="font-weight: bold;">Visit Date: </td>
        <td>${note.visit_date}</td>
      </tr>
    </table>
  
    <div style="display: flex;border-style: groove;">
      <div style="flex:2">
        <h1 style="font-size: 30px;text-align:center;margin-top: 50px;color: blue;">Procedure: Fiber Optic Laryngoscopy (FOL)</h1>
        <h2 style="font-size: 24px;text-align:center;margin-top: 10px;color: blue;">Medication: 10% Xylocaine Spray</h2>
        <div style="border-style: groove;">
          <h3 style="font-size: 24px;text-align:center;margin-top: 10px;color: blue;">FINDINGS</h3>
          <table>
            <tr>
              <td style="font-weight: bold;">Nose: </td>
              <td>${note.nose}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Nasopharynx: </td>
              <td>${note.nasopharynx}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Oropharynx: </td>
              <td>${note.oropharynx}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Pyriform Fossa: </td>
              <td>${note.pyriform_fossa}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Post Cricoid Area: </td>
              <td>${note.post_cricoid_area}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Epiglottis: </td>
              <td>${note.epiglottis}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Supraglottic Region: </td>
              <td>${note.supraglottic_region}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Glottic (Vocal Cord): </td>
              <td>${note.glottic}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Movement of Vocal Cord: </td>
              <td>${note.movement_of_vocal_cord}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Airway: </td>
              <td>${note.airway}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Ant. Commissure: </td>
              <td>${note.ant_commissure}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Post. Commissure: </td>
              <td>${note.post_commissure}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Subglottic Region: </td>
              <td>${note.subglottic_region}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Comments: </td>
              <td>${note.description}</td>
            </tr>
          </table>
        </div>
      </div>
      <div style="flex:1">
      <div>
      <img
                src= "data:image/jpeg;base64,${SImage}"
                alt="Image"
                width="250"
                height="300"
                />

                
      
    </div>
     
      </div>
    </div>
  </body>
  </html>
`;

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.

    await Print.printAsync({
      html: html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html,
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <SafeAreaView style={styles.conteiner}>
      <ScrollView>
        {loading && (
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#ffffff" }}
          />
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "45%" }}>
            <Text style={{ marginBottom: 5 }}>Patient Name:</Text>
            <TextInput
              style={styles.txtTitleNote}
              autoFocus={true}
              maxLength={40}
              value={note.name}
              placeholder={"Name"}
              onChangeText={(text) => setNote({ ...note, name: text })}
            ></TextInput>
          </View>

          <View style={{ width: "45%" }}>
            <Text style={{ marginBottom: 5 }}>Patient Age:</Text>
            <TextInput
              style={styles.txtTitleNote}
              autoFocus={true}
              maxLength={40}
              value={note.age}
              placeholder={"Age"}
              onChangeText={(text) => setNote({ ...note, age: text })}
            ></TextInput>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "45%" }}>
            <Text style={{ marginBottom: 5 }}>Sex:</Text>
            <TextInput
              style={styles.txtTitleNote}
              autoFocus={true}
              maxLength={40}
              value={note.sex}
              placeholder={"Sex"}
              onChangeText={(text) => setNote({ ...note, sex: text })}
            ></TextInput>
          </View>

          <View style={{ width: "45%" }}>
            <Text style={{ marginBottom: 5 }}>Visit Date:</Text>
            <TextInput
              style={styles.txtTitleNote}
              autoFocus={true}
              maxLength={40}
              value={note.visit_date}
              placeholder={"Date"}
              onChangeText={(text) => setNote({ ...note, visit_date: text })}
            ></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 15, marginBottom: 15 }}>
          <Text style={{ color: "#2356CA", fontSize: 20, textAlign: "center" }}>
            Procedure: Fiber Optic Laryngoscopy (FOL)
          </Text>
          <Text
            style={{
              color: "#2356CA",
              fontSize: 16,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            Medication: 10% Xylocaine Spray
          </Text>
        </View>

        <View style={{ borderWidth: 3, borderColor: "#E9EAE9" }}>
          <Text
            style={{
              color: "#036B0A",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            FINDINGS
          </Text>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Nose:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.nose}
                  placeholder={"Nose"}
                  onChangeText={(text) => setNote({ ...note, nose: text })}
                ></TextInput>
              </View>

              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Nasopharynx:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.nasopharynx}
                  placeholder={"Nasopharynx"}
                  onChangeText={(text) =>
                    setNote({ ...note, nasopharynx: text })
                  }
                ></TextInput>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Oropharynx:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.oropharynx}
                  placeholder={"Oropharynx"}
                  onChangeText={(text) =>
                    setNote({ ...note, oropharynx: text })
                  }
                ></TextInput>
              </View>

              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Pyriform Fossa:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.pyriform_fossa}
                  placeholder={"Pyriform Fossa"}
                  onChangeText={(text) =>
                    setNote({ ...note, pyriform_fossa: text })
                  }
                ></TextInput>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Post Cricoid Area:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.post_cricoid_area}
                  placeholder={"Post Cricoid Area"}
                  onChangeText={(text) =>
                    setNote({ ...note, post_cricoid_area: text })
                  }
                ></TextInput>
              </View>

              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Epiglottis:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.epiglottis}
                  placeholder={"Epiglottis"}
                  onChangeText={(text) =>
                    setNote({ ...note, epiglottis: text })
                  }
                ></TextInput>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Supraglottic Region:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.supraglottic_region}
                  placeholder={"Supraglottic Region"}
                  onChangeText={(text) =>
                    setNote({ ...note, supraglottic_region: text })
                  }
                ></TextInput>
              </View>

              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Glottic:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.glottic}
                  placeholder={"Glottic"}
                  onChangeText={(text) => setNote({ ...note, glottic: text })}
                ></TextInput>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Movement of Vocal Cord:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.movement_of_vocal_cord}
                  placeholder={"Movement of Vocal Cord"}
                  onChangeText={(text) =>
                    setNote({ ...note, movement_of_vocal_cord: text })
                  }
                ></TextInput>
              </View>

              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Airway:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.title}
                  placeholder={"Airway"}
                  onChangeText={(text) => setNote({ ...note, airway: text })}
                ></TextInput>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Ant. Commissure:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.ant_commissure}
                  placeholder={"Ant. Commissure"}
                  onChangeText={(text) =>
                    setNote({ ...note, ant_commissure: text })
                  }
                ></TextInput>
              </View>

              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Post. Commissure:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.post_commissure}
                  placeholder={"Post. Commissure"}
                  onChangeText={(text) =>
                    setNote({ ...note, post_commissure: text })
                  }
                ></TextInput>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "45%" }}>
                <Text style={{ marginBottom: 5 }}>Subglottic Region:</Text>
                <TextInput
                  style={styles.txtTitleNote}
                  autoFocus={true}
                  maxLength={40}
                  value={note.subglottic_region}
                  placeholder={"Subglottic Region"}
                  onChangeText={(text) =>
                    setNote({ ...note, subglottic_region: text })
                  }
                ></TextInput>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={{ marginBottom: 5 }}>Description:</Text>
              <TextInput
                style={styles.txtTitleNote}
                autoFocus={true}
                maxLength={40}
                value={note.description}
                placeholder={"Description"}
                onChangeText={(text) => setNote({ ...note, description: text })}
              ></TextInput>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              color: "#036B0A",
              fontSize: 20,
              textAlign: "center",
              marginBottom: 15,
              marginTop: 15,
            }}
          >
            Add Image
          </Text>
          <Button title="Select Images" onPress={selectImages} />

          {/* <View style={{flexDirection:"row",justifyContent:'space-between'}}>
          {images.map((singleImage) => (
            <Image source={{ uri: singleImage }} style={styles.image} />
          ))}
          </View> */}

          <View style={styles.rowContainer}>
            {images
              .slice(0, Math.ceil(images.length / 2))
              .map((singleImage, index) => (
                <View key={index} style={styles.column}>
                  <Image source={{ uri: singleImage }} style={styles.image} />
                </View>
              ))}
          </View>
          <View style={styles.rowContainer}>
            {images
              .slice(Math.ceil(images.length / 2))
              .map((singleImage, index) => (
                <View key={index} style={styles.column}>
                  <Image source={{ uri: singleImage }} style={styles.image} />
                </View>
              ))}
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            bottom: 0,
          }}
        >
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "#D82206",
                flex: 1,
              },
            ]}
            //   onPress={() => storeNameArray(note)}
            onPress={print}
          >
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "#016801",
                flex: 1,
              },
            ]}
            onPress={() => storeNameArray(note)}
          >
            {/* <Feather name="save" size={29} color="white" /> */}
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    margin: 20,
  },
  txtInput: {
    fontSize: 18,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    width: "100%",
    height: "15%",
  },
  txtTitleNote: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 8,
    fontSize: 14,
  },
  actionButton: {
    borderRadius: 10,
    width: 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    color: "whight",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 10,
  },
});