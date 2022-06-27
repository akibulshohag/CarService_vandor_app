import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useStateValue } from "../context/StateProvider";

// services
import RegisterService from "../services/RegisterService";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export default function TabTwoScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();

  const [{ userName, userId }]: any = useStateValue();
  console.log(userName, userId);

  const [email, setemail] = useState("");
  const [passWord, setpassWord] = useState("");
  const [loading, setloading] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [isSubmitForOtp, setIsSubmitForOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [hidePass, setHidePass] = useState(true);

  // const loginSubmit = async ()=>{
  //   setloading(true)
  //   const data  ={
  //     email:email,
  //     password:passWord
  //   }
  //   if(data?.email && data?.password){
  //     LoginService.Login(data).then(res=>{
  //       if(res?.success){
  //         // SecureStore.setItemAsync('accessToken',res?.data?.token);

  //         SecureStore.setItemAsync('userId',res?.data?._id);
  //           showMessage({
  //               message: `${res.message}`,
  //               type: "success",
  //             });
  //             setloading(false)
  //             navigation.navigate('HomeScreen')
  //       }
  //   }).catch(err=>{
  //       showMessage({
  //           message: `${err.message}`,
  //           type: "danger",
  //         });
  //         setloading(false)
  //   })
  //   }else{
  //     showMessage({
  //       message: `Email & Password Required !`,
  //       type: "danger",
  //     });
  //     setloading(false)
  //   }

  // }

  // const submitPhoneForOtp = async ()=>{

  //   setloading(true)
  //   const data  = {
  //     phone : email
  //   }

  //   try {
  //     let res = await LoginService.SubmitPhoneForOtp(data)
  //     if(res?.success){
  //       showMessage({
  //         message: `${res.message}`,
  //         type: 'success',
  //       });
  //      setIsSubmitForOtp(true)
  //      setloading(false)
  //     }
  //   } catch (error) {
  //     showMessage({
  //       message: `${error.message}`,
  //       type: 'warning',
  //     });
  //     setloading(false)
  //   }
  // }

  // const submitOtp = async ()=>{

  //   const data  = {
  //     phone: email,
  //     otp: otpCode
  //   }

  //   try {
  //     let res = await LoginService.LoginWithOtp(data)
  //     if(res?.success){
  //       showMessage({
  //          message: `${res.message}`,
  //          type: 'success',
  //        });

  //        setloading(false)
  //        setIsOtpLogin(false)
  //        setIsSubmitForOtp(false)
  //        setemail('')
  //        setpassWord('')
  //        setOtpCode('')
  //        navigation.navigate('Home')

  //     }
  //   } catch (error) {
  //     showMessage({
  //       message: `${error.message}`,
  //       type: 'warning',
  //     });
  //     setloading(false)
  //   }

  // }

  const loginWithPass = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    setloading(true);
    const data = {
      email: email.trim(),
      password: passWord,
      device_token: "Akib",
    };

    // console.log("...............data", data);

    if (passWord.length >= 8 && reg.test(email)) {
      try {
        let res = await RegisterService.loginWithPassword(data);
        console.log("..............", res);

        if (res?.status === true) {
          showMessage({
            message: `${res.message}`,
            type: "success",
          });

          setloading(false);
          setIsOtpLogin(false);
          setIsSubmitForOtp(false);
          setemail("");
          setpassWord("");
          setOtpCode("");
          SecureStore.setItemAsync("token", res?.data?.access_token);
          SecureStore.setItemAsync("userId", res?.data?.user?.id.toString());
          SecureStore.setItemAsync("userName", res?.data?.user?.name);
          navigation.navigate("TabNav");
        } else {
          showMessage({
            message: `${res.errors.login}`,
            type: "warning",
          });
          setloading(false);
        }
      } catch (error: any) {
        showMessage({
          message: `${error}`,
          type: "warning",
        });
        setloading(false);
      }
    } else {
      showMessage({
        message: `Enter Valid Email & password`,
        type: "warning",
      });
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={`black`} />
      <SafeAreaView>
        <View
          style={{
            borderTopColor: "red",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <Text
            style={[
              styles.title,
              { color: `${scheme === "dark" ? "#fff" : "#000"}`, fontSize: 25 },
            ]}
          >
            Welcome Back
          </Text>
          <Text
            style={[
              styles.title,
              { color: `${scheme === "dark" ? "#fff" : "#1239"}` },
            ]}
          >
            Login to Your Account
          </Text>
        </View>

        <View>
          {isSubmitForOtp ? (
            <TextInput
              style={styles.input}
              onChangeText={setOtpCode}
              value={otpCode}
              placeholder={"Enter OTP"}
            />
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={setemail}
              value={email}
              placeholder={isOtpLogin ? "Phone" : "Mail / Phone"}
            />
          )}

          {isOtpLogin ? null : (
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
          )}
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
              style={styles.loginBtn}
              onPress={() => loginWithPass()}
            >
              {loading ? (
                <ActivityIndicator size={"small"} color="#fff" />
              ) : (
                <Text style={[styles.title, { fontSize: 16 }]}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          {isOtpLogin ? (
            <TouchableOpacity
              style={{ alignItems: "center", paddingVertical: 20 }}
              onPress={() => setIsOtpLogin(false)}
            >
              <Text
                style={[
                  styles.title,
                  { color: `${scheme === "dark" ? "#fff" : "#000"}` },
                ]}
              >
                Login with Password
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ alignItems: "center", paddingVertical: 20 }}
              onPress={() => setIsOtpLogin(true)}
            >
              <Text
                style={[
                  styles.title,
                  { color: `${scheme === "dark" ? "#fff" : "#000"}` },
                ]}
              >
                Login with OTP
              </Text>
            </TouchableOpacity>
          )}
          {isOtpLogin && isSubmitForOtp ? null : (
            <TouchableOpacity
              style={{ alignItems: "center", paddingVertical: 20 }}
            >
              <Text style={[styles.title, { color: `red` }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
      <View style={styles.signUpSection}>
        <Text
          style={[
            styles.title,
            {
              color: `${scheme === "dark" ? "#fff" : "#1239"}`,
              paddingTop: 10,
            },
          ]}
        >
          Don't have an account?{" "}
          <Text
            style={{
              color: `${scheme === "dark" ? "#fff" : "#000"}`,
              fontWeight: "bold",
              fontSize: 15,
            }}
            onPress={() => navigation.navigate("SignupScreen")}
          >
            {" "}
            Sign Up
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

    paddingTop: deviceHeight / 5,
    position: "relative",
  },
  title: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: deviceWidth / 1.2,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: "#1234",
    // borderRadius:5,
    backgroundColor: "#fff",
  },
  loginBtn: {
    backgroundColor: `red`,
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
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: "#1234",
    // borderRadius:5,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
  },
});
