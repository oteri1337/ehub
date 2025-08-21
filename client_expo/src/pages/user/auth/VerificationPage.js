import React from "react";
import Logo from "../../../../assets/icon.png";
import { Image, Keyboard, TouchableWithoutFeedback } from "react-native";
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
} from "native-base";

function VerificationPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Verification" });
  }, []);

  const { signOut } = React.useContext(Store);
  const [token, settoken] = React.useState("");
  const { state, refreshing, send } = sendRequestThenDispatch();
  const { email, verified } = state.user;

  const [kshown, setKshown] = React.useState(false);

  const shownListener = () => {
    setKshown(true);
  };

  const hiddenListenr = () => {
    setKshown(false);
  };

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", shownListener);
    Keyboard.addListener("keyboardDidHide", hiddenListenr);

    return () => {
      Keyboard.removeListener("keyboardDidShow", shownListener);
      Keyboard.removeListener("keyboardDidHide", hiddenListenr);
    };
  }, []);

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
          <View style={{ flex: 1.5, justifyContent: "center" }}>
            <Image style={{ height: 100, width: 95 }} source={Logo} />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={{ textAlign: "center" }}>
              Please enter the verification token sent to {email}
            </Text>

            <Form>
              <Item regular style={{ marginTop: 25, borderRadius: 5 }}>
                <Input
                  style={{ textAlign: "center" }}
                  keyboardType="decimal-pad"
                  onChangeText={(text) => settoken(text)}
                  value={token}
                />
              </Item>
            </Form>

            {!refreshing && (
              <Button
                full
                style={{ marginTop: 15, backgroundColor: "#0984e3" }}
                onPress={() => {
                  send("/api/users/auth/verify", "UPDATE_USER", { token });
                }}
              >
                <Text>VERIFY</Text>
              </Button>
            )}

            {!refreshing && (
              <Button
                full
                bordered
                style={{
                  marginTop: 10,
                  color: "#0984e3",
                  borderColor: "#0984e3",
                }}
                onPress={() => {
                  send("/api/users/auth/token", "", { email });
                }}
              >
                <Text>RESEND TOKEN</Text>
              </Button>
            )}

            {refreshing && <Spinner />}
          </View>

          {!kshown && (
            <View style={{ flex: 1 }}>
              <Button danger bordered onPress={signOut}>
                <Text>Sign Out</Text>
              </Button>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}

export default VerificationPage;
