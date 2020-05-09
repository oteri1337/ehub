import React from "react";
import chat from "../../../assets/chat.png";
import {
  ImageBackground,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
} from "react-native";
import {
  Container,
  Content,
  Text,
  View,
  Form,
  Button,
  Icon,
  Textarea,
} from "native-base";
import HeaderComponent from "../../components/HeaderBackComponent";

function NewsReadPage({ navigation, route }) {
  const { title, user_id, content, created_at } = route.params;

  const onPress = () => {
    alert("post comment");
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} title={title} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={chat}
          >
            <Content style={{ padding: 15 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 5,
                  marginRight: 30,
                }}
              >
                <Text>
                  <Text note>{created_at} </Text>
                  <Text style={{ color: "green" }}>{user_id}</Text>
                </Text>
                <Text>{content}</Text>
              </View>
            </Content>
          </ImageBackground>
        </View>
        <View
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 15,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <View style={{ flex: 5.5 }}>
            <Form>
              <Textarea bordered />
            </Form>
          </View>
          <View style={{ flex: 1, paddingLeft: 5 }}>
            <Button rounded onPress={onPress}>
              <Icon name="send" />
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

export default NewsReadPage;
