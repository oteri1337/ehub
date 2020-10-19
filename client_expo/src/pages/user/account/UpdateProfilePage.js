import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { sendRequestThenDispatch } from "../../../providers/AppProvider";
import {
  Container,
  Content,
  View,
  Form,
  Item,
  Input,
  Button,
  Text,
  Textarea,
  Picker,
} from "native-base";

function UpdateProfilePage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Update Profile" });
  }, []);

  const { state, refreshing, send } = sendRequestThenDispatch();

  const [bio, setBio] = React.useState(state.user.bio);
  const [link, setLink] = React.useState(state.user.link);
  const [hidden, setHidden] = React.useState(state.user.hidden);
  const [department, setDept] = React.useState(state.user.department);
  const [phone_number, setPhone] = React.useState(state.user.phone_number);

  const dissmiss = () => {
    Keyboard.dismiss();
  };

  const change = async () => {
    const body = {
      bio,
      link,
      department,
      phone_number,
      hidden,
    };

    await send("/api/users/auth/profile", "UPDATE_USER", body, "PATCH");
  };

  return (
    <Container style={{ flex: 1 }}>
      <Content>
        <TouchableWithoutFeedback onPress={dissmiss}>
          <View style={{ flex: 1, padding: 20 }}>
            <Text>
              Enter your profile information, then click update to proceed.
            </Text>
            <Form>
              <Text style={{ marginBottom: 5, marginTop: 40 }}>Link</Text>
              <Item regular>
                <Input value={link} onChangeText={(t) => setLink(t)} />
              </Item>

              <Text style={{ marginTop: 40, marginBottom: 5 }}>Department</Text>
              <Item regular>
                <Input value={department} onChangeText={(t) => setDept(t)} />
              </Item>

              <Text style={{ marginTop: 40, marginBottom: 5 }}>
                Phone Number
              </Text>
              <Item regular>
                <Input value={phone_number} onChangeText={(t) => setPhone(t)} />
              </Item>

              <Text style={{ marginTop: 40, marginBottom: 5 }}>
                Profile Visibility
              </Text>
              <Item regular>
                <Picker
                  mode="dropdown"
                  selectedValue={hidden}
                  iosHeader="Profile Visibility"
                  onValueChange={(data) => setHidden(data)}
                >
                  <Picker.Item label="Visible" value={1} />
                  <Picker.Item label="Hidden" value={2} />
                </Picker>
              </Item>

              <Text style={{ marginTop: 40, marginBottom: 5 }}>About</Text>
              <Item regular>
                <Textarea
                  value={bio}
                  onChangeText={(t) => setBio(t)}
                  rowSpan={4}
                />
              </Item>
            </Form>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ padding: 20, marginTop: 40 }}>
          {!refreshing && (
            <Button full onPress={change}>
              <Text>Update </Text>
            </Button>
          )}

          {refreshing && (
            <Button bordered full>
              <Text>Updating Profile</Text>
            </Button>
          )}
        </View>
      </Content>
    </Container>
  );
}

export default UpdateProfilePage;
