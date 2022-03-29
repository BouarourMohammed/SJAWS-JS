import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../assets/colors";
import { Button } from "./Button";
import * as Linking from 'expo-linking';
import { getAllAuth } from "../api/common";

export const SubscriptionsCard = (props) => {
  const navigation = useNavigation();
  const manageSubscriptions = async () => {
    try {
      // End point problem 
      // const { data } = await getAllAuth("customer-portal");
      Linking.openURL('http://165.227.42.223/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={props.style}>
      <View
        style={[
          styles.Container,
          {
            borderBottomWidth: 0,
            backgroundColor: COLORS.lightGrey,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
          },
        ]}
      >
        <Text style={styles.title}>{props.type}</Text>
      </View>
      <View
        style={[
          styles.Container,
          {
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
          },
        ]}
      >
        <Text style={styles.priceText}>
          CA ${Number(props.price).toFixed(2)}
        </Text>
        <Text style={[styles.details, { paddingTop: 15 }]}>
          Status : {props.status}
        </Text>
        <Text style={styles.details}>Card last 4 digit: {props.card}</Text>
        <Text style={styles.details}>Current period end: {props.period}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Button
            title="Access"
            variant="TYPE2"
            onPress={() =>
              navigation.navigate("PlanDetailScreen", {
                type: props.type.toLocaleLowerCase(),
              })
            }
          />
          <Button
            title="Manage Subscription"
            variant="TYPE2"
            style={{
              borderColor: COLORS.yellow,
              backgroundColor: COLORS.yellow,
            }}
            textStyle={{ color: COLORS.white }}
            onPress={manageSubscriptions}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  priceText: {
    fontSize: 30,
  },
  month: {
    fontSize: 16,
    color: COLORS.grey,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
  },
  details: {
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 10,
  },
});
