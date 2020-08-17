import React from "react";
import { Image } from "react-native";
import {
  Container,
  DeckSwiper,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Button,
  View,
  Thumbnail,
} from "native-base";

function HomePage({ navigation }) {
  const cards = [
    {
      id: 1,
      text: "READ BOOKS",
      desc: "save books for offline use",
      image: require("../../assets/books2.png"),
    },
    {
      id: 2,
      text: "CHAT WITH USERS",
      desc: "interact with other users privately",
      image: require("../../assets/chat.jpg"),
    },
    {
      id: 3,
      text: "JOIN FORUMS",
      desc: "share ideas and info in forums",
      image: require("../../assets/forum5.jpg"),
    },
    {
      id: 4,
      text: "EVENTS AND NEWS",
      desc: "get news about upcoming events",
      image: require("../../assets/news3.jpg"),
    },
  ];

  return (
    <Container style={{ padding: 5 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          <DeckSwiper
            dataSource={cards}
            renderItem={(item) => {
              let colorOne = "black";
              let colorTwo = "black";
              let colorThr = "black";
              let colorFor = "black";

              if (item.id == 1) {
                colorOne = "#f9a133";
              }

              if (item.id == 2) {
                colorTwo = "#f9a133";
              }

              if (item.id == 3) {
                colorThr = "#f9a133";
              }

              if (item.id == 4) {
                colorFor = "#f9a133";
              }

              return (
                <Card style={{ marginTop: 60 }}>
                  <CardItem>
                    <Left>
                      <Body style={{ alignItems: "center" }}>
                        <Image
                          style={{ height: 300, width: 300 }}
                          source={item.image}
                        />
                        <Text
                          style={{ textAlign: "center", fontWeight: "bold" }}
                        >
                          {item.text}
                        </Text>
                        <Text
                          note
                          style={{ textAlign: "center", marginTop: 5 }}
                        >
                          {"    "}
                          {item.desc}
                        </Text>
                        <Text style={{ textAlign: "center" }}>
                          <Text style={{ fontSize: 100, color: colorOne }}>
                            .
                          </Text>
                          <Text style={{ fontSize: 100, color: colorTwo }}>
                            .
                          </Text>
                          <Text style={{ fontSize: 100, color: colorThr }}>
                            .
                          </Text>
                          <Text style={{ fontSize: 100, color: colorFor }}>
                            .
                          </Text>
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              );
            }}
          />
        </View>
        <View>
          <Button
            full
            style={{ backgroundColor: "#029151" }}
            onPress={() => {
              navigation.navigate("SignInPage");
            }}
          >
            <Text>GET STARTED</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}

export default HomePage;
