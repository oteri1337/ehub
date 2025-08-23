import React from "react";
import { Container, Text, Button, Icon } from "native-base";
import PdfsList from "../../components/PdfsListComponent";
import { Store } from "../../../providers/AppProvider";

function PdfsSavedPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Saved Books",
      headerLeft: () => (
        <Button
          transparent
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="menu" type="Feather" style={{ color: "black" }} />
        </Button>
      ),
      headerRight: () => (
        <Button
          transparent
          onPress={() => {
            navigation.navigate("AccountPage");
          }}
        >
          <Icon name="user" type="Feather" style={{ color: "black" }} />
        </Button>
      ),
    });
  }, []);

  const { state } = React.useContext(Store);

  const list = state.saved;

  console.log(list);

  const refreshing = false;

  const onRefresh = () => {};

  const onEndReached = () => {};

  if (list.data.length === 0) {
    return (
      <Container style={{ justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>You Have No Saved Books Yet</Text>
      </Container>
    );
  }

  return (
    <Container>
      <PdfsList {...{ list, onRefresh, refreshing, onEndReached }} />
    </Container>
  );
}

export default PdfsSavedPage;
