import React from "react";
import { Image } from "react-native";
import { Container, Text, Button, View, H1 } from "native-base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const tabStyle = {
  flex: 1,
  alignItems: "center",
  backgroundColor: "#fff",
  justifyContent: "center",
};

function TabA() {
  const item = {
    id: 1,
    text: "READ BOOKS",
    desc: `save books for offline use, read anywhere,
    even without an internet connection`,
    image: require("../../assets/books.png"),
  };

  return (
    <View style={tabStyle}>
      <Image style={{ height: 300, width: 300 }} source={item.image} />
      <H1
        style={{
          textAlign: "center",
          // fontFamily: "Patrick",
        }}
      >
        {item.text}
      </H1>
      <Text
        style={{
          marginTop: 5,
          fontSize: 20,
          textAlign: "center",
          // fontFamily: "Patrick",
        }}
      >
        {item.desc}
      </Text>
      <Text style={{ textAlign: "center" }}>
        <Text style={{ fontSize: 100, color: "#f9a133" }}>.</Text>
        <Text style={{ fontSize: 100 }}>.</Text>
        <Text style={{ fontSize: 100 }}>.</Text>
        <Text style={{ fontSize: 100 }}>.</Text>
      </Text>
    </View>
  );
}

function TabB() {
  const item = {
    id: 2,
    text: "CHAT USERS",
    desc: `connect with friends and colleagues, one-on-one conversation with community members.`,
    image: require("../../assets/chat.png"),
  };

  return (
    <View style={tabStyle}>
      <Image style={{ height: 300, width: 300 }} source={item.image} />
      <H1
        style={{
          textAlign: "center",
          // fontFamily: "Patrick",
        }}
      >
        {item.text}
      </H1>
      <Text
        style={{
          padding: 5,
          marginTop: 5,
          fontSize: 20,
          textAlign: "center",
          // fontFamily: "Patrick",
        }}
      >
        {item.desc}
      </Text>
      <Text style={{ textAlign: "center" }}>
        <Text style={{ fontSize: 100 }}>.</Text>
        <Text style={{ fontSize: 100, color: "#f9a133" }}>.</Text>
        <Text style={{ fontSize: 100 }}>.</Text>
        <Text style={{ fontSize: 100 }}>.</Text>
      </Text>
    </View>
  );
}

function TabC() {
  const item = {
    id: 3,
    text: "JOIN FORUMS",
    desc: `use the discussion forums to share ideas or brainstorm on issues and ideas`,
    image: require("../../assets/forum.png"),
  };

  return (
    <View style={tabStyle}>
      <Image style={{ height: 300, width: 300 }} source={item.image} />
      <H1
        style={{
          textAlign: "center",
          // fontFamily: "Patrick",
        }}
      >
        {item.text}
      </H1>
      <Text
        style={{
          marginTop: 5,
          padding: 10,
          textAlign: "center",
          fontSize: 20,
          // fontFamily: "Patrick",
        }}
      >
        {item.desc}
      </Text>
      <Text style={{ textAlign: "center" }}>
        <Text style={{ fontSize: 100 }}>.</Text>
        <Text style={{ fontSize: 100 }}>.</Text>
        <Text style={{ fontSize: 100, color: "#f9a133" }}>.</Text>
        <Text style={{ fontSize: 100 }}>.</Text>
      </Text>
    </View>
  );
}

function TabD() {
  const item = {
    id: 4,
    text: "STAY UPDATED",
    desc: `eHUB will help you stay more informed on breaking news and events`,
    image: require("../../assets/news.png"),
  };

  return (
    <View style={tabStyle}>
      <Image style={{ height: 300, width: 300 }} source={item.image} />
      <H1
        style={{
          textAlign: "center",
          // fontFamily: "Patrick",
        }}
      >
        {item.text}
      </H1>
      <Text
        style={{
          padding: 10,
          paddingTop: 5,
          marginTop: 5,
          fontSize: 20,
          textAlign: "center",
          // fontFamily: "Patrick",
        }}
      >
        {item.desc}
      </Text>
      <Text style={{ textAlign: "center" }}>
        <Text style={{ fontSize: 100 }}>.</Text>
        <Text style={{ fontSize: 100 }}>.</Text>
        <Text style={{ fontSize: 100 }}>.</Text>
        <Text style={{ fontSize: 100, color: "#f9a133" }}>.</Text>
      </Text>
    </View>
  );
}

function HomePage({ navigation }) {
  return (
    <Container>
      <Tab.Navigator tabBar={() => <React.Fragment />}>
        <Tab.Screen name="TabA" component={TabA} />
        <Tab.Screen name="TabB" component={TabB} />
        <Tab.Screen name="TabC" component={TabC} />
        <Tab.Screen name="TabD" component={TabD} />
      </Tab.Navigator>

      <Button
        style={{ backgroundColor: "#007aff" }}
        full
        onPress={() => {
          navigation.navigate("SignInPage");
        }}
      >
        <Text>GET STARTED</Text>
      </Button>
    </Container>
  );
}

export default HomePage;
