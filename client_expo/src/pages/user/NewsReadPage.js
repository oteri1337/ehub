import React from "react";
import WebView from "react-native-webview";
import { KeyboardAvoidingView } from "react-native";
import HeaderComponent from "../../components/HeaderBackComponent";
import { AppContext } from "../../providers/AppProvider";
import {
  Container,
  Fab,
  Button,
  Icon,
  View,
  Form,
  Textarea,
} from "native-base";

function NewsReadPage({ navigation, route }) {
  const { title, slug, content_html } = route.params;
  const { state } = React.useContext(AppContext);

  const onPress = () => {
    alert("post comment");
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} title={title} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ flex: 1 }}>
          <WebView source={{ html: content_html }} />
          {/* <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => this.setState({ active: !true })}
          >
            <Icon name="share" />
            <Button style={{ backgroundColor: "#34A34F" }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: "#3B5998" }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: "#DD5144" }}>
              <Icon name="mail" />
            </Button>
          </Fab> */}
        </View>
        <View
          style={{
            paddingLeft: 15,
            paddingBottom: 5,
            flexDirection: "row",
            alignItems: "flex-end",
            borderTopColor: "silver",
            borderTopWidth: 1,
          }}
        >
          <View style={{ flex: 5.5 }}>
            <Form>
              <Textarea bordered rowSpan={2} />
            </Form>
          </View>
          <View style={{ flex: 1, paddingLeft: 5 }}>
            <Button rounded onPress={onPress} style={{ height: 50, width: 50 }}>
              <Icon name="send" />
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}

export default NewsReadPage;
