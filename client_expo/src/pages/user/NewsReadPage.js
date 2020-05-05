import React from "react";
import WebView from "react-native-webview";
import HeaderComponent from "../../components/HeaderBackComponent";
import { AppContext } from "../../providers/AppProvider";
import { Container, Fab, Button, Icon, View } from "native-base";

function NewsReadPage({ navigation, route }) {
  const { title, slug } = route.params;
  const { state } = React.useContext(AppContext);

  return (
    <Container>
      <HeaderComponent navigation={navigation} title={title} />
      <View style={{ flex: 1 }}>
        <WebView source={{ html: "<h1>test html</h1>" }} />
        <Fab
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
        </Fab>
      </View>
    </Container>
  );
}

export default NewsReadPage;
