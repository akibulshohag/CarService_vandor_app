import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// components
import Table from "../components/CarList";
import Header from "../components/Header";
import { useStateValue } from "../context/StateProvider";

import CarService from "../services/CarService";
const deviceWidth = Math.floor(Dimensions.get("window").width);

let product: any[];
const ViewProduct = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [{ userName, userId }]: any = useStateValue();

  const [refreshing, setrefreshing] = useState(false);
  const [loading, setloading] = useState(true);
  const [userCar, setuserCar] = useState([]);

  useEffect(() => {
    const getCarList = async () => {
      try {
        let res = await CarService.getcarList(userId);

        setuserCar(res?.data);
        setloading(false);
      } catch (error) {
        console.log("err", error);
        setloading(false);
      }
    };
    getCarList();
  }, [userId, isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Car List</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddCar", { id: "" })}
        >
          <View style={styles.addProduct}>
            <Ionicons
              style={{ fontSize: 20, color: "white" }}
              name="ios-add-circle-outline"
            ></Ionicons>
            <Text style={{ fontSize: 12, color: "white", marginTop: 2 }}>
              Add New
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.container3}>
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Image</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Title</Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Info</Text>
          </View>
        </View>
        {/* <ScrollView style={{height:'90%'}} refreshControl={ <RefreshControl  refreshing={refreshing} onRefresh={refresh}/>}> */}
        <View>
          {userCar?.length > 0 ? (
            <Table
              userCar={userCar}
              setrefreshing={setrefreshing}
              refreshing={refreshing}
            />
          ) : (
            <>
              {loading ? (
                <View style={{ marginTop: deviceWidth / 2 + 50 }}>
                  <ActivityIndicator size="large" color="#e01221" />
                </View>
              ) : (
                <View
                  style={{
                    marginTop: deviceWidth / 2 + 50,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    No Items Found
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default ViewProduct;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //   backgroundColor:'#FAFAFA',
    borderBottomColor: "#FF9411",
    borderBottomWidth: 0.5,
  },
  addProduct: {
    backgroundColor: "#FF9411",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
    flexDirection: "row",
  },
  entries: {
    flexDirection: "row",
  },
  container2: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: "#C0C0C0",
    backgroundColor: "#FFFFFF",
  },

  container3: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // justifyContent:'space-around',
    backgroundColor: "#F8F8F8",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "column",
    width: deviceWidth / 3,
    alignItems: "flex-start",
  },
  picker: {
    height: 30,
    width: deviceWidth / 3 + 30,
  },
});
