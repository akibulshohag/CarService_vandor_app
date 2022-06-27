import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const apiImagepath = "http://103.119.71.9:4400/media";
const deviceWidth = Math.floor(Dimensions.get("window").width);

let Color = "";

const Table = ({ userCar, setrefreshing, refreshing }: any) => {
  //  console.log('.............res',userProducts[0]?.images[0]);

  // pull refresh  function
  function wait(time: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  const refresh = React.useCallback(() => {
    setrefreshing(true);
    wait(1000).then(() => {
      setrefreshing(false);
    });
  }, [refreshing]);

  const navigation = useNavigation<any>();

  // console.log(".........", userCar);

  return (
    <SafeAreaView>
      <ScrollView
        style={{ height: "90%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 25 }}>
            {userCar?.map((item: any, index: number) => (
              <View key={index}>
                {index % 2 === 0 ? (
                  <Text style={{ display: "none" }}>
                    {" "}
                    {(Color = "#FFFFFF")}
                  </Text>
                ) : (
                  <Text style={{ display: "none" }}>{(Color = "#F9F9FF")}</Text>
                )}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AddCar", {
                      id: item?.id,
                      avatar: item?.avatar,
                      carName: item?.name,
                      carNo: item?.carNumber,
                      modelNo: item?.modelNumber,
                      registrationNo: item?.registrationNumber,
                      carSeatId: 2,
                    })
                  }
                >
                  <View
                    style={[styles.listContainer, { backgroundColor: Color }]}
                  >
                    {item?.avatar?.length > 0 ? (
                      <View style={styles.tableColumn1}>
                        <Image
                          style={styles.productImg}
                          source={{ uri: `${item?.avatar}` }}
                        />
                      </View>
                    ) : (
                      <View style={styles.tableColumn1}>
                        <Image
                          style={styles.productImg}
                          source={require("../assets/images/icon.png")}
                        />
                      </View>
                    )}

                    <View style={styles.tableColumn2}>
                      <Text
                        style={{
                          color: "#818181",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        {item?.name}
                      </Text>
                      <Text
                        style={{
                          color: "#818181",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        Car Seat: <Text>{item?.carSeatNumber}</Text>
                      </Text>
                    </View>
                    <View style={styles.tableColumn3}>
                      <Text style={styles.infoText}>
                        Car No:
                        <Text style={{ fontWeight: "bold" }}>
                          {" "}
                          {item?.carNumber}
                        </Text>
                      </Text>
                      <Text style={styles.infoText}>
                        Mpdel No:
                        <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                          {item?.modelNumber}
                        </Text>
                      </Text>
                      <Text style={styles.infoText}>
                        Reg. No:
                        <Text style={{ fontWeight: "bold" }}>
                          {" "}
                          {item?.registrationNumber}
                        </Text>
                      </Text>
                      {/* <Text style={styles.infoText}>
                        Status:
                        <Text style={{ fontWeight: "bold" }}>
                          {item?.activeStatus == 1
                            ? "Published"
                            : item?.activeStatus == 2
                            ? "Pending"
                            : item?.activeStatus == 3
                            ? "Rejected"
                            : item?.activeStatus == 4
                            ? "Draft"
                            : item?.activeStatus == 5
                            ? "Archive"
                            : ""}
                        </Text>
                      </Text> */}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Table;

const styles = StyleSheet.create({
  tableColumn1: {
    width: deviceWidth / 3 - 15,
    flexDirection: "column",
    paddingHorizontal: 2,
    alignItems: "flex-start",
  },
  tableColumn2: {
    width: deviceWidth / 3 - 10,
    flexDirection: "column",
    paddingHorizontal: 2,
    alignItems: "center",
  },
  tableColumn3: {
    width: deviceWidth / 3 + 10,
    flexDirection: "column",
    paddingHorizontal: 2,
    marginLeft: 5,
    alignItems: "flex-start",
  },
  textColor: {
    color: "#7B7B7B",
  },
  infoText: {
    color: "#7B7B7B",
    fontSize: 12,
  },
  productImg: {
    width: 80,
    height: 80,
    // borderWidth:0.5,
    // borderColor:'#1234',
    resizeMode: "center",
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
