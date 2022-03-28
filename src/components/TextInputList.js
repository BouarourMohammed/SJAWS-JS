import { useField } from "formik";
import React, { useCallback, useMemo } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../assets/colors";

export const TextInputList = (props) => {
  const updateState = useCallback((state, lang, index, value, helpers) => {
    const updateState = [...state];
    updateState[index][lang] = value;
    helpers.setValue(updateState);
  }, []);

  const [field, { touched, error }, helpers] = useField(props.name);
  return useMemo(
    () => (
      <View style={props.style}>
        {field.value &&
          field.value.length > 0 &&
          field.value.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.subTitle}>Point Latitude</Text>
                <View style={styles.container}>
                  <TextInput
                    style={styles.inputStyle}
                    autoCorrect={false}
                    keyboardType={Platform.OS === "ios" ? 'numbers-and-punctuation' : 'numeric'}
                    autoCapitalize={"none"}
                    allowFontScaling={false}
                    placeholder={"Latitude"}
                    onChangeText={(value) =>
                      updateState(field.value, 0, index, value, helpers)
                    }
                    placeholderTextColor={COLORS.grey}
                    value={field.value[index][0].toString()}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.subTitle}>Point Longitude</Text>
                <View style={styles.container}>
                  <TextInput
                    style={styles.inputStyle}
                    autoCorrect={false}
                    keyboardType={Platform.OS === "ios" ? 'numbers-and-punctuation' : 'numeric'}
                    autoCapitalize={"none"}
                    allowFontScaling={false}
                    placeholder={"Longitude"}
                    onChangeText={(value) =>
                      updateState(field.value, 1, index, value, helpers)
                    }
                    placeholderTextColor={COLORS.grey}
                    value={field.value[index][1].toString()}
                  />
                </View>
              </View>
            </View>
          ))}
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    ),
    [field.value, touched, error]
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    color: COLORS.red,
  },
  inputStyle: {
    fontSize: 16,
    height: 48,
    lineHeight: 18,
    includeFontPadding: false,
  },
  container: {
    borderRadius: 5,
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginBottom: 10,
    paddingLeft: 16,
  },
});
