import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { deleteByIdAuth, getAllAuth } from "../../api/common";
import { COLORS } from "../../assets/colors";
import { DeleteIcon, EditIcon } from "../../assets/icons";
import {
  FailureAlert,
  LoadingAlert,
  SuccessAlert,
} from "../../components/Alerts";
import { setAlert, setNavigation, useAppDispatch } from "../../state";

export const AlertScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const focused = useIsFocused();

  const [points, setPoints] = useState([]);
  const [polygons, setPolygons] = useState([]);

  const onEditHandler = (id, type) => {
    dispatch(setNavigation(true));
    navigation.navigate("AddAlertScreen", { type: type, id: id });
  };

  const onDeleteHandler = async (id, type) => {
    try {
      dispatch(setAlert(<LoadingAlert message={"Deleting"} />));
      await deleteByIdAuth(type, id);
      const fletchedData = await getAllAuth(type);
      type === "points"
        ? setPoints(fletchedData?.data)
        : setPolygons(fletchedData?.data);
      dispatch(
        setAlert(
          <SuccessAlert
            message={"P" + type.slice(1).slice(0, -1) + " Alert Deleted"}
          />
        )
      );
    } catch (error) {
      dispatch(setAlert(<FailureAlert message={error.response.data.error} />));
    }
  };

  const fetchData = async () => {
    try {
      const points = await getAllAuth("points");
      const polygons = await getAllAuth("polygons");
      setPoints(points?.data);
      setPolygons(polygons?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    focused ? fetchData() : null;
  }, [focused]);

  const actionButtons = (id, type) => (
    <View
      style={{
        flex: 0.16,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Pressable
        android_ripple={{ radius: 20 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        onPress={() => onEditHandler(id, type)}
      >
        <EditIcon />
      </Pressable>
      <Pressable
        android_ripple={{ radius: 20 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        onPress={() => onDeleteHandler(id, type)}
      >
        <DeleteIcon />
      </Pressable>
    </View>
  );

  const pointLine = useCallback(
    (point) => (
      <View key={point._id} style={styles.headerContainer}>
        <Text
          selectable={true}
          style={[styles.DataText, { flex: 0.27, textAlign: "left" }]}
        >
          {point._id}
        </Text>
        <Text selectable={true} style={[styles.DataText, { flex: 0.21 }]}>
          {point.location.coordinates[0]}
        </Text>
        <Text selectable={true} style={[styles.DataText, { flex: 0.19 }]}>
          {point.location.coordinates[1]}
        </Text>
        <Text selectable={true} style={[styles.DataText, { flex: 0.17 }]}>
          {point.radius}
        </Text>
        {actionButtons(point._id, "points")}
      </View>
    ),
    []
  );

  const polygonLine = useCallback(
    (polygon) => (
      <View key={polygon._id} style={styles.headerContainer}>
        <Text
          selectable={true}
          style={[styles.DataText, { flex: 0.28, textAlign: "left" }]}
        >
          {polygon._id}
        </Text>
        <Text selectable={true} style={[styles.DataText, { flex: 0.56 }]}>
          {" " + polygon.location.coordinates.flat().join(", ")}
        </Text>
        {actionButtons(polygon._id, "polygons")}
      </View>
    ),
    []
  );
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Point Alerts</Text>

      <View
        style={[
          styles.headerContainer,
          { borderTopWidth: 1, borderTopColor: COLORS.borderColor },
        ]}
      >
        <Text style={[styles.headerText, { flex: 0.27, textAlign: "left" }]}>
          Id
        </Text>
        <Text style={[styles.headerText, { flex: 0.21 }]}>Longitude</Text>
        <Text style={[styles.headerText, { flex: 0.19 }]}>Latitude</Text>
        <Text style={[styles.headerText, { flex: 0.17 }]}>Radius</Text>
        <Text style={[styles.headerText, { flex: 0.16 }]}> </Text>
      </View>
      {points && points.length > 0 && points.map((point) => pointLine(point))}
      <Text style={styles.title}>Polygon Alerts</Text>
      <View
        style={[
          styles.headerContainer,
          { borderTopWidth: 1, borderTopColor: COLORS.borderColor },
        ]}
      >
        <Text style={[styles.headerText, { flex: 0.28, textAlign: "left" }]}>
          Id
        </Text>
        <Text style={[styles.headerText, { flex: 0.56 }]}>Points</Text>
        <Text style={[styles.headerText, { flex: 0.16 }]}> </Text>
      </View>
      {polygons &&
        polygons.length > 0 &&
        polygons.map((polygon) => polygonLine(polygon))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: "10%",
    paddingBottom: "5%",
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  DataText: {
    fontSize: 14,
    textAlign: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginVertical: 15,
    alignSelf: "center",
  },
});
