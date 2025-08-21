import React from "react";
import { Spinner, Icon } from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { sendRequestThenDispatch, Store } from "../../../providers/AppProvider";
import {
  View,
  Text,
  Button,
  Container,
  Content,
  Item,
  Input,
  Form,
} from "native-base";

function DetailsPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "My Profile" });
  }, []);

  const { signOut } = React.useContext(Store);

  const [bio, setBio] = React.useState("");
  const [link, setLink] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [nse_number, setNseNumber] = React.useState("");

  const { state, refreshing, send } = sendRequestThenDispatch();

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Content padder>
          <Form>
            <Item regular style={{ marginTop: 10, borderRadius: 5 }}>
              <Icon name="ios-contact" />
              <Input
                placeholder="First Name"
                onChangeText={(text) => setFirstName(text)}
                value={first_name}
              />
            </Item>
            <Item regular style={{ marginTop: 15, borderRadius: 5 }}>
              <Icon name="ios-person" />
              <Input
                placeholder="Last Name"
                onChangeText={(text) => setLastName(text)}
                value={last_name}
              />
            </Item>
            <Item regular style={{ marginTop: 15, borderRadius: 5 }}>
              <Icon name="ios-school" />
              <Input
                placeholder="Department"
                onChangeText={(text) => setDepartment(text)}
                value={department}
              />
            </Item>
            <Item regular style={{ marginTop: 15, borderRadius: 5 }}>
              <Icon name="md-settings" />
              <Input
                placeholder="NSE Number"
                keyboardType="decimal-pad"
                onChangeText={(text) => setNseNumber(text)}
                value={nse_number}
              />
            </Item>
            <Item regular style={{ marginTop: 15, borderRadius: 5 }}>
              <Icon name="md-link" />
              <Input
                placeholder="Website Link"
                onChangeText={(text) => setLink(text)}
                value={link}
              />
            </Item>
            <Item regular style={{ marginTop: 15, borderRadius: 5 }}>
              <Icon name="ios-analytics" />
              <Input
                placeholder="Profile Headline"
                onChangeText={(text) => setBio(text)}
                value={bio}
              />
            </Item>
          </Form>

          {!refreshing && (
            <Button
              full
              style={{ marginTop: 15 }}
              onPress={() => {
                const body = {
                  first_name,
                  last_name,
                  department,
                  nse_number,
                  link,
                  bio,
                };

                if (
                  first_name.length &&
                  last_name.length &&
                  department.length
                ) {
                  send("/api/users/auth/profile", "UPDATE_USER", body, "PATCH");
                }
              }}
            >
              <Text>PROCEED</Text>
            </Button>
          )}

          {refreshing && <Spinner />}
        </Content>
      </TouchableWithoutFeedback>
    </Container>
  );
}

export default DetailsPage;
