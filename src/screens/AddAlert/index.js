import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Formik } from "formik";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { create, editByIdAuth, getByIdAuth } from "../../api/common";
import { COLORS } from "../../assets/colors";
import { FailureAlert, LoadingAlert } from "../../components/Alerts";
import { Button } from "../../components/Button";
import { FormResetButton } from "../../components/FormResetButton";
import { FormSubmitButton } from "../../components/FormSubmitButton";
import { TextField } from "../../components/TextInput";
import { TextInputList } from "../../components/TextInputList";
import { clearAlert, setAlert, setNavigation, useNavState } from "../../state";
import {
  isNotCoordinate,
  isNotValid,
  PointAlertFormValidationSchema,
} from "./schema";

const initialPointArea = {
  numOfPoints: "",
  locations: [],
};

export const AddAlertScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const dispatch = useDispatch();
  const { nav } = useNavState();

  const focused = useIsFocused();
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [radius, setRadius] = useState("");

  const [pointArea, setPointArea] = useState(initialPointArea);

  const [errorValidation, setErrorValidation] = useState("");

  const handlePolygonSubmit = useCallback(
    async (data) => {
      if (isNotValid(data)) {
        setErrorValidation("Values must be a number");

        return;
      } else {
        const error = isNotCoordinate(data);
        if (error) {
          error === 1 ? setErrorValidation("latitude must be between +90 and -90") : null;
          error === 2 ? setErrorValidation("longitude must be between +180 and -180") : null;
          return;
        }
      }
      errorValidation && setErrorValidation("");
      dispatch(setAlert(<LoadingAlert />));
      if (params?.id) {
        editByIdAuth(data, "polygons", params?.id)
          .then(() => {
            dispatch(clearAlert());
            navigation.navigate("AlertScreen");
          })
          .catch(() => dispatch(setAlert(<FailureAlert />)));
      } else {
        create(data, "polygons")
          .then(() => {
            dispatch(clearAlert());
            navigation.navigate("AlertScreen");
          })
          .catch(() => dispatch(setAlert(<FailureAlert />)));
      }
    },
    [params, errorValidation]
  );

  const handlePointSubmit = async (data) => {
    dispatch(setAlert(<LoadingAlert />));
    if (params?.id) {
      editByIdAuth(data, "points", params.id)
        .then((res) => {
          dispatch(clearAlert());
          navigation.navigate("AlertScreen");
        })
        .catch(() => dispatch(setAlert(<FailureAlert />)));
    } else {
      create(data, "points")
        .then(() => {
          dispatch(clearAlert());
          navigation.navigate("AlertScreen");
        })
        .catch(() => dispatch(setAlert(<FailureAlert />)));
    }
  };

  const resetPointForm = useCallback(() => {
    setLong("");
    setLat("");
    setRadius("");
    //setPointArea(initialPointArea);
  }, []);

  const resetPolygonForm = useCallback(() => {
    setPointArea({
      ...pointArea,
      locations: pointArea.locations.map((item) => [0, 0]),
    });
  }, [pointArea]);

  useEffect(() => {
    // each time this screen not focused the form will be reinitialized
    if (!nav) {
      resetPointForm();
      // in this case we initialize the polygon form by deleting the form
      // otherwise use resetPolygonForm()
      setPointArea(initialPointArea);
      setErrorValidation("");

      //no need to fetch data "clean form"
      return;
    }

    //fetch data (point or polygon) for editing
    if (params?.type === "points" && nav) {
      getByIdAuth("points", params?.id)
        .then((res) => {
          let long = res?.data?.location?.coordinates[0];
          let lat = res?.data?.location?.coordinates[1];
          let radius = res?.data?.radius;
          setLong(long);
          setLat(lat);
          setRadius(radius);
        })
        .catch((err) => console.log(err));
    }
    if (params?.type === "polygons" && nav) {
      getByIdAuth("polygons", params?.id)
        .then((res) => {
          setPointArea({
            numOfPoints: res?.data.location.coordinates[0].length,
            locations: res?.data.location.coordinates[0],
          });
        })
        .catch((err) => console.log(err));
    }

    // params has been expired
    dispatch(setNavigation(false));
  }, [focused]);




  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white, marginBottom: 10 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={{
            long: long.toString(),
            lat: lat.toString(),
            radius: radius.toString(),
          }}
          onSubmit={handlePointSubmit}
          enableReinitialize
          validationSchema={PointAlertFormValidationSchema}
        >
          <Fragment>
            <Text style={styles.title}>Points Alert</Text>
            <Text style={styles.subTitle}>Longitude</Text>
            <TextField
              placeholder={"Longitude"}
              name={"long"}
              keyboardType={Platform.OS === "ios" ? 'numbers-and-punctuation' : 'numeric'}
              style={{ marginBottom: 10, paddingLeft: 16 }}
            />

            <Text style={styles.subTitle}>Latitude</Text>
            <TextField
              placeholder={"Latitude"}
              name={"lat"}
              keyboardType={Platform.OS === "ios" ? 'numbers-and-punctuation' : 'numeric'}
              style={{ marginBottom: 10, paddingLeft: 16 }}
            />
            <Text style={styles.subTitle}>Radius in meters</Text>
            <TextField
              placeholder={"Radius in meters"}
              name={"radius"}
              keyboardType={Platform.OS === "ios" ? 'numbers-and-punctuation' : 'numeric'}
              style={{ marginBottom: 10, paddingLeft: 16 }}
            />
            <View
              style={{ flexDirection: "row", marginBottom: 20, marginTop: 5 }}
            >
              <FormSubmitButton
                textStyle={{ color: COLORS.white }}
                style={{
                  backgroundColor: COLORS.blue,
                  borderColor: COLORS.blue,
                  marginRight: "auto",
                  paddingHorizontal: 20,
                }}
                title={"Submit"}
              />
              <FormResetButton
                title="Reset"
                style={{ paddingHorizontal: 20 }}
                onPress={resetPointForm}
              />
            </View>
          </Fragment>
        </Formik>
        <Text style={styles.title}>Polygon Alerts</Text>
        <Text style={[styles.subTitle, { alignSelf: "center" }]}>
          Min 3 points | Max 8 points
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginVertical: 10,
          }}
        >
          <Button
            variant="TYPE2"
            title="-"
            style={{ width: "15%" }}
            textStyle={styles.incrementText}
            onPress={() => {
              const nbr = pointArea.numOfPoints
                ? Math.max(Number(pointArea.numOfPoints) - 1, 3)
                : "";
              setPointArea({
                numOfPoints: nbr.toString(),
                locations:
                  Number(pointArea.numOfPoints) > 3
                    ? pointArea.locations.slice(0, nbr)
                    : pointArea.locations,
              });
            }}
          />
          <Text style={{ fontSize: 20, paddingHorizontal: 30 }}>
            {pointArea.numOfPoints}
          </Text>
          <Button
            variant="TYPE2"
            title="+"
            style={{
              width: "15%",
              backgroundColor: COLORS.blue,
              borderColor: COLORS.blue,
            }}
            textStyle={styles.incrementText}
            onPress={() => {
              const nbr = pointArea.numOfPoints
                ? Math.min(Number(pointArea.numOfPoints) + 1, 8)
                : 3;
              setPointArea({
                numOfPoints: nbr.toString(),
                locations:
                  Number(pointArea.numOfPoints) < 8
                    ? pointArea.numOfPoints
                      ? pointArea.locations.concat([[0, 0]])
                      : pointArea.locations.concat([
                        [0, 0],
                        [0, 0],
                        [0, 0],
                      ])
                    : pointArea.locations,
              });
            }}
          />
        </View>
        <Formik
          initialValues={{ locations: pointArea.locations }}
          onSubmit={(value) => handlePolygonSubmit(value.locations)}
          enableReinitialize
        >
          {pointArea.numOfPoints && (
            <Fragment>
              <TextInputList
                name="locations"
                count={Number(pointArea.numOfPoints)}
              />
              <Text style={{ color: COLORS.red, textAlign: "center" }}>
                {errorValidation}
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 40 }}>
                <FormSubmitButton
                  textStyle={{ color: COLORS.white }}
                  style={{
                    backgroundColor: COLORS.blue,
                    borderColor: COLORS.blue,
                    marginRight: "auto",
                    paddingHorizontal: 20,
                  }}
                  title={"Submit"}
                />
                <FormResetButton
                  title="Reset"
                  style={{ paddingHorizontal: 20 }}
                  onPress={resetPolygonForm}
                />
              </View>
            </Fragment>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingTop: "10%",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    alignSelf: "center",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  incrementText: {
    fontSize: 20,
  },
});
