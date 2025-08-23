import React from "react";
import { Keyboard } from "react-native";
import { Store, sendRequestThenDispatch } from "../../providers/AppProvider";
import {
  Container,
  Content,
  Form,
  Textarea,
  Button,
  Text,
  Item,
  Input,
  Spinner,
  Picker,
  Icon,
  View,
} from "native-base";

function TopicsCreatePage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "New Topic" });
  }, []);

  const [title, setTitle] = React.useState("");
  const [icon, setIcon] = React.useState("bulb1");
  const [data, setContent] = React.useState("");
  const [color, setColor] = React.useState("#fe653b");

  const { state, refreshing, send } = sendRequestThenDispatch(Store);

  const onPress = async () => {
    if (title.length && data.length) {
      Keyboard.dismiss();
      const body = JSON.stringify({
        icon,
        color,
        title,
        data,
        user_id: state.user.id,
      });
      const url = "/api/topics";
      const response = await send(url, "ADD_TOPIC", body);
      if (!response.errors.length) {
        navigation.navigate("TopicsReadPage", response.data);
      }
    }
  };

  const onBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <Content style={{ padding: 15 }}>
        <Form>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: 50,
                height: 50,
                marginRight: 5,
                borderRadius: 50,
                backgroundColor: color,
                justifyContent: "center",
              }}
            >
              <Icon
                name={icon}
                type="AntDesign"
                style={{
                  color: "#FFFFFF",
                  textAlign: "center",
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Item regular>
                <Picker
                  mode="dropdown"
                  selectedValue={icon}
                  iosHeader="Select Icon"
                  onValueChange={(data) => setIcon(data)}
                >
                  <Picker.Item label="Car Icon" value="car" />
                  <Picker.Item label="Team Icon" value="team" />
                  <Picker.Item label="Bulb Icon" value="bulb1" />
                  <Picker.Item label="Rocket Icon" value="rocket1" />
                  <Picker.Item label="Wallet Icon" value="wallet" />
                </Picker>
              </Item>
            </View>
            <View style={{ flex: 1 }}>
              <Item regular>
                <Picker
                  mode="dropdown"
                  iosHeader="Select Colour"
                  selectedValue={color}
                  onValueChange={(data) => {
                    setColor(data);
                  }}
                >
                  <Picker.Item label="Blue" value="#2588ed" />
                  <Picker.Item label="Grey" value="#8299cd" />
                  <Picker.Item label="Orange" value="#fe653b" />
                  <Picker.Item label="Light Blue" value="#00adef" />
                </Picker>
              </Item>
            </View>
          </View>
          <Item regular style={{ marginTop: 5 }}>
            <Input
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </Item>

          <Textarea
            bordered
            rowSpan={7}
            onBlur={onBlur}
            value={data}
            placeholder="Content"
            onChangeText={(text) => setContent(text)}
          />
        </Form>

        {!refreshing && (
          <Button
            full
            onPress={onPress}
            style={{ marginTop: 5, backgroundColor: "#007aff" }}
          >
            <Text>Post</Text>
          </Button>
        )}

        {refreshing && <Spinner />}
      </Content>
    </Container>
  );
}

export default TopicsCreatePage;
