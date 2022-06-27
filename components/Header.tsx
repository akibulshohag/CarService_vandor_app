import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { Dimensions, StyleSheet, Text, View } from "react-native";
//context api
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function TabTwoScreen() {
  const navigation = useNavigation<any>();
  const [{ user, token }]: any = useStateValue();
  const [state, dispatch]: any = useStateValue();

  const logout = () => {
    SecureStore.deleteItemAsync("token");
    SecureStore.deleteItemAsync("userId");
    SecureStore.deleteItemAsync("userName");

    navigation.navigate("LoginScreen");
    dispatch({
      type: actionTypes.GET_USER,
      user: "",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Car Service
          </Text>
        </View>
        {/* <Image
          style={{
            width: 120,
            height: 40,
            marginRight: 10,
            resizeMode: "center",
          }}
          source={require("../assets/images/ESSA_Logo_PNG.png")}
        ></Image> */}

        <Ionicons
          onPress={() => logout()}
          name="log-in-outline"
          color={"#fff"}
          size={35}
        ></Ionicons>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: "#004C3F",
    width: deviceWidth,
    borderTopColor: "#fff",
    borderTopWidth: 0.2,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
