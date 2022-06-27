import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useStateValue } from "../context/StateProvider";
// services
import CarServices from "../services/CarService";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function TabOneScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const [{ userName, userId }]: any = useStateValue();

  const route = useRoute();
  const {
    id,
    avatar,
    carName,
    carNo,
    modelNo,
    registrationNo,
    carSeatId,
  }: any = route.params;

  const [name, setname] = useState("");
  const [carNumber, setcarNumber] = useState("");
  const [carModelNumber, setcarModelNumber] = useState("");
  const [carRegistrationNo, setcarRegistrationNo] = useState("");
  const [carSeat, setcarSeat] = useState([]);
  const [loading, setloading] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [img, setimg] = useState("");
  const [image, setimage] = useState("");
  const [carphoto, setCarphoto] = useState("");

  //selected value
  const [selectedCarSeat, setselectedCarSeat] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // let Image = img;

    if (!result.cancelled) {
      // Image.push(result.base64);
      const file = `[data:image/jpeg;base64,${result.base64}]`;
      setimg(file);
      setimage(result.base64);
      setCarphoto("");
    }
  };

  const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
    return isOk;
  };

  // const pickImage = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       quality: 1,
  //       base64: true,
  //     });

  //     if (result.cancelled) return;

  //     const { uri, type } = result;
  //     const fileInfo = await getFileInfo(result.uri);

  //     if (!fileInfo?.size) {
  //       alert("Can't select this file as the size is unknown.");
  //       return;
  //     }

  //     if (type === "image") {
  //       const isLt15MB = isLessThanTheMB(fileInfo.size, 3);
  //       if (!isLt15MB) {
  //         alert(`Image size must be smaller than 3MB!`);
  //         setimg([]);
  //       } else {
  //         setimg([result.base64]);
  //       }
  //     }

  //     // Save or process with the result.uri
  //   } catch (error) {
  //     console.info(error);
  //   }
  // };

  //Get CarSeat
  useEffect(() => {
    const file = `data:image/jpeg;base64,${avatar}`;
    setname(carName);
    setcarNumber(carNo);
    setcarModelNumber(modelNo);
    setcarRegistrationNo(registrationNo);
    setCarphoto(avatar);
    // setimage(file);
    setimg(file);
    // setcarSeat(carSeatId);
    setselectedCarSeat(carSeatId);

    const getCarseat = async () => {
      try {
        let res = await CarServices.getCarSeat();
        setcarSeat(res?.data);
      } catch (error) {
        console.log(".....error", error);
      }
    };
    getCarseat();
  }, [refreshing]);

  // create car
  const createCar = async () => {
    const data = {
      vendor_id: userId,
      car_seat_id: selectedCarSeat,
      name: name,
      avatar: [img],
      model_number: carModelNumber,
      car_number: carNumber,
      registration_number: carRegistrationNo,
      created_by: userName,
    };

    try {
      let res = await CarServices.carStore(data);
      showMessage({
        message: `${res.message}`,
        type: "success",
      });
    } catch (error) {
      showMessage({
        message: `${error.message}`,
        type: "danger",
      });
    }
  };

  //carUpdate
  const carupdate = async () => {
    const data = {
      car_id: id,
      car_seat_id: selectedCarSeat,
      name: name,
      avatar: [img],
      model_number: carModelNumber,
      car_number: carNumber,
      registration_number: carRegistrationNo,
      created_by: userName,
    };

    try {
      let res = await CarServices.carUpdate(data);

      showMessage({
        message: `${res.message}`,
        type: "success",
      });
    } catch (error) {
      console.log("..........", error);

      showMessage({
        message: `${error.message}`,
        type: "danger",
      });
    }
  };

  //carDelete
  const carDelete = async () => {
    try {
      let res = await CarServices.carDelete(id);

      showMessage({
        message: `${res.message}`,
        type: "success",
      });
    } catch (error) {
      console.log("..........", error);

      showMessage({
        message: `${error.message}`,
        type: "danger",
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={`black`} />
      <SafeAreaView>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Add Car</Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{}}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>Car Name</Text>
              <TextInput
                style={styles.input1}
                onChangeText={setname}
                value={name}
                placeholder={"Car Name"}
              />
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>Car Number</Text>
              <TextInput
                style={styles.input1}
                onChangeText={setcarNumber}
                value={carNumber}
                placeholder={"Enter Car Number"}
              />
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                Car Model Number
              </Text>
              <TextInput
                style={styles.input1}
                onChangeText={setcarModelNumber}
                value={carModelNumber}
                placeholder={"Enter Car Number"}
              />
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                Car Registration Number
              </Text>
              <TextInput
                style={styles.input1}
                onChangeText={setcarRegistrationNo}
                value={carRegistrationNo}
                placeholder={"Enter Car Number"}
              />
            </View>
            <View>
              <Text>Select Car Seat Number</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedCarSeat}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedCarSeat(itemValue);
                  }}
                >
                  {/* <Picker.Item label="Select Any" value={""} /> */}

                  {carSeat?.map((item: any, index) => (
                    <Picker.Item
                      style={styles.pickerItem}
                      key={index}
                      label={`${item?.carSeatNumber}`}
                      value={`${item?.id}`}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View
              style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            >
              <Text>Car Photo</Text>
              <View
                style={{
                  marginTop: 5,
                  width: deviceWidth / 3.5,
                  height: deviceWidth / 3.5,
                  borderWidth: 0.5,
                }}
              >
                {id ? (
                  <>
                    {carphoto ? (
                      <TouchableOpacity onPress={() => pickImage()}>
                        <Image
                          style={styles.img}
                          source={{ uri: `${avatar}` }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => pickImage()}>
                        <Image
                          style={styles.img}
                          source={{ uri: `data:image/jpg;base64,${image}` }}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <>
                    {image ? (
                      <TouchableOpacity onPress={() => pickImage()}>
                        <Image
                          style={styles.img}
                          source={{ uri: `data:image/jpg;base64,${image}` }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <FontAwesome5
                        onPress={() => pickImage()}
                        color="#FF9411"
                        style={styles.cam}
                        name="camera"
                      ></FontAwesome5>
                    )}
                  </>
                )}
              </View>
            </View>
            {id ? (
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignItems: "center", margin: 12 }}>
                  <TouchableOpacity
                    onPress={() => carupdate()}
                    style={styles.loginBtn1}
                  >
                    {loading ? (
                      <ActivityIndicator size={"small"} color="#fff" />
                    ) : (
                      <Text style={[styles.title, { fontSize: 16 }]}>
                        Update
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center", margin: 12 }}>
                  <TouchableOpacity
                    onPress={() => carDelete()}
                    style={styles.loginBtn1}
                  >
                    {loading ? (
                      <ActivityIndicator size={"small"} color="#fff" />
                    ) : (
                      <Text style={[styles.title, { fontSize: 16 }]}>
                        Delete
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: "center", margin: 12 }}>
                <TouchableOpacity
                  onPress={() => createCar()}
                  style={styles.loginBtn}
                >
                  {loading ? (
                    <ActivityIndicator size={"small"} color="#fff" />
                  ) : (
                    <Text style={[styles.title, { fontSize: 16 }]}>
                      Add Car
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: deviceWidth / 3.5,
    height: deviceWidth / 3.5,
    marginBottom: 10,
    borderWidth: 0.5,

    alignItems: "center",
  },
  headerContainer: {
    backgroundColor: "#004C3F",
    width: deviceWidth,
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  input1: {
    height: 40,
    width: deviceWidth / 1.1,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: deviceWidth / 1.1,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 15,
  },
  pickerItem: {
    color: "#000",
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
    padding: 10,
    width: deviceWidth / 1.2,
    borderRadius: 5,
    alignItems: "center",
  },
  loginBtn1: {
    backgroundColor: `#004C3F`,
    padding: 10,
    width: deviceWidth / 2.5,
    borderRadius: 5,
    alignItems: "center",
  },

  cam: {
    fontSize: 30,
    padding: 5,
    position: "absolute",
    zIndex: 99,
    bottom: "30%",
    left: "30%",
  },
});
