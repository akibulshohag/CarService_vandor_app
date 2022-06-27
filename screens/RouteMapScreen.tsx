import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// components
import Header from "../components/Header";

import CarService from "../services/CarService";
const deviceWidth = Math.floor(Dimensions.get("window").width);

let product: any[];
const ViewProduct = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [refreshing, setrefreshing] = useState(false);
  const [loading, setloading] = useState(true);
  const [routeMap, setRouteMap] = useState([]);

  useEffect(() => {
    const getCarList = async () => {
      try {
        let res = await CarService.getRouteMap();
        // console.log("..........", res);

        setRouteMap(res?.data);
        setloading(false);
      } catch (error) {
        console.log("err", error);
        setloading(false);
      }
    };
    getCarList();
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <Header />
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          {routeMap.length > 0 ? (
            routeMap.map((item: any, index: any) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("RouteMapDetails", {
                    rent: item?.rent,
                    seat: item?.seat,
                    formDistrict: item?.formDistrict,
                    formUpazila: item?.formUpazila,
                    formArea: item?.formArea,
                    toDistrict: item?.toDistrict,
                    toUpazila: item?.toUpazila,
                    toArea: item?.toArea,
                  })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: deviceWidth / 1.3,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 14 }}>
                      Car Seat:
                      <Text style={{ color: "#004C3F" }}> {item?.seat}</Text>
                    </Text>
                    <Text>Car Rent: TK {item?.rent}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ color: "#1239" }}>From District</Text>
                      <Text style={{ color: "#004C3F" }}>
                        {item?.formDistrict}
                      </Text>
                    </View>
                    <View style={{ marginLeft: 15 }}>
                      <Text style={{ color: "#1239" }}>To District</Text>
                      <Text style={{ color: "#004C3F" }}>
                        {item?.toDistrict}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
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
});
