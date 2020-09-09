import React from "react";
import Logo from "../../../../assets/icon.png";
import { TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { sendRequestThenDispatch, Store } from "../../../providers/AppProvider";
import {
  View,
  Text,
  Button,
  Container,
  Item,
  Input,
  Form,
  Spinner,
  Icon,
} from "native-base";

function DetailsPage({ navigation }) {
  navigation.setOptions({ title: "My Profile" });

  const { signOut } = React.useContext(Store);

  const [last_name, setLastName] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [nse_number, setNseNumber] = React.useState("");

  const { state, refreshing, send } = sendRequestThenDispatch();

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, padding: 15 }}>
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
                onChangeText={(text) => setNseNumber(text)}
                value={nse_number}
              />
            </Item>
          </Form>

          {!refreshing && (
            <Button
              full
              success
              style={{ marginTop: 15 }}
              onPress={() => {
                const body = { first_name, last_name, department, nse_number };

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
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}

export default DetailsPage;
