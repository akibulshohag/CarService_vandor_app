import { AntDesign } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";

// components

const deviceWidth = Math.floor(Dimensions.get("window").width);

let product: any[];
const ViewProduct = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {
    rent,
    seat,
    formDistrict,
    formUpazila,
    formArea,
    toDistrict,
    toUpazila,
    toArea,
  }: any = route.params;

  //   console.log("..........", rent);

  const [refreshing, setrefreshing] = useState(false);
  const [loading, setloading] = useState(true);
  const [routeMap, setRouteMap] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              onPress={() => navigation.goBack()}
              name="left"
              size={30}
              color={"#fff"}
            ></AntDesign>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: deviceWidth / 1.3,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
                Notification
              </Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#1239",
                  paddingVertical: 5,
                }}
              >
                <Text>
                  Car Seat:{" "}
                  <Text style={{ color: "#004C3F", fontSize: 16 }}>{seat}</Text>
                </Text>
                <Text>
                  Car Rent:{" "}
                  <Text style={{ color: "#004C3F", fontSize: 16 }}>
                    TK {rent}
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around",
              }}
            >
              <View>
                <Text style={{ color: "#1239", marginBottom: 5 }}>
                  From District:{" "}
                  <Text style={{ color: "#004C3F" }}>{formDistrict}</Text>
                </Text>
                <Text style={{ color: "#1239", marginBottom: 5 }}>
                  From Upazila:{" "}
                  <Text style={{ color: "#004C3F" }}>{formUpazila}</Text>
                </Text>
                <Text style={{ color: "#1239", marginBottom: 5 }}>
                  From Area:{" "}
                  <Text style={{ color: "#004C3F" }}> {formArea}</Text>
                </Text>
              </View>
              <View>
                <Text style={{ color: "#1239", marginBottom: 5 }}>
                  To District:{" "}
                  <Text style={{ color: "#004C3F" }}>{toDistrict}</Text>
                </Text>
                <Text style={{ color: "#1239", marginBottom: 5 }}>
                  To Upazila:{" "}
                  <Text style={{ color: "#004C3F" }}>{toUpazila}</Text>
                </Text>
                <Text style={{ color: "#1239", marginBottom: 5 }}>
                  To Area: <Text style={{ color: "#004C3F" }}>{toArea}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default ViewProduct;
const styles = StyleSheet.create({
  card: {
    width: deviceWidth / 1.1,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 0.5,
    backgroundColor: "#004C3F",
  },
});
