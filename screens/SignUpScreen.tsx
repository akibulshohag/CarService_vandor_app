import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
// services
import RegisterService from "../services/RegisterService";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function TabOneScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();

  const [email, setemail] = useState("");
  const [fullName, setfullName] = useState("");
  const [phone, setphone] = useState("");
  const [passWord, setpassWord] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [isSubmitForOtp, setIsSubmitForOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, sethideConfirmPass] = useState(true);
  const [img, setimg] = useState("");
  const [emailValidError, setEmailValidError] = useState("");
  const [passwordValidError, setpasswordValidError] = useState("");
  const [image, setimage] = useState("");

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
    }
  };

  // console.log("..........", img);

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

  //email validation

  //signUp Section
  const signUp = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email.length === 0) {
      setEmailValidError("Email address must be enter");
    } else if (reg.test(email) === false) {
      setEmailValidError("Enter valid email address");
    } else if (passWord.length < 8) {
      setEmailValidError("");
      setpasswordValidError("Password Must Be At least 6");
    } else if (passWord !== confirmPassword) {
      setpasswordValidError("Password Not Matched");
      setEmailValidError("");
    } else if (passWord === confirmPassword) {
      setpasswordValidError("");
      setEmailValidError("");

      const data = {
        name: fullName,
        phone: phone,
        email: email,
        password: passWord,
        avatar: [img],
      };
      setloading(true);
      try {
        let res = await RegisterService.signUp(data);

        if (res?.status === 200) {
          showMessage({
            message: `${res.message}`,
            type: "success",
          });
          // setIsSubmitForOtp(true);

          setloading(false);
          navigation.navigate("LoginScreen");
        } else {
          if (res?.status === 500) {
            showMessage({
              message: `${res.message}`,
              type: "warning",
            });

            setloading(false);
          }
        }
      } catch (error: any) {
        showMessage({
          message: `${error}`,
          type: "warning",
        });

        setloading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={`black`} />
      <SafeAreaView>
        {/* <View style={styles.headerContainer}>
          <Image style={styles.img} source={require("../assets/car/car.png")} />
          <Text style={{ fontSize: 20, color: "#fff" }}>Car Rental</Text>
        </View> */}
        <View
          style={{ alignItems: "center", paddingVertical: 20, marginTop: 20 }}
        >
          <Text
            style={{
              fontSize: 22,
              color: `${scheme === "dark" ? "#fff" : "#000"}`,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </View>

        <View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.input1}>
              <TextInput
                style={{ width: deviceWidth / 1.5 }}
                onChangeText={setfullName}
                value={fullName}
                placeholder={"Full Name"}
              />
            </View>
            <View style={styles.input1}>
              <TextInput
                style={{ width: deviceWidth / 1.5 }}
                onChangeText={setphone}
                value={phone}
                placeholder={"Phone Number"}
              />
            </View>
            <View style={styles.input1}>
              <TextInput
                style={{ width: deviceWidth / 1.5 }}
                onChangeText={setemail}
                value={email}
                placeholder={"Email"}
                autoCorrect={false}
                autoCapitalize="none"
                // onChangeText={(value) => {
                //   setemail(value);
                // handleValidEmail(value);
                // }}
              />
            </View>
            {emailValidError ? (
              <View style={{}}>
                <Text style={{ color: "red" }}>{emailValidError}</Text>
              </View>
            ) : null}
            <View style={styles.input1}>
              <TextInput
                style={{ width: deviceWidth / 1.5 }}
                onChangeText={setpassWord}
                value={passWord}
                placeholder="Password"
                secureTextEntry={hidePass ? true : false}
              />
              <FontAwesome
                style={{ width: 20 }}
                name={hidePass ? "eye-slash" : "eye"}
                size={20}
                color="grey"
                onPress={() => setHidePass(!hidePass)}
              />
            </View>

            <View style={styles.input1}>
              <TextInput
                style={{ width: deviceWidth / 1.5 }}
                onChangeText={setconfirmPassword}
                value={confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={hideConfirmPass ? true : false}
              />
              <FontAwesome
                style={{ width: 20 }}
                name={hideConfirmPass ? "eye-slash" : "eye"}
                size={20}
                color="grey"
                onPress={() => sethideConfirmPass(!hideConfirmPass)}
              />
            </View>
            {passwordValidError ? (
              <View style={{}}>
                <Text style={{ color: "red" }}>{passwordValidError}</Text>
              </View>
            ) : null}
            <View style={{ paddingHorizontal: 18, marginTop: 10 }}>
              <View
                style={[
                  styles.imageContainer,
                  { borderColor: `${scheme === "dark" ? "#fff" : "#000"}` },
                ]}
              >
                {img ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <View>
                      <Image
                        style={styles.img1}
                        source={{ uri: `data:image/jpeg;base64,${image}` }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => pickImage()}
                      style={styles.replaceButton}
                    >
                      <Text style={{ color: "#fff" }}>Replace Img</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.cam}>
                    <FontAwesome5
                      onPress={() => pickImage()}
                      color="#FF9411"
                      // style={styles.cam}
                      size={40}
                      name="image"
                    ></FontAwesome5>
                    <View>
                      <Text
                        style={{
                          color: `${scheme === "dark" ? "#fff" : "#000"}`,
                        }}
                      >
                        Drop Your Image Here or browse
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>

          {isOtpLogin ? (
            <View style={{ alignItems: "center", margin: 12 }}>
              <TouchableOpacity
                style={styles.loginBtn}
                // onPress={() =>
                //   isSubmitForOtp ? submitOtp() : submitPhoneForOtp()
                // }
              >
                <Text style={[styles.title, { fontSize: 16 }]}>
                  {isSubmitForOtp ? "Submit" : "Send"}
                </Text>
                {loading ? (
                  <ActivityIndicator
                    style={{ marginLeft: 5 }}
                    size="small"
                    color="#FFF"
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ alignItems: "center", margin: 12 }}>
              <TouchableOpacity
                onPress={() => signUp()}
                style={styles.loginBtn}
                // onPress={() => loginWithPass()}
              >
                {loading ? (
                  <ActivityIndicator size={"small"} color="#fff" />
                ) : (
                  <Text style={[styles.title, { fontSize: 16 }]}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
      <View style={styles.signUpSection}>
        <Text
          style={[
            styles.title,
            { color: `${scheme === "dark" ? "#fff" : "#000"}`, paddingTop: 10 },
          ]}
        >
          If you have already an account?{" "}
          <Text
            style={{
              color: `${scheme === "dark" ? "#fff" : "#000"}`,
              fontWeight: "bold",
              fontSize: 15,
            }}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            {" "}
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: deviceWidth / 5,
    height: deviceWidth / 5,
    marginBottom: 10,
    borderWidth: 0.5,
    // borderColor: "#FF9411",
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
  input: {
    height: 50,
    width: deviceWidth / 1.2,
    margin: 12,
    // borderBottomWidth: 1,
    padding: 10,
    // borderBottomColor: "#1234",
    // borderRadius:5,
    backgroundColor: "#fff",
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
    padding: 10,
    width: deviceWidth / 1.2,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpSection: {
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    borderTopColor: "#1234",
    borderTopWidth: 1,
    width: deviceWidth,
  },
  input1: {
    height: 40,
    width: deviceWidth / 1.2,
    margin: 8,
    padding: 10,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
    borderRadius: 5,
  },
  img1: {
    width: deviceWidth / 3,
    height: deviceWidth / 3,

    borderWidth: 0.5,
    alignItems: "center",
  },
  cam: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    // display: "flex",
    // flexDirection: "row",
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 1,
    width: deviceWidth / 1.2,
    height: deviceHeight / 4.7,
    // alignItems: "center",
    justifyContent: "center",
  },
  replaceButton: {
    backgroundColor: "#004C3F",
    padding: 10,
    borderRadius: 5,
  },
});
